import React, { useEffect, useMemo, useRef, useState } from 'react';
import Select, { components, InputProps, MultiValue, SingleValue } from "react-select";


export type SelectInfoData = {
  value: string;
  label: string;
};

export type ChangeLabelData = {
  value: string;
  label: string;
  name: string;
};

const Input = (props: InputProps<SelectInfoData>) => <components.Input {...props}
  isHidden
  onKeyDown={(e) => {
    e.stopPropagation();
    e.preventDefault();
    return;
  }}
  onChange={() => {
    return;
  }}
  />

export type SelectProps = {
  list?: SelectInfoData[] | undefined;
  select?: SingleValue<SelectInfoData> | MultiValue<SelectInfoData> | undefined;
  handleChange?: (e: SingleValue<SelectInfoData> | MultiValue<SelectInfoData>) => void;
  onClickEditable?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  placeholder?: string;
  isDisabled?: boolean;
  changeLabelList?: ChangeLabelData[];
  text?: string;
  textList?: SelectInfoData[];
  onInputChange?: (v: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
  /* isMulti: 復数選択 */
  isMulti?: boolean;
  /* isClearable: 選択肢初期化 */
  isClearable?: boolean;
  /* isSearchable: 検索機能 */
  isSearchable?: boolean;
  /* noOptionsMessage:「No Option」メッセージ変更 */
  noOptionsMessage?: string;
  /* menuIsOpen: プルダウン非表示 */
  menuIsOpen?: boolean;
  /* menuIsOpen: 自動でフォーカスを当てる */
  autoFocus?: boolean;
  formMode?: "multi" | "pulldown" | "text" | "editable";
  inputHidden?: boolean,
  menuClassName?: string,
  isPlusButton?: boolean,
  editableSrc?: string,
};

export const ReactSelect = (props: SelectProps) => {
  const {
    list,
    select,
    changeLabelList,
    placeholder,
    isDisabled,
    isMulti,
    isClearable,
    isSearchable,
    noOptionsMessage = '該当項目がありません。',
    menuIsOpen,
    text,
    textList,
    handleChange,
    onInputChange,
    onKeyDown,
    formMode = "text",
    autoFocus,
    inputHidden,
    menuClassName,
    onClickEditable,
    editableSrc,
  } = props;

  // - Ref -
  const ref = useRef<HTMLDivElement>(null);
  // - validation用state -
  const [valid, setValid] = useState(true);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [errorContainerHeight, setErrorContainerHeight] = useState(0);
  const [errorContainerWidth, setErrorContainerWidth] = useState(0);
  const errorContainerEle = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();

  // - validation用effect -
  useEffect(
    () => {
      if (errorContainerEle && errorContainerEle.current) {
        const height = errorContainerEle.current.offsetHeight;
        const width = errorContainerEle.current.offsetWidth;
        setErrorContainerHeight(height);
        setErrorContainerWidth(width);
      }
    },
    [errorContainerEle, errorMessages],
  );
  // リサイズ時処理
  const resize = () => {
    ref.current && setWidth(ref.current?.getBoundingClientRect().width);
  }
  useEffect(() => {
    resize();
    }, [ref.current]);
  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const selectChangeLabel = useMemo<SelectInfoData>(() => {
    const selectBody = select as SingleValue<SelectInfoData>;
    const val = changeLabelList?.find((v) => v.value === selectBody?.value);
    const data: SelectInfoData | undefined = val? { value: val.value , label: val.name } : undefined;
    return data? data : { value: "" , label: "" };
  }, [select]);

  const selectChangeLabelList = useMemo<SelectInfoData[]>(() => {

    const selectBody = select as SingleValue<SelectInfoData>;
    if (!isMulti || select === undefined || selectBody?.value === "") return [{ value: "" , label: "" }];
    const selectArr = select as MultiValue<SelectInfoData>;
    const changeLabelArr = changeLabelList?.map((v) => selectArr.find((id) => id.value === v.value) ? v : undefined).filter((v) => v !== undefined);
    // console.log({ selectArr, changeLabelList, changeLabelArr });
    const data: SelectInfoData[] = [];
    changeLabelArr?.forEach((v) => {
      if (v) data.push({ value: v.value , label: v.name });
    });
    return data.length && data[0].label !== undefined ? data : [{ value: "", label: "" }];
  }, [select]);

  const changeMulti = useMemo<SingleValue<SelectInfoData> | MultiValue<SelectInfoData>>(() => {
    if (isMulti) {
      const selectArr = select as MultiValue<SelectInfoData>;
      if (!selectArr) return null;
      if (!selectArr[0]) return null;
      return changeLabelList ? (selectChangeLabelList[0].value !== "" ? selectChangeLabelList : null) : selectArr[0].value !== undefined || selectArr[0].value !== '' ? selectArr : null;
    } else {
      const selectBody = select as SingleValue<SelectInfoData>;
      return changeLabelList ? (select ? (selectBody?.value !== "" ? selectChangeLabel : null) : null) : selectBody?.value !== "" ? selectBody : null;
    }
  }, [select]);

  return (
    <div className={`react_select ${formMode}${valid ? '' : ' form_alert'}${isDisabled ? ' disabled' : ''}`} ref={ref}>
      <Select
        styles={{
          control: (provided) => ({
            ...provided,
            width: 400,
            display: "flex",
            disabled: "false",
          }),
          menu: (provided) => ({
            ...provided,
            maxWidth: width,
          }),
          input: (provided) => ({
            ...provided,
            minHeight: inputHidden ? undefined : '100%',
            margin: 0,
            cursor: inputHidden ? undefined : 'text',
          }),
        }}
        components={inputHidden ? { 
          Input, 
          Menu: (_props) => components.Menu({..._props, innerProps: {..._props.innerProps, className: menuClassName}}) } 
          : { Menu: (_props) => components.Menu({..._props, innerProps: {..._props.innerProps, className: menuClassName}}) }
        }
        // components={ inputHidden ? { Input } : undefined }
        options={list}
        noOptionsMessage={() => noOptionsMessage}
        value={!textList ? changeMulti : textList}
        onMenuOpen={onClickEditable ? onClickEditable : undefined}
        onChange={(e) => {
          handleChange?.(e);
        }}
        autoFocus={autoFocus}
        placeholder={placeholder ?? ""}
        isDisabled={isDisabled}
        isMulti={isMulti}
        isClearable={!isMulti ? isClearable : undefined}
        isSearchable={isSearchable}
        menuIsOpen={menuIsOpen}
        // menuIsOpen
        inputValue={text}
        onInputChange={(v) =>{
          onInputChange?.(v)}}
        onKeyDown={(v)=> onKeyDown?.(v)}
        className={`react_select__form${inputHidden ? ' input_hidden' : ''}`}
        menuPosition="fixed"
      />
      {(formMode === "text" && !onClickEditable) && <button className="react_select__icon" onClick={() => { }} />}
      {(formMode === 'editable' && onClickEditable) && 
        // <button className="react_select__icon editable_button" onClick={(e) => onClickEditable?.(e)}>
        <button className="react_select__icon editable_button" onClick={() => {}}>
          <img src={editableSrc ?? ''}/>
        </button>
        }
      { !valid && (
        <div
          className="error_pop"
          style={{
            top: -errorContainerHeight - 6,
          }}
          ref={errorContainerEle}
        >
          {errorMessages.map((message, i) => (
            <div key={`invalid_message_${i}`} >{message}</div>
          ))}
        </div>
      ) }
    </div>
  );
};
