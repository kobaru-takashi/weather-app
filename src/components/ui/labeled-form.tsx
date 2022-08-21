// import './labeled-form.scss';

type LabeledFormProps = {
  label: string,
  formEle: JSX.Element,
  labelSide?: 'left' | 'top',
  className?: string,
};
export const LabeledForm = (props: LabeledFormProps) => {
  const { label, formEle, labelSide = "left", className } = props;

  return (
    <div className={`labeled_form ${labelSide}_label_form${className ? ` ${className}` : ''}`}>
      <span className="labeled_form__label">{label}</span>
      {formEle}
    </div>
  );
};