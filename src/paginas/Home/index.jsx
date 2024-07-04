import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebaseConfig';
import { toast } from 'react-toastify';

const Home = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    async function checkLogin(){
      onAuthStateChanged(auth, (user)=>{
        if(user){
          navigate('/tarefas', {replace: true})
        }
      })
    }
    checkLogin()
  }, [])

  
  async function logar(e){
    e.preventDefault();
    if(email !== '' && senha !== ''){
      await signInWithEmailAndPassword(auth, email, senha).then(()=>{
        navigate('/tarefas', {replace: true})
      })
      toast.success("Você está logado!")
    }else{
      alert('Preencha os campos corretamente')
    }
  }

  return (
    <div className='containerForm'>
      <div className='formulario'>
        <h1>Lista de tarefas</h1>
        <form className='formInicial'>
          <input type="email" placeholder='Digite seu e-mail' value={email || ""} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Digite sua senha' value={senha || ""} onChange={(e) => setSenha(e.target.value)} />
          <button className='btnSubmit' type='submit' onClick={logar}>Acessar</button>
          <p>Não possui uma conta? <Link className='link' to="/cadastro">Cadastre-se</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Home
