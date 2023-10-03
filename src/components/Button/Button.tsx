import React from "react";

function Button({ label, onClick }: any) {
  return (
    <button onClick={onClick} className="button">
      {label}
    </button>
  );
}

export default Button;
