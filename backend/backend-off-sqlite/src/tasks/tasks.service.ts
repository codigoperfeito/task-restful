import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task com ID "${id}" nao encontrado`); // aqui um excessao especifica que mostra que nao foi encontrado
    }
    return task;
  }
  
  createTask(title: string, description: string): Task {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      complete: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, title: string, description: string, complete: boolean): Task {
    const task = this.getTaskById(id);
    task.title = title;
    task.description = description;
    task.complete = complete;
    return task;
  }

  deleteTask(id: string): void {
    const valueInitial = this.tasks.length;
    this.tasks = this.tasks.filter(e=>e.id !== id);
    if (valueInitial === this.tasks.length) {
      throw new NotFoundException(`Task com ID "${id}" nao encontrado`);
    }
  }
}
