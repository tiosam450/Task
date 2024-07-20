import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './rotas/Rotas.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ToastContainer autoClose={2500} hideProgressBar={true}/>
    
    <BrowserRouter>
      <Rotas />
    </BrowserRouter>
  </>
)
