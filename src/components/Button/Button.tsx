import React from "react";
import { StyledButton } from "./Button-style";

export interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
};

export default Button;
