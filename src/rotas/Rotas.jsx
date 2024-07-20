import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cadastro from '../paginas/Cadastro'
import Home from '../paginas/Home'
import Tarefas from '../paginas/Tarefas'
import Private from './Private'

const Rotas = () => {
  return (
    <BrowserRouter basename='/task'>
      <Routes>
        <Route path='/task' element={<Home />} />
        <Route path='cadastro' element={<Cadastro />} />
        <Route path='tarefas' element={<Private><Tarefas /></Private>} />

      </Routes>
    </BrowserRouter>
  )
}

export default Rotas
