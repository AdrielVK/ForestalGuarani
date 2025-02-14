import VisualPasswordIcon from "./VisualPasswordIcon";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    additionalElement?: boolean; 
    showPassword?: boolean; 
    togglePasswordVisibility?: () => void; 
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    additionalElement,
    showPassword,
    togglePasswordVisibility,
    ...rest
}) => {
    return (
      <>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <div className="mt-1 relative">
        <input
            id={id} 
            className=" block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
            {...rest}
        />
        {additionalElement && 
          <VisualPasswordIcon
          showPassword={showPassword} 
          togglePasswordVisibility={togglePasswordVisibility || (() => {})}
        />}
      
        </div>
      </>
    );
};

export default Input;