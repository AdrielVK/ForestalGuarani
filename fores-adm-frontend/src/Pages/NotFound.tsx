import { AlertTriangle, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {

  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  const goHome = () => {
    navigate("/")
  }
  return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-lime-600 p-6 flex justify-center">
          <AlertTriangle className="text-white h-20 w-20" />
        </div>

        <div className="p-6 text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Página no encontrada</h2>
          <p className="text-gray-600 mb-8">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={goBack}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Volver atrás</span>
            </button>

            <button
              onClick={goHome}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Ir al inicio</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Si crees que esto es un error, por favor contacta al administrador del sistema.</p>
      </div>
    </div>
  )
}

export default NotFoundPage;