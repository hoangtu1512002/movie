import Prototypes from "prop-types";
import './Button.scss'

const Button = props => {
  return (
    <button
      className={`btn ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </button>
  );
};

export const OutLineButton = props => {
  return (
    <Button
      className={`btn-outline ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </Button>
  );
};

Button.prototype = {
  onClick: Prototypes.func,
};

export default Button;

