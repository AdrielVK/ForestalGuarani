import UserListItem from "../../Components/Users/UserItem";
import { useGet } from "../../hooks/useGet";
import { User } from "../../models/interfaces/auth.interfaces";
import { AuthStore, useAuthStore } from "../../store/authStore";
import Layout from "../Layouts/Layout";

function ListaUsuariosPage () {
  const reFetchList = useAuthStore((state: AuthStore) => state.reFetchUsers)
  
  const {data, loading} = useGet<User[]>('auth', reFetchList)

  return (
    <Layout>
      {
        loading ?
        <p>Cargando...</p>
        :
        data && data.length > 0 ?
        
        <section className="flex justify-center w-full">
          <div className="flex flex-col space-y-2 w-3/4">

            {
              data.map((item, index) => (
                <UserListItem data={item} key={index} />
              ))
            }
          </div>

        </section>
        :
        <section>
          <p>No hay usuarios activos</p>
        </section>
      }
    </Layout>
  )
}

export default ListaUsuariosPage;