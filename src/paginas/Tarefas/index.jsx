import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebaseConfig'
import { signOut } from 'firebase/auth'
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { toast } from 'react-toastify';


const Tarefas = () => {
  const [novaTarefa, setNovaTarefa] = useState('')
  const [dadosUsuario, setDadosUsuario] = useState({})
  const [tarefasUsuario, setTarefasUsuario] = useState([])
  const [editar, setEditar] = useState({})
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    async function loadTarefas() {
      const lst = localStorage.getItem('dadosUsuario')
      setDadosUsuario(JSON.parse(lst))

      if (dadosUsuario) {
        const data = JSON.parse(lst)
        const colecao = collection(db, "tarefas")
        const consulta = query(colecao, orderBy("created", "desc"), where("userUid", "==", data?.uid))
        
        onSnapshot(consulta, (itens) => {

          let lista = []

          itens.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().uid,
            })
          })
          setTarefasUsuario(lista)
        })
      }
    }
    loadTarefas()
  }, [])

  // Sair
  async function sair() {
    if (confirm("Deseja mesmo sair?")) {
      await signOut(auth)
      localStorage.setItem("dadosUsuario", "")
      toast.warn("Você está deslogado!")
    }
  }

  // Insere nova tarefa
  async function inserirTarefa(e) {
    e.preventDefault()
    if (novaTarefa === '') {
      alert("Digite uma tarefa!")
      return
    }

    await addDoc(collection(db, "tarefas"), {
      tarefa: novaTarefa,
      created: new Date(),
      userUid: dadosUsuario?.uid,
    }).then(() => {
      setNovaTarefa("")
      document.getElementById("novaTarefa").focus()

    }).catch((e) => {
      console.log(e)
      toast.error("Algo deu errado!")
    })
  }

  // Deleta tarefa
   function deletarTarefa(id){
    const item = doc(db, "tarefas", id)
     deleteDoc(item)
  }

  // Editar
  async function editarTarefa(item){
    setNovaTarefa(item.tarefa)
    setEditar(item)
    document.getElementById("novaTarefa").focus()
  }

  //Atualizar
  async function atualizar(e){
    e.preventDefault()
    const query = doc(db, "tarefas", editar.id)
    await updateDoc(query, {
      tarefa: novaTarefa
    }).then(()=>{
      setNovaTarefa('')
      setEditar({})
    })
  }

  //Concluir tarefa
  function concluir(id){
    document.getElementById(id).classList.toggle('concluida')
    if(checked){
      setChecked(false)
      console.log(checked)
    }else{
      setChecked(true)
      console.log(checked)
    }
    console.log(id)
  }


  return (
    <div className='containerTarefas'>
      <div className='tarefas'>
        <h1>Tarefas</h1>

        <form method='POST' className='inputNovaTarefa'>
          <input id="novaTarefa" type="text" name='tarefas' placeholder='Insira uma tarefa' value={novaTarefa} onChange={(e) => { setNovaTarefa(e.target.value) }} />
          {Object.keys(editar).length > 0 ? (<button className='btnAtualizar' type='submit' onClick={atualizar}>Atualizar</button>) : (<button className='btnInserir' type='submit' onClick={inserirTarefa}>+</button>)}
        </form>

        <ul className='listaDeTarefas'>
        {tarefasUsuario.map((item)=>(
          <li key={item.id}>
            <div>
              {/* <input id={item.id} className='concluirTarefa' type="checkbox" onClick={()=>{concluir(item.id)}} /> */}
              {item.tarefa}
            </div>
            <div className='icones'>
              <MdEdit className='iconeEditar' onClick={()=>{editarTarefa(item)}}/>
              <FaTrash className='iconeDeletar' onClick={()=>deletarTarefa(item.id)}/>
            </div>
          </li>
        ))}
        </ul>

        <button className='btnSair' onClick={sair}>Sair</button>
      </div>
    </div>
  )
}

export default Tarefas
