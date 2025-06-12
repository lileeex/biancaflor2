import { SvgIconProps } from '@mui/material';
import CreditCardIcon from 'components/icons/menu-icons/CreditCardIcon';
import HomeIcon from 'components/icons/menu-icons/HomeIcon';
import CoinIcon from 'components/icons/card-icons/CoinIcon';
import InvestIcon from 'components/icons/menu-icons/InvestIcon';
import LoanIcon from 'components/icons/menu-icons/LoanIcon';
import ServiceIcon from 'components/icons/menu-icons/ServiceIcon';
import SettingsIcon from 'components/icons/menu-icons/SettingsIcon';
import SignInIcon from 'components/icons/menu-icons/SignInIcon';
import SignUpIcon from 'components/icons/menu-icons/SignUpIcon';
import TransferIcon from 'components/icons/menu-icons/TransferIcon';

import paths from '../../../../src/routes/path'; // <--- ADD THIS IMPORT - Adjust path if needed
//import IceCreamIcon from 'components/icons/menu-icons/IcecreamIcon';

export enum linkEnum {
  Inicio = 'inicio',
  Inventario = 'inventario',
  Sabores = 'sabores',
  Lote = 'lote',
  Heladeros = 'heladeros',
  Pesado = 'pesado',
  Batido = 'batido',
  Envase = 'envase',
  Envasado = 'envasado',
  ProductoProceso = 'producto proceso',
  ReporteProductoTerminado = 'reporte producto terminado',
  ReporteEfectividad = 'reporte efectividad',
  ReporteInventario = 'reporte inventario',
  MateriaPrima = 'materia prima',
  Setting = 'Setting',
  Accounts = 'accounts',
  Login = 'login',
  Signup = 'sign-up',
  ForgetPassword = 'forget-password',
  ResetPassword = 'reset-password',
}

export interface MenuLinkType {
  id: number;
  title: string;
  link: string;
  icon?: (props: SvgIconProps) => JSX.Element;
  available: boolean;
}
export const menuLinks: MenuLinkType[] = [
  {
    id: 1,
    title: linkEnum.Inicio,
    link: paths.default, // Changed to use paths.default
    icon: HomeIcon,
    available: true,
  },
  {
    id: 2,
    title: linkEnum.Inventario,
    link: paths.inventario, // <--- CHANGE THIS LINE to use the defined path
    icon: SignInIcon, // You can choose a more fitting icon if available
    available: true,
  },
  {
    id: 3,
    title: linkEnum.Sabores,
    link: paths.sabores, // <--- CHANGE THIS LINE to use the defined path
    icon: SignInIcon,
    available: true,
  },
  {
    id: 4,
    title: linkEnum.Lote,
    link: paths.lote, // <--- CHANGE THIS LINE
    icon: SignInIcon,
    available: true,
  },
  {
    id: 5,
    title: linkEnum.Heladeros,
    link: paths.heladeros, // <--- CHANGE THIS LINE
    icon: SignInIcon,
    available: true,
  },
  {
    id: 6,
    title: linkEnum.Pesado,
    link: paths.pesado, // <--- CHANGE THIS LINE
    icon: SignInIcon,
    available: true,
  },
  {
    id: 7,
    title: linkEnum.Batido,
    link: paths.batido, // <--- CHANGE THIS LINE
    icon: SignInIcon,
    available: true,
  },
  {
    id: 8,
    title: linkEnum.Envase,
    link: paths.envase, // <--- CHANGE THIS LINE
    icon: SignInIcon,
    available: true,
  },
  {
    id: 9,
    title: linkEnum.Envasado,
    link: paths.envasado, // <--- CHANGE THIS LINE
    icon: SignInIcon,
    available: true,
  },
  {
    id: 10,
    title: linkEnum.ProductoProceso,
    link: paths.productoProceso, // <--- CHANGE THIS LINE
    icon: SignInIcon,
    available: true,
  },
  {
    id: 11,
    title: linkEnum.ReporteProductoTerminado,
    link: paths.reporteProductoTerminado, // <--- CHANGE THIS LINE
    icon: SignInIcon,
    available: true,
  },
  {
    id: 12,
    title: linkEnum.ReporteEfectividad,
    link: paths.reporteEfectividad, // <--- CHANGE THIS LINE
    icon: SignInIcon,
    available: true,
  },
  {
    id: 13,
    title: linkEnum.ReporteInventario,
    link: paths.reporteInventario, // <--- CHANGE THIS LINE
    icon: SignInIcon,
    available: true,
  },

  //{
  // id: 14,
  //  title: linkEnum.MateriaPrima,
  // link: paths.materiaPrima, // <--- CHANGE THIS LINE
  // icon: SignUpIcon,
  // available: true,
  //},
  {
    id: 14,
    title: linkEnum.Login,
    link: paths.login, // <--- CHANGE THIS LINE
    icon: SignInIcon,
    available: true,
  },
  {
    id: 15,
    title: linkEnum.Signup,
    link: paths.signup, // <--- CHANGE THIS LINE
    icon: SignUpIcon,
    available: true,
  },

  // The duplicate 'Inventario' entry below should be removed or merged into the existing one.
  // I will remove the duplicate for clarity, assuming the first one is the intended one.
  // {
  //   id: 16,
  //   title: 'Inventario',
  //   link: '/inventario', // Asegúrate de que coincida con la ruta
  //   available: true,
  // },
];
