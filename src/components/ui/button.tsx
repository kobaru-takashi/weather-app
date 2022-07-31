import React from 'react';

type ButtonProps = {
  label: string,
  size?: 'small' | 'medium' | 'large',
  color?: 'primary' | 'secondary' | 'tertiary' | 'quaternary',
  custom?: string,
  style?: any,
  disabled?: boolean,
  icon?: JSX.Element,
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = React.forwardRef((props: ButtonProps, ref: React.LegacyRef<HTMLButtonElement>) => {
  const {
    label,
    size,
    color,
    custom,
    style,
    disabled,
    onClick,
    icon,
    ...defaultProps } = props;
  return (
    <button
      {...defaultProps}
      type="button"
      className={`${size} ${color} ${custom} ${disabled ? 'disabled' : ''}${icon ? ' icon_button' : ''}${defaultProps.className ? ` ${defaultProps.className}` : ''}`}
      style={{ ...style }}
      onClick={(e) => {
        if (onClick && !disabled) {
          onClick(e);
          if ((e.target as any).blur) {
            (e.target as any).blur();
          }
        }
      }}
      ref={ref}
      disabled={disabled}
    >
      {!!icon && <span className="button_icon">{icon}</span>}
      {label}
    </button>
  )
})
// ---------------------------------------- defaultProps ----------------------------------------
Button.defaultProps = {
  size: 'medium',
  color: 'primary',
  custom: '',
  style: {},
  disabled: false,
};
