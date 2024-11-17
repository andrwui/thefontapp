import { scan } from 'react-scan'
import { createRoot } from 'react-dom/client'
import './styles/main.css'
import { BrowserRouter } from 'react-router-dom'
import Layout from 'layout/Layout'

scan({
  enabled: true,
})

const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>,
)
