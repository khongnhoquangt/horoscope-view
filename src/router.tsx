import {
  createRouter,
  createRoute,
  createRootRoute,
  redirect,
} from '@tanstack/react-router'
import Layout from './components/Layout'
import LapLaSo from './pages/LapLaSo'
import KetQuaLaSo from './pages/KetQuaLaSo'

// Root route with Layout
const rootRoute = createRootRoute({
  component: Layout,
})

// Index route — redirects to /lap-la-so
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/lap-la-so' })
  },
})

// Lap La So route
const lapLaSoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/lap-la-so',
  component: LapLaSo,
})

// Search params type for results page
interface KetQuaSearchParams {
  name: string
  gender: string
  d: string
  m: string
  y: string
  cal: string
  h: string
  min: string
  vy: string
}

// Ket Qua La So route
const ketQuaLaSoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ket-qua-la-so',
  component: KetQuaLaSo,
  validateSearch: (search: Record<string, unknown>): KetQuaSearchParams => ({
    name: (search.name as string) || '',
    gender: (search.gender as string) || '1',
    d: (search.d as string) || '',
    m: (search.m as string) || '',
    y: (search.y as string) || '',
    cal: (search.cal as string) || 'solar',
    h: (search.h as string) || '',
    min: (search.min as string) || '',
    vy: (search.vy as string) || new Date().getFullYear().toString(),
  }),
})

// Create route tree and router
const routeTree = rootRoute.addChildren([indexRoute, lapLaSoRoute, ketQuaLaSoRoute])

export const router = createRouter({ routeTree })

// Register router type for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
