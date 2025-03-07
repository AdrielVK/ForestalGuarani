import { ReactNode } from "react";
import { colors } from "../../models/ui.models";



interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: ReactNode;
  color?: colors
}

const ButtonDumb: React.FC<Props> = ({ text, color, icon, ...rest }) => {
  return (
    <button
      {...rest}
      className={`w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white ${color ? `${color} hover:${color}`: "bg-lime-600 hover:bg-lime-700"}   focus:outline-none relative`}
    > 
      {
        icon && <span>{icon}</span>
      }
      <span
        className={"flex items-center transition-opacity opacity-100"}
      >
        {text}
      </span>

    </button>
  );
};

export default ButtonDumb;
