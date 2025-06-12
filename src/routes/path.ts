export const rootPaths = {
  root: '/',
  pagesRoot: '/',
  authRoot: '/authentication',
  errorRoot: '/error',
};

/**
 * Object containing various paths used in the application.
 */
const paths = {
  default: `${rootPaths.root}`,
  inicio: `${rootPaths.pagesRoot}inicio`,
  inventario: `${rootPaths.pagesRoot}inventario`,
  sabores: `${rootPaths.pagesRoot}sabores`,
  lote: `${rootPaths.pagesRoot}lote`,
  heladeros: `${rootPaths.pagesRoot}heladeros`,
  pesado: `${rootPaths.pagesRoot}pesado`,
  batido: `${rootPaths.pagesRoot}batido`,
  envase: `${rootPaths.pagesRoot}envase`,
  envasado: `${rootPaths.pagesRoot}envasado`,
  productoProceso: `${rootPaths.pagesRoot}productoproceso`,
  reporteProductoTerminado: `${rootPaths.pagesRoot}reporteproductoterminado`,
  reporteEfectividad: `${rootPaths.pagesRoot}reporteefectividad`,
  reporteInventario: `${rootPaths.pagesRoot}reporteinventario`,
  accounts: `${rootPaths.pagesRoot}accounts`,
  login: `${rootPaths.authRoot}/login`,
  signup: `${rootPaths.authRoot}/sign-up`,
  forgetPassword: `${rootPaths.authRoot}/forget-password`,
  resetPassword: `${rootPaths.authRoot}/reset-password`,
  notFound: `${rootPaths.errorRoot}/404`,
};

export default paths;
