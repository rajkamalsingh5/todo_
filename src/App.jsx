import { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import Navbar from './Components/Navbar'
// const { v4: uuidv4 } = require('uuid');
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo,setTodo]=useState('');
  const [todos,setTodos]=useState([]);//arrays of todo
  const [showFinished,setshowFinished]=useState(true);

  //get from localstorage
  useEffect(()=>{
    let todoString=localStorage.getItem("todos")
    if(todoString){
    let todos =JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  },[])

  const saveLocalStorage=(item)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleFinished=(e)=>{
    setshowFinished(!showFinished)
  }

  const handelEdit=(e,id)=>
  {
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveLocalStorage()
  }


  const handelDelete=(e,id)=>
  {
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveLocalStorage()
  }


    const handelAdd=()=>
  {
setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo("")
    saveLocalStorage()
  }
  const handelChange=(e)=>
  {
    setTodo(e.target.value)
  }
  const handelCheckbox=(e)=>
  {
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos);
    saveLocalStorage()
  }
  return (
    <>
    <Navbar/>
    <div className="md:container md:mx-auto my-2 rounded-xl bg-purple-300 p-5 min-h-[85vh] md:w-2/3">
      <div className="addTodo my-5">
        <h2 className="text-lg font-bold">Add a Task</h2>
        <input  onChange={handelChange} value={todo} type="text" className='rounded-md w-1/2 py-1 ' />
        <button onClick={ handelAdd} disabled={todo.length<3||todo.length>60} className='bg-green-600 disabled:bg-red-500 p-4 py-1 text-xl rounded-md mx-6'><IoIosAddCircle /></button>
      </div>
      <input onChange={toggleFinished} type="checkbox" checked={showFinished}/>show Finished Tasks
      <h1 className='text-xl font-bold underline'>Your Tasks</h1>
      <div className="todos">
          {todos.length===0 && <div className='m-5 text-lg font-bold '>No Pending Tasks..</div> }
        {todos.map(item=>
          {
        return (showFinished||!item.isCompleted)&&<div key={item.id} className="todo flex md:w-3/5 justify-between">
          <div className='flex gap-5 items-center'>
          <input name={item.id} onChange={handelCheckbox} type="checkbox" checked={item.isCompleted} />
          <div className={item.isCompleted?"line-through":""}>
            {item.todo}
          </div>
          </div>
          <div className="buttons flex h-full ">
            <button onClick={(e)=>{handelEdit(e,item.id)}} className='bg-blue-600 p-4 py-1 text-lg rounded-md mx-2 my-2'><FaEdit /></button>
            <button onClick={(e)=>{handelDelete(e,item.id)}} className='bg-blue-600 p-4 py-1 text-lg rounded-md mx-2 my-2'><MdDelete /></button>
          </div>

        </div>
          })}

      </div>

      </div>
    </>
  )
}

export default App
