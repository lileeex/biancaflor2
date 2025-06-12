import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import paths, { rootPaths } from './path';

/* ---------------- Lazy loads various components ------------------------- */
const App = lazy(() => import('App'));
const MainLayout = lazy(() => import('layouts/main-layout'));
const AuthLayout = lazy(() => import('layouts/auth-layout'));
const Inicio = lazy(() => import('pages/inicio'));
const Spinner = lazy(() => import('components/loading/Splash'));
const LoadingProgress = lazy(() => import('components/loading/LoadingProgress'));

const LoginPage = lazy(() => import('pages/authentication/login'));
const SignUpPage = lazy(() => import('pages/authentication/signup'));
const ForgetPasswordPage = lazy(() => import('pages/authentication/forget-password'));
const ResetPasswordPage = lazy(() => import('pages/authentication/reset-password'));

const Inventario = lazy(() => import('pages/Inventario'));
const Sabores = lazy(() => import('pages/Sabores'));
const Lote = lazy(() => import('pages/Lote'));
const Heladeros = lazy(() => import('pages/Heladeros'));
const Pesado = lazy(() => import('pages/Pesado'));
const Batido = lazy(() => import('pages/Batido'));
const Envase = lazy(() => import('pages/Envase'));
const Envasado = lazy(() => import('pages/Envasado'));
const ProductoProceso = lazy(() => import('pages/ProductoProceso'));
const ReporteProductoTerminado = lazy(() => import('pages/ReporteProductoTerminado'));
const ReporteEfectividad = lazy(() => import('pages/ReporteEfectividad'));
const ReporteInventario = lazy(() => import('pages/ReporteInventario'));
//const MateriaPrima = lazy(() => import('pages/MateriaPrima'));
//const NotFoundPage = lazy(() => import('pages/not-found'));
/* -------------------------------------------------------------------------- */

/**
 * @Defines the routes for the application using React Router.
 */
const routes = [
  {
    element: (
      <Suspense fallback={<Spinner />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: paths.default,
        element: (
          <MainLayout>
            <Suspense fallback={<LoadingProgress />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            index: true,
            element: <Inicio />,
          },
          {
            path: paths.inventario,  // Ruta para la página de inventario
            element: <Inventario />,
          },
          {
            path: paths.sabores,  // Ruta de Sabores
            element: <Sabores />,
          },
          {
            path: paths.lote,  // Ruta de lote
            element: <Lote />,
          },
          {
            path: paths.heladeros,  // Ruta de heladeros
            element: <Heladeros />,
          },
          {
            path: paths.pesado,  // Ruta de pesado
            element: <Pesado />,
          },
          {
            path: paths.batido,  // Ruta de batido
            element: <Batido />,
          },
          {
            path: paths.envase,  // Ruta de envase
            element: <Envase />,
          },
          {
            path: paths.envasado,  // Ruta de envasado
            element: <Envasado />,
          },
          {
            path: paths.productoProceso,  // Ruta de pp
            element: <ProductoProceso />,
          },
          {
            path: paths.reporteProductoTerminado,  // Ruta de Rpt
            element: <ReporteProductoTerminado />,
          },
          {
            path: paths.reporteEfectividad,  // Ruta de Rpt
            element: <ReporteEfectividad />,
          },
          {
            path: paths.reporteInventario,  // Ruta de Rpt
            element: <ReporteInventario />,
          },
          {
            // path: paths.materiaPrima,  // Ruta de Rpt
            // element: <MateriaPrima />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to={paths.notFound} replace />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: '/biancaflor',
});

export default router;