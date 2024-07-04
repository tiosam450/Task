import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../firebaseConfig"
import { Navigate } from "react-router-dom"

export default function Private ({children}){
  const [verificacao, setVerificacao] = useState(true)
  const [checkUsuario, setCheckUsuario] = useState(false)

  useEffect(()=>{
    async function checkLogin(){
      onAuthStateChanged(auth, (user)=>{
        if(user){
          const dados = {
            uid: user.uid,
            email: user.email,
          }

          localStorage.setItem("dadosUsuario", JSON.stringify(dados))

          setCheckUsuario(true)
          setVerificacao(false)
          console.log(`Logado com usuário ${dados.email}`)

        }else{
          setCheckUsuario(false)
          setVerificacao(false)
          console.log('Nenhum usuário logado')
          }
      })
    }
    checkLogin()
  }, [])

    if(verificacao){
     return <div></div>
    }

    if(!checkUsuario){
     return <Navigate to='/'/>
    }
  
  return children
}