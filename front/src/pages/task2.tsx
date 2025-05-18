import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [taskInput, setTaskInput] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  interface Task {
    id: number;
    title: string;
    description: string;
    complete: boolean;
  }

  const API_URL = "http://localhost:3000/tasks/";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (!taskInput.trim()) return;

    try {
      const newTask = {
        title: taskInput.trim(),
        description: taskDescription.trim(),
        complete: false,
      };
      const response = await axios.post(API_URL, newTask);
      setTasks([...tasks, response.data]);
      setTaskInput("");
      setTaskDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${API_URL}${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      const updatedTask = {
        ...task,
        title: taskInput || task.title,
        description: taskDescription || task.description,
      };
      const response = await axios.put(`${API_URL}${task.id}`, updatedTask);
      setTasks(
        tasks.map((t) => (t.id === task.id ? response.data : t))
      );
      setEditTaskId(null);
      setTaskInput("");
      setTaskDescription("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const toggleCompletion = async (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    try {
      const response = await axios.put(`${API_URL}${id}`, {
        ...task,
        complete: !task.complete,
      });
      setTasks(tasks.map((t) => (t.id === id ? response.data : t)));
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  const filteredTasks =
    filter === "active"
      ? tasks.filter((task) => !task.complete)
      : filter === "completed"
      ? tasks.filter((task) => task.complete)
      : tasks;

  const activeTaskCount = tasks.filter((task) => !task.complete).length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Task Manager</h1>
        <p className="text-gray-600">Manage your tasks efficiently</p>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        {/* Input Section */}
        <div className="mb-4 space-y-2">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Task title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Task description"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          <button
            onClick={editTaskId ? () => updateTask(tasks.find((task) => task.id === editTaskId)!) : addTask}
            className="bg-primary hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition duration-200"
          >
            {editTaskId ? "Update Task" : "Add Task"}
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            {["all", "active", "completed"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type as "all" | "active" | "completed")}
                className={`filter-button px-3 py-1 font-medium ${
                  filter === type
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700"
                } rounded-md text-sm`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-500">{`${activeTaskCount} active of ${tasks.length} tasks`}</div>
        </div>

        {/* Task List */}
        {filteredTasks.length > 0 ? (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="task-item bg-gray-50 hover:bg-gray-100 rounded-md p-4 flex flex-col space-y-2 transition duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleCompletion(task.id)}
                      className={`w-6 h-6 rounded-full border-2 ${
                        task.complete
                          ? "border-success bg-success"
                          : "border-gray-300"
                      }`}
                    ></button>
                    <span
                      className={`text-lg font-medium ${
                        task.complete
                          ? "line-through text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditTaskId(task.id);
                        setTaskInput(task.title);
                        setTaskDescription(task.description);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-danger hover:text-red-700"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                {task.description && (
                  <p
                    className={`text-sm ${
                      task.complete
                        ? "text-gray-400 line-through"
                        : "text-gray-600"
                    }`}
                  >
                    {task.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <i className="fas fa-tasks text-4xl text-gray-300 mb-2"></i>
            <p className="text-gray-500">No tasks yet. Add one above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
