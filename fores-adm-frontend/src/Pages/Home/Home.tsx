import Layout from "../Layouts/Layout"
import logo from '../../assets/logonombreblanco.webp';
import { AuthStore, useAuthStore } from "../../store/authStore";

function Home() {
  const {user} = useAuthStore((state: AuthStore) => state)
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full">
        <figure className='flex justify-center items-center bg-lime-700  rounded-full'>
          <img 
            src={logo}
            className='m-6 w-24 md:w-64 '
          />
        </figure>
        {
          user 
          &&
          <h1 className="font-extrabold text-gray-800 text-xl md:text-5xl m-2">Bienvenido, {user.username}</h1>
        }
      </div>
    </Layout>
  )
}

export default Home
