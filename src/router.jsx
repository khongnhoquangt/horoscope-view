import { createRouter, createRoute, createRootRoute, redirect } from '@tanstack/react-router'
import Layout from './components/Layout'
import LapLaSo from './pages/LapLaSo'
import KetQuaLaSo from './pages/KetQuaLaSo'

// Root route with shared layout
const rootRoute = createRootRoute({
  component: Layout,
})

// Index route - redirect to /lap-la-so
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/lap-la-so' })
  },
})

// Lap La So (form page)
const lapLaSoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/lap-la-so',
  component: LapLaSo,
})

// Ket Qua La So (results page)
const ketQuaLaSoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ket-qua-la-so',
  component: KetQuaLaSo,
  validateSearch: (search) => ({
    name: search.name || 'Bạn',
    gender: search.gender || '1',
    d: search.d || '1',
    m: search.m || '1',
    y: search.y || '2000',
    cal: search.cal || 'solar',
    h: search.h || '0',
    min: search.min || '0',
    vy: search.vy || new Date().getFullYear().toString(),
  }),
})

const routeTree = rootRoute.addChildren([indexRoute, lapLaSoRoute, ketQuaLaSoRoute])

export const router = createRouter({ routeTree })
