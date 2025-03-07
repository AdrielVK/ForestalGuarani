export interface MenuItem {
  title: string;
  links: { name: string; href: string }[];
}


export const menuItems: MenuItem[] = [
  {
    title: 'Pedidos',
    links: [
      { name: 'Alta', href: '/pedidos/alta' },
      { name: 'Listado', href: '/pedidos/lista' },
    ],
  },
  {
    title: 'Ingresos',
    links: [
      { name: 'Alta', href: '/ingresos/alta' },
      { name: 'Lista', href: '/ingresos/lista' },
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
    title: 'Planes de produccion',
    links: [
      { name: 'Nuevo plan', href: '/plan/alta' },
      { name: 'Lista', href: '/plan/lista' },
    ],
  },
  {
    title: 'Orden de produccion',
    links: [
      { name: 'Nuevo', href: '/orden/alta' },
      { name: 'Lista', href: '/orden/lista' },
    ],
  },
];