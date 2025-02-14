
const LoginFormSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4 animate-pulse"></div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
            <div className="h-10 bg-lime-200 rounded w-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFormSkeleton;

