import Task from "@/types/task";
import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, getTaskId, updateTask } from "@/utils/apiTask";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket,faPenToSquare, faCircleCheck, faCircleXmark, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function TasksManager() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskView, setTaskView] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false)

  useEffect(() => {
    const usuario = localStorage.getItem('username');
    if (!usuario) {
      router.push('/');
    } else {
      setLoading(true);
      getTasks().then((e) => {
        setTaskView(e)
        setTasks(e)
      });
      setUserName(usuario);
      setLoading(false)
    }
  }, [router]);
  
  const setComplete = (id:string,title:string,description:string,complete:boolean) =>{
    updateTask(id,title,description,complete).then(e=>setTaskView(e))
  }

  const filterTasks = (props:string | boolean) => { 
    if(props === "all"){
      getTasks().then((e) => setTaskView(e));
    }else{
      const taskView = tasks.filter(e=>e.complete === props)
      setTaskView(taskView)
    }
    
  }
  const limpInput = () =>{
    setId(null)
    setTitle("")
    setDescription("")
    setStatus(false);
  }
  const postTask = () => {
    setLoading(true)
    createTask(title, description).then((e)=>{setTaskView(e)});
    limpInput()
    setLoading(false)
  }
  const editTask = (id:string) => {
    getTaskId(id).then((e)=>{
    setId(e.id)
    setTitle(e.title)
    setDescription(e.description)
    setStatus(e.complete);
    })
  }
  const fishEdit = (id:string,title:string,description:string,complete:boolean) => {
    setLoading(true)
    updateTask(id,title,description,complete).then(e=>setTaskView(e))
    setLoading(false)
    limpInput()
  }
  const dellTask = (elemento:string) =>{
    deleteTask(elemento).then((e)=>{setTaskView(e)})
  }
  const Logout = () => {
    localStorage.removeItem("username");
    router.push("/");
  };

  return (
    <div >
      <div className="nav max-w-full p-2 flex dark:text-black justify-between items-center content-center bg-gray-100 dark:bg-gray-100">
        <h3 className="text-base ">{`Bem vindo, ${userName}`}</h3>
        <div className="logout items-center">
          <button onClick={Logout} className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
            <p>Sair</p>
            <FontAwesomeIcon size="sm" className="p-2" icon={faRightFromBracket} />
          </button>
        </div>
      </div>
      <div className="items-center flex-col flex mx-auto">
        <div className="mt-10">
          <div className="text-center">
            <h1 className="text-3xl text-indigo-600 font-bold dark:text-indigo-300">Task Manager</h1>
            <p className="text-gray-600 black:text-white dark:text-gray-200">Organize seu trabalho e melhore sua produção</p>
          </div>
        </div>
        <div className="headler w-4xl border-1 text-gray-800  dark:bg-gray-800 px-10  mt-10 shadow-lg flex flex-col rounded-md">
          <div className="inputs m-10  dark:text-white ">
            <h1 className="font-bold text-2xl">Nova Tarefa</h1>
          </div>
          <div className="filters  ">
            <div className="inputsf px-3 w-auto">
              <p>Titulo</p>
              <input
                type="text"
                className="w-3xl p-2 m-2 bg-gray-50 border-1 shadow-lg rounded-md dark:text-black dark:bg-gray-200"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p>Descrição</p>
              <input
                type="text"
                className="w-3xl p-2 m-2 bg-gray-100 border-1 shadow-lg rounded-md dark:text-black dark:bg-gray-200"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mx-10 my-5">
              {id !== null ? (
                <div className="flex items-center">
                <input checked={status} type="checkbox" onChange={(e)=>setStatus(e.target.checked)} className="mr-2" name="complete" />
                <p className="text-gray-600 dark:text-white">Concluida</p>
                </div>
              ): ("")
              }
              {id === null ? (
                <div className="flex justify-end">
                  <button onClick={postTask} className="flex items-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-3 rounded">
                    <p>Adicionar</p>
                  </button>
                </div>
              ): (
                <div className="flex justify-end">
                  <div className="flex space-x-2">
                      <button onClick={()=>fishEdit(id,title,description,status)} className="flex items-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-3 rounded">
                        <p>Atualizar</p>
                      </button>
                      <button onClick={limpInput} className="flex items-center bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded">
                        <p>Cancelar</p>
                      </button>
                  </div>
                </div>
                
              )
              }
            </div>
          </div>
        </div>
        <div className="headler w-4xl mt-2">
              <div><h3 className="text-2xl">Suas Tarefas</h3></div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={(()=>filterTasks("all"))} className="px-3 py-1 text-sm rounded-md bg-blue-700 text-white" >Todos</button>
                <button type="button" onClick={(()=>filterTasks(false))} className="px-3 py-1 text-sm rounded-md bg-gray-700 text-white" >Ativos</button>
                <button type="button" onClick={(()=>filterTasks(true))} className="px-3 py-1 text-sm rounded-md bg-gray-700 text-white" >Completos</button>
              </div>
        </div>
        <div className="mb-10">
          {tasks.length === 0 ? 
        <div className="headler w-4xl text-gray-800 border-1 dark:bg-gray-800 p-10  mt-5  shadow-lg flex flex-col rounded-md">
          <h3>Nenhuma tarefa</h3>
        </div>
        : loading === true ? 
        <div className="headler w-4xl text-gray-800 border-1 dark:bg-gray-800 p-10  mt-5  shadow-lg flex flex-col rounded-md">
          <h3>Carregando ...</h3>
        </div>
        :
        taskView.map((task) => (
          <div key={task.id} className="headler w-4xl translate-1.5 text-gray-800 border-1 dark:bg-gray-800 dark:text-gray-100 p-10  mt-5 shadow-lg flex flex-col rounded-md">
            <div className="flex justify-between ">
              {!task.complete? <h3 className="text-xl h-10 font-bold">{task.title}</h3> : <h3 className="text-xl line-through text-green-400 h-10 font-bold">{task.title}</h3>}
              <div className="flex items-center space-x-5 text-lg">
                {!task.complete? 
                (<button  name="task-completa" onClick={()=>setComplete(task.id,task.title,task.description,true)} type="button">
                  <FontAwesomeIcon size="sm" className="text-green-500 hover:text-green-700 cursor-pointer" icon={faCircleCheck} />
                </button>)
                :
                (<button name="taskFalse" onClick={()=>setComplete(task.id,task.title,task.description,false)} type="button">
                  <FontAwesomeIcon size="sm" className="text-pink-500 hover:text-pink-700 cursor-pointer" icon={faCircleXmark} />
                </button>)
                }
                <button name="taskEditar" onClick={()=>editTask((task.id))} type="button">
                  <FontAwesomeIcon className=" text-indigo-500 hover:text-indigo-700 cursor-pointer" icon={faPenToSquare} />
                </button>
                <button name="taskDelete" onClick={() => dellTask((task.id))} type="button">
                  <FontAwesomeIcon size="sm" className="text-red-500 hover:text-red-700 cursor-pointer" icon={faTrash} />
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              {!task.complete? <h3 className="text-base">{task.description}</h3> : <h3 className="text-base line-through text-green-400">{task.description}</h3>}
              {!task.complete? <h3 className="text-base"></h3> : <h3 className="text-base font-semibold text-green-400">completo</h3>}
            </div>
          </div>
        ))
        }
        </div>
      </div>
    </div>
  );
}