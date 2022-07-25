import React, {
  LegacyRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type InputProps = {
  type?: string;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  asyncDisabled?: boolean;
  overErrorIgnore?: boolean;
  onClickClearDate?: () => void;
  edgeEle?: globalThis.Window | HTMLElement;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = React.forwardRef(
  (props: InputProps, ref: LegacyRef<HTMLInputElement>) => {
    const {
      type,
      className,
      placeholder,
      maxLength,
      disabled,
      asyncDisabled,
      overErrorIgnore,
      onClickClearDate: _onClickClearDate,
      edgeEle,
      ...defaultProps
    } = props;

    const [focused, setFocused] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    return (
      <input
        {...defaultProps}
        type={type}
        min={focused ? defaultProps.min : undefined}
        max={focused ? defaultProps.max : undefined}
        placeholder={placeholder}
        maxLength={maxLength}
        size={maxLength}
        disabled={disabled && !errorMessages.length && asyncDisabled}
        ref={ref}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (type === "number") {
            e.target.value = String(Number(e.target.value));
          }
          if (props.onChange) {
            props.onChange(e);
          }
        }}
      />
    );
  }
);

// ---------------------------------------- defaultProps ----------------------------------------
Input.defaultProps = {
  type: "text",
  className: "",
  placeholder: "",
  maxLength: undefined,
  size: undefined,
  disabled: undefined,
};
