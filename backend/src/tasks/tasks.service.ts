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
      throw new NotFoundException(`Task with ID "${id}" not found`);
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
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    this.tasks.splice(index, 1);
  }
}
