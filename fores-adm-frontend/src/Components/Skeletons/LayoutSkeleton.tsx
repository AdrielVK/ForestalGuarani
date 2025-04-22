
const LayoutSkeleton = () => {
  return (
    <main className="w-full antialiased">
      {/* SidebarMenu Skeleton - solo visible en pantallas grandes */}
      <div className="hidden lg:flex flex-col h-screen bg-lime-600 w-64 fixed left-0 top-0 overflow-y-auto">
        {/* Logo skeleton */}
        <div className="flex justify-center items-center">
          <div className="m-6 w-32 h-12 bg-lime-500 rounded-md animate-pulse"></div>
        </div>

        {/* User info skeleton */}
        <div className="mx-6 flex-wrap flex space-x-2 bg-white rounded-sm justify-center items-center p-2">
          <div className="w-20 h-4 bg-lime-200 rounded animate-pulse"></div>
          <div className="w-16 h-4 bg-lime-200 rounded animate-pulse"></div>
        </div>

        {/* Menu items skeleton */}
        <div className="mt-6 px-4 space-y-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-lime-500 rounded animate-pulse"></div>
              <div className="h-4 bg-lime-500 rounded w-3/4 animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Logout button skeleton */}
        <div className="mt-auto flex items-center justify-center p-4 bg-lime-700">
          <div className="w-full h-8 bg-lime-800 rounded animate-pulse"></div>
        </div>
      </div>

      {/* MobileNavbar Skeleton - solo visible en pantallas pequeñas */}
      <div className="lg:hidden">
        <div className="fixed top-0 left-0 right-0 bg-lime-600 p-4 flex justify-between items-center z-50">
          {/* Mobile logo skeleton */}
          <div className="h-8 w-24 bg-lime-500 rounded animate-pulse"></div>
          {/* Menu button skeleton */}
          <div className="w-6 h-6 bg-lime-500 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Content area skeleton */}
      <section className="mt-20 flex mx-4 box-content lg:mt-10 lg:ml-80 md:mx-12">
        <div className="w-full space-y-4">
          {/* Header skeleton */}
          <div className="w-3/4 h-8 bg-gray-200 rounded-md animate-pulse"></div>

          {/* Content skeleton - ajusta según tus necesidades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white shadow-sm rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default LayoutSkeleton

