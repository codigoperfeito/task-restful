import Task from "@/types/task";
import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, getTaskId, updateTask } from "@/utils/apiTask";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function TasksManager() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const [id, setId] = useState<number | null>();

  useEffect(() => {
    const usuario = localStorage.getItem('username');
    if (!usuario) {
      router.push('/');
    } else {
      getTasks().then((e) => setTasks(e));
      setUserName(usuario);
    }
  }, [router]);

  const postTask = () => {
    createTask(title, description).then((e)=>{setTasks(e)});
    setTitle("");
    setDescription(""); 
    setStatus(false);
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
              {id === null ? (
                <div className="flex items-center">
                <input type="checkbox" className="mr-2" name="complete" />
                <p className="text-gray-600 dark:text-white">Concluida</p>
                </div>
              ): ("")
              }
              {id !== null ? (
                <div className="flex justify-end">
                  <button onClick={postTask} className="flex items-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-3 rounded">
                    <p>Adicionar Tarefa</p>
                  </button>
                </div>
              ): (
                <div className="flex justify-end">
                  <button onClick={postTask} className="flex items-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-3 rounded">
                    <p>Atualizar</p>
                  </button>
                </div>
              )
              }
            </div>
          </div>
        </div>
        <div className="headler w-4xl mt-2">
              <div><h3 className="text-2xl">Suas Tarefas</h3></div>
              <div className="flex justify-end space-x-2">
                <button type="button" className="px-3 py-1 text-sm rounded-md bg-blue-700 text-white" >Todos</button>
                <button type="button" className="px-3 py-1 text-sm rounded-md bg-gray-700 text-white" >Ativos</button>
                <button type="button" className="px-3 py-1 text-sm rounded-md bg-gray-700 text-white" >Completos</button>
              </div>
        </div>
        {tasks.map((task) => (
          <div className="headler w-4xl text-gray-800 border-1 dark:bg-gray-800 p-10  mt-5  shadow-lg flex flex-col rounded-md">
            <div className="flex justify-between ">
              <h3 className="text-lg font-medium">{task.title}</h3>
              <div className="flex items-center space-x-2 text-lg">
                <button type="button">
                  <FontAwesomeIcon size="sm" className="p-2" icon={faRightFromBracket} />
                  <FontAwesomeIcon size="sm" className="p-2" icon={faRightFromBracket} />
                  <FontAwesomeIcon size="sm" className="p-2" icon={faRightFromBracket} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}