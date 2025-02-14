import { X } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode
  onClose: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent, value?:boolean) => void;
  title: string
}

const Modal = ({children, onClose, title}: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={(e) => onClose(e, false)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
        </div>
          {children}
      </div>
    </div>
  )
}

export default Modal;