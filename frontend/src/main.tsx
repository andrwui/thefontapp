import { createRoot } from 'react-dom/client'
import './styles/main.css'
import { BrowserRouter } from 'react-router-dom'
import Layout from 'routes/Layout'
import Toasts from 'components/common/Toasts'

// handling wails binding context error
if (!('go' in window)) location.replace('/')

const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
  <BrowserRouter>
    <Toasts></Toasts>
    <Layout />
  </BrowserRouter>,
)
