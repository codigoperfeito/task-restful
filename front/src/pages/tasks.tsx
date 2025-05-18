import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

type Task = {
  id: number;
  title: string;
  description: string;
  complete: boolean;
};

export default function TaskManager() {
  const router = useRouter();

  const [username, setUsername] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [complete, setComplete] = useState(false);

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const baseUrl = "http://localhost:3000/tasks";

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      router.push("/"); // Redireciona pra login se não tiver username
    } else {
      setUsername(storedUsername);
      fetchTasks();
    }
  }, [router]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Task[]>(baseUrl);
      setTasks(res.data);
    } catch (err) {
      alert("Erro ao carregar tarefas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return alert("Título obrigatório");
    try {
      await axios.post(baseUrl, {
        title,
        description,
      });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      alert("Erro ao adicionar tarefa");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      fetchTasks();
    } catch (err) {
      alert("Erro ao excluir tarefa");
    }
  };

  const startEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setComplete(task.complete);
  };

  const saveEditTask = async () => {
    if (!title.trim()) return alert("Título obrigatório");
    if (editingTaskId === null) return;
    try {
      await axios.put(`${baseUrl}/${editingTaskId}`, {
        title,
        description,
        complete,
      });
      setEditingTaskId(null);
      setTitle("");
      setDescription("");
      setComplete(false);
      fetchTasks();
    } catch (err) {
      alert("Erro ao editar tarefa");
    }
  };

  const toggleComplete = async (task: Task) => {
    try {
      await axios.put(`${baseUrl}/${task.id}`, {
        title: task.title,
        description: task.description,
        complete: !task.complete,
      });
      fetchTasks();
    } catch (err) {
      alert("Erro ao atualizar status da tarefa");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    router.push("/");
  };

  if (!username) {
    // Enquanto verifica username, evita renderizar a tela
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bem vindo, {username}!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Sair
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-2"
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-2"
        />
        <label className="flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            checked={complete}
            onChange={(e) => setComplete(e.target.checked)}
          />
          <span>Completo</span>
        </label>
        {editingTaskId === null ? (
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Adicionar
          </button>
        ) : (
          <div>
            <button
              onClick={saveEditTask}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mr-2"
            >
              Salvar
            </button>
            <button
              onClick={() => {
                setEditingTaskId(null);
                setTitle("");
                setDescription("");
                setComplete(false);
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : tasks.length === 0 ? (
        <p>Nenhuma tarefa encontrada.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h2
                  className={`font-semibold ${
                    task.complete ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </h2>
                <p className={task.complete ? "line-through text-gray-400" : ""}>
                  {task.description}
                </p>
              </div>
              <div className="space-x-2 flex items-center">
                <button
                  onClick={() => toggleComplete(task)}
                  className={`px-2 py-1 rounded ${
                    task.complete
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {task.complete ? "Desmarcar" : "Completar"}
                </button>
                <button
                  onClick={() => startEditTask(task)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-600 hover:underline"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
