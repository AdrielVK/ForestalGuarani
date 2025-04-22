export interface MenuItem {
  title: string;
  links: { name: string; href: string }[];
}


export const menuItems: MenuItem[] = [
  {
    title: 'Perfil',
    links: [
      { name: 'Cambiar contraseña', href: '/perfil/contrasena' },
    ],
  },
  {
    title: 'Acopio',
    links: [
      { name: 'Ver posiciones', href: '/acopio/posiciones' },
    ],
  },
  {
    title: 'Stock',
    links: [
      { name: 'Ver por posiciones', href: '/stock/posicion' },
      { name: 'Ver por equipo', href: '/stock/equipo' },
    ],
  },
  {
    title: 'Pedidos',
    links: [
      { name: 'Crear nuevo', href: '/pedidos/alta' },
      { name: 'Ver listado', href: '/pedidos/lista' },
    ],
  },
  {
    title: 'Ingresos',
    links: [
      { name: 'Crear nuevo', href: '/ingresos/alta' },
      { name: 'Ver listado', href: '/ingresos/lista' },
    ],
  },
  {
    title: 'Planes de produccion',
    links: [
      { name: 'Crear nuevo', href: '/plan/alta' },
      { name: 'Ver listado', href: '/plan/lista' },
    ],
  },
  {
    title: 'Orden de produccion',
    links: [
      { name: 'Crear nuevo', href: '/orden/alta' },
      { name: 'Ver lista', href: '/orden/lista' },
    ],
    
  },
  {
    title: 'Empalilladora',
    links: [
      { name: 'Ingresar paquete', href: '/empalilladora/paquete/alta' },
      { name: 'Ver paquetes ingresados', href: '/empalilladora/paquete/lista' },
    ],
    
  },
  {
    title: 'Secadero',
    links: [
      { name: 'Crear nuevo ciclo de secado', href: '/ciclo/alta' },
      { name: 'Ver listado de ciclos', href: '/ciclo/lista' },
    ],
    
  },
];