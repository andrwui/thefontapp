import { createRoot } from 'react-dom/client'
import './styles/main.css'
import { BrowserRouter } from 'react-router-dom'
import Layout from 'routes/Layout'

const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>,
)
