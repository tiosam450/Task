import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  async function logar(e){
    e.preventDefault();
    if(email !== '' && senha !== ''){
      await createUserWithEmailAndPassword(auth, email, senha).then(()=>{
        toast.success("Você está logado!")
        navigate('/tarefas', {replace: true})
      })
    }else{
      alert('Preencha os campos corretamente')
    }
  }

  return (
    <div className='containerForm'>
      <div className='formulario'>
        <h1>Crie sua conta</h1>
        <form className='formInicial'>
          <input type="email" placeholder='Digite seu e-mail' value={email || ""} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Digite sua senha' value={senha || ""} onChange={(e) => setSenha(e.target.value)} />
          <button className='btnSubmit' type='submit' onClick={logar}>Cadastrar</button>
          <p>Já possui uma conta? <Link className='link' to="/">Faça login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Cadastro
