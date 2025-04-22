import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import Home from "../Pages/Home/Home"
import Login from "../Pages/Auth/Login"
import ListPedidoPage from "../Pages/Pedidos/ListPedidoPage"
import CrearPedidoPage from "../Pages/Pedidos/AltaPedidoPage"
import AltaUsuariosPage from "../Pages/Usuarios/AltaUsuarios"
import ListaUsuariosPage from "../Pages/Usuarios/ListaUsuarios"
import AltaIngresoPage from "../Pages/Ingresos/AltaIngresoPage"
import ListaIngresoPage from "../Pages/Ingresos/ListaIngresoPage"
import PosicionesPage from "../Pages/Acopio/AcopioPosicionesPage"
import StockPosicionPage from "../Pages/Stock/StockPosicionPage"
import StockEquipoPage from "../Pages/Stock/StockEquipoPage"
import AltaPlanPage from "../Pages/Planes/AltaPlanPage"
import ListaPlanPage from "../Pages/Planes/ListaPlanPage"
import AltaOrdenProdPage from "../Pages/Ordenes/AltaOrdenProdPage"
import DetallePlanPage from "../Pages/Planes/DetallePlanPage"
import ListaOrdenPage from "../Pages/Ordenes/ListaOrdenPage"
import AltaPaquetePage from "../Pages/Empalilladora/AltaPaquetePage"
import ListaPaquetePage from "../Pages/Empalilladora/ListaPaquetePage"
import AltaCicloPage from "../Pages/Secadero/AltaCicloPage"
import ListaCicloPage from "../Pages/Secadero/ListaCicloPage"
import CambiarContrasenaPage from "../Pages/Perfil/CambiarContrasena"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/empalilladora/paquete/alta" element={<AltaPaquetePage/>}/>
      <Route path="/empalilladora/paquete/lista" element={<ListaPaquetePage/>}/>

      <Route path="/ciclo/alta" element={<AltaCicloPage/>} />
      
      <Route path="/pedidos/lista" element={<ListPedidoPage/>} />
      <Route path="/pedidos/alta" element={<CrearPedidoPage/>}/>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/usuarios/alta" element={<AltaUsuariosPage/>}/>
      <Route path="/usuarios/lista" element={<ListaUsuariosPage/>}/>
      <Route path="/ingresos/alta" element={<AltaIngresoPage/>} />
      <Route path="/ingresos/lista" element={<ListaIngresoPage/>} />
      <Route path="/acopio/posiciones" element={<PosicionesPage/>}/>
      <Route path="/stock/posicion" element={<StockPosicionPage/>}/>
      <Route path="/stock/equipo" element={<StockEquipoPage/>}/>
      <Route path="/plan/alta" element={<AltaPlanPage/>}/>
      <Route path="/plan/lista" element={<ListaPlanPage/>}/>
      <Route path="/orden/alta" element={<AltaOrdenProdPage/>}/>
      <Route path="/plan/detalle/:id" element={<DetallePlanPage />} />
      <Route path="/orden/lista" element={<ListaOrdenPage />} />
      <Route path="/ciclo/lista" element={<ListaCicloPage/>}/>

      <Route path="perfil/contrasena" element={<CambiarContrasenaPage/>}/>
    </>
  )
)