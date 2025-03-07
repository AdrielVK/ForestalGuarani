import PulseLoader from "react-spinners/PulseLoader";
import { colors } from "../../models/ui.models";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading: boolean;
  color?: colors
}

const Button: React.FC<Props> = ({ text, loading,color, ...rest }) => {
  return (
    <button
      {...rest}
      className={`w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white ${color ? `${color} hover:${color}`: "bg-lime-600 hover:bg-lime-700"}  focus:outline-none relative`}
    >
      <span
        className={`flex items-center transition-opacity ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {text}
      </span>

      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <PulseLoader size={5} color="#ffffff" />
        </span>
      )}
    </button>
  );
};

export default Button;
