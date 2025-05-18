import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Param, 
  Body 
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';

/**
 * @Controller tasks
 * @description Controlador para gerenciar que vem do service e faz a licacao https.
 * Base URL: /tasks
 */
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * @Get /
   * @description Retorna todas as tarefas cadastradas.
   * @response responde um objeto json com as tarefas [{task1}, {task2}...].
   */
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  /**
   * @Get /:id
   * @description Retorna uma tarefa específica com base no ID.
   */
  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  /**
   * @Post /
   * @description Cria uma nova tarefa.
   */
  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.createTask(title, description);
  }

  /**
   * @Put /:id
   * @description Atualiza uma tarefa existente com base no ID.
   */
  @Put(':id')
  updateTask(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('complete') complete: boolean,
  ): Task {
    return this.tasksService.updateTask(id, title, description, complete);
  }

  /**
   * @Delete /:id
   * @description Remove uma tarefa com base no ID.
   * @param id ID da tarefa.
   * @response 200 Tarefa removida.
   * @response 404 Tarefa não encontrada.
   */
  @Delete(':id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }
}
