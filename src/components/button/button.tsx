import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import "./button.scss";

const Button = ({
  children,
  ...rest
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button {...rest} className={"btn " + rest.className}>
      {children}
    </button>
  );
};

export default Button;
