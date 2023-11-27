import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { broswerRouter } from './Router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={broswerRouter}/>
)
