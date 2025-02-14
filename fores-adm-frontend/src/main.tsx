import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.tsx'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilitiesConfigurator } from './utils/snackbar-manager.ts'
import { Interceptor } from './interceptors/axios.interceptor.tsx'

Interceptor();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider>
      <SnackbarUtilitiesConfigurator/>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </StrictMode>,
)
