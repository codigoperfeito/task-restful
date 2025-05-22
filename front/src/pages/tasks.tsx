import Task from "@/types/task";
import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, getTaskId, updateTask } from "@/utils/apiTask";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faPenToSquare, faCircleCheck, faCircleXmark, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function TasksManager() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskView, setTaskView] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<boolean | string>("all")
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const usuario = localStorage.getItem("username");
        if (!usuario) {
          router.push("/");
        } else {
          setLoading(true);
          const tasksData = await getTasks();
          setTaskView(tasksData);
          setTasks(tasksData);
          setUserName(usuario);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [router]);

  const setComplete = async (id: string, title: string, description: string, complete: boolean) => {
    try {
      const updatedTasks = await updateTask(id, title, description, complete);
      setTaskView(updatedTasks);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const filterTasks = async (props: string | boolean) => {
    try {
      if (props === "all") {
        const allTasks = await getTasks();
        setTaskView(allTasks);
        setStatusFilter(props)
      } else {
        const taskViewFilter = tasks.filter((e) => e.complete === props);
        setTaskView(taskViewFilter);
        setStatusFilter(props)
      }
    } catch (error) {
      console.error("Erro filtrando teste");
    }
  };

  const limpInput = () => {
    setId(null);
    setTitle("");
    setDescription("");
    setStatus(false);
  };

  const postTask = async () => {
    try {
      setLoading(true);
      const newTasks = await createTask(title, description);
      setTaskView(newTasks);
      setTasks(newTasks);
      limpInput();
    } catch (error) {
      console.error("Error post task");
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (id: string) => {
    try {
      const task = await getTaskId(id);
      setId(task.id);
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.complete);
    } catch (error) {
      console.error("Error editTask:");
    }
  };

  const finalEditTask = async (id: string, title: string, description: string, complete: boolean) => {
    try {
      setLoading(true);
      const updatedTasks = await updateTask(id, title, description, complete);
      setTaskView(updatedTasks);
      setTasks(updatedTasks)
      limpInput();
    } catch (error) {
      console.error("Error finalEditTask", error);
    } finally {
      setLoading(false);
    }
  };

  const dellTask = async (elemento: string) => {
    try {
      const updatedTasks = await deleteTask(elemento);
      setTaskView(updatedTasks);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error dellTask:");
    }
  };

  const Logout = () => {
    localStorage.removeItem("username");
    router.push("/");
  };

  return (
    <div>
      <div className="nav max-w-full p-2 flex dark:text-black justify-between items-center content-center bg-gray-100 dark:bg-gray-100">
        <h3 className="text-base">{`Bem vindo, ${userName}`}</h3>
        <div className="logout items-center">
          <button
            onClick={Logout}
            className="flex cursor-pointer items-center bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
          >
            <p>Sair</p>
            <FontAwesomeIcon size="sm" className="p-2" icon={faRightFromBracket} />
          </button>
        </div>
      </div>
      <div className="items-center flex-col flex mx-auto">
        <div className="mt-10">
          <div className="text-center">
            <h1 className="text-3xl text-indigo-600 font-bold dark:text-indigo-300">Task Manager</h1>
            <p className="text-gray-600 black:text-white dark:text-gray-200">
              Organize seu trabalho e melhore sua produção
            </p>
          </div>
        </div>
        <div className="headler w-4xl border-1 text-gray-800 dark:bg-gray-800 px-10 mt-10 shadow-lg flex flex-col rounded-md">
          <div className="inputs m-10 dark:text-white ">
            <h1 className="font-bold text-2xl">Nova Tarefa</h1>
          </div>
          <div className="filters">
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
                  <input
                    checked={status}
                    type="checkbox"
                    onChange={(e) => setStatus(e.target.checked)}
                    className="mr-2"
                    name="complete"
                  />
                  <p className="text-gray-600 dark:text-white">Concluida</p>
                </div>
              ) : (
                ""
              )}
              {id === null ? (
                <div className="flex justify-end">
                  <button
                    onClick={postTask}
                    className="flex cursor-pointer items-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-3 rounded"
                  >
                    <p>Adicionar</p>
                  </button>
                </div>
              ) : (
                <div className="flex justify-end">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => finalEditTask(id, title, description, status)}
                      className="flex cursor-pointer items-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-3 rounded"
                    >
                      <p>Atualizar</p>
                    </button>
                    <button
                      onClick={limpInput}
                      className="flex cursor-pointer items-center bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
                    >
                      <p>Cancelar</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="headler w-4xl mt-2">
          <div>
            <h3 className="text-2xl">Suas Tarefas</h3>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => filterTasks("all")}
              className={`px-3 py-1 text-sm rounded-md ${(statusFilter === "all"? "bg-blue-700" : "bg-gray-700" )} text-white cursor-pointer`}
            >
              Todos
            </button>
            <button
              type="button"
              onClick={() => filterTasks(false)}
              className={`px-3 py-1 text-sm rounded-md ${(statusFilter === false ? "bg-blue-700" : "bg-gray-700" )} text-white cursor-pointer`}
            >
              Ativos
            </button>
            <button
              type="button"
              onClick={() => filterTasks(true)}
              className={`px-3 py-1 text-sm rounded-md ${(statusFilter === true? "bg-blue-700" : "bg-gray-700" )} text-white cursor-pointer`}
            >
              Completos
            </button>
          </div>
        </div>
        <div className="mb-10">
          {taskView.length === 0 ? (
            <div className="headler w-4xl dark:text-green-100 text-gray-800 border-1 dark:bg-gray-800 p-10 mt-5 shadow-lg flex flex-col rounded-md">
              <h3>Nenhuma tarefa</h3>
            </div>
          ) : loading === true ? (
            <div className="headler w-4xl dark:text-green-100 text-gray-800 border-1 dark:bg-gray-800 p-10 mt-5 shadow-lg flex flex-col rounded-md">
              <h3>Carregando ...</h3>
            </div>
          ) : (
            taskView.map((task) => (
              <div
                key={task.id}
                className="headler w-4xl translate-1.5 text-gray-800 border-1 dark:bg-gray-800 dark:text-gray-100 p-10 mt-5 shadow-lg flex flex-col rounded-md"
              >
                <div className="flex justify-between ">
                  {!task.complete ? (
                    <h3 className="text-xl h-10 font-bold">{task.title}</h3>
                  ) : (
                    <h3 className="text-xl line-through text-green-400 h-10 font-bold">{task.title}</h3>
                  )}
                  <div className="flex items-center space-x-5 text-lg">
                    {!task.complete ? (
                      <button
                        name="task-completa"
                        onClick={() => setComplete(task.id, task.title, task.description, true)}
                        type="button"
                      >
                        <FontAwesomeIcon
                          size="sm"
                          className="text-green-500 hover:text-green-700 cursor-pointer"
                          icon={faCircleCheck}
                        />
                      </button>
                    ) : (
                      <button
                        name="taskFalse"
                        onClick={() => setComplete(task.id, task.title, task.description, false)}
                        type="button"
                      >
                        <FontAwesomeIcon
                          size="sm"
                          className="text-pink-500 hover:text-pink-700 cursor-pointer"
                          icon={faCircleXmark}
                        />
                      </button>
                    )}
                    <button name="taskEditar" onClick={() => editTask(task.id)} type="button">
                      <FontAwesomeIcon
                        className=" text-indigo-500 hover:text-indigo-700 cursor-pointer"
                        icon={faPenToSquare}
                      />
                    </button>
                    <button name="taskDelete" onClick={() => dellTask(task.id)} type="button">
                      <FontAwesomeIcon
                        size="sm"
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        icon={faTrash}
                      />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  {!task.complete ? (
                    <h3 className="text-base">{task.description}</h3>
                  ) : (
                    <h3 className="text-base line-through text-green-400">{task.description}</h3>
                  )}
                  {!task.complete ? (
                    <h3 className="text-base"></h3>
                  ) : (
                    <h3 className="text-base font-semibold text-green-400">completo</h3>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
