import './main.css'
import Toasts from 'components/Toasts'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Layout from 'routes/layout'

// handling wails binding context error
if (!('go' in window)) location.replace('/')

const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
  <BrowserRouter>
    <Toasts />
    <Layout />
  </BrowserRouter>,
)
