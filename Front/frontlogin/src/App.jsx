import { useEffect, useState, useRef } from 'react'
import './App.css'
import Trash from '../src/assets/exclusão.png'
import api from '../src/services/api'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    console.log(users)
  }, [users])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
    console.log(users)
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers()
  }

  const deleteUsers = async (id) => {
    
    const response = await api.delete(`/usuarios/${id}`)
    console.log("aqui", response) 
    setTimeout(()=> {
      getUsers()
    },)

  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>

      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputName} />
        <input placeholder='Idade' name='idade' type='number' ref={inputAge} />
        <input placeholder='Email' name='email' type='email' ref={inputEmail} />
        <button type='button' onClick={createUsers} >Cadastrar</button>
      </form>

      {users && users.map(user => (
        <div className='card' key={user.id}>
          <div>
            <p>Nome: <span>{user.name}</span> </p>
            <p>Idade: <span>{user.age}</span> </p>
            <p>Email: <span>{user.email}</span> </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>

      ))}

    </div>


  )
}

export default App
