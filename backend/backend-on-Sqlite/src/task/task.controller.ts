import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/tasks.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';

/**
 * @Controller tasks
 * @description Controlador para gerenciar que vem do service e faz a licacao https.
 * Base URL: /tasks
 */
@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }
    /**
     * @description o metodo get retorna um array de objetos contendo o a solicitacao da requisicao
     * @returns 
     */
    @Get()
    getTask(): Promise<Task[]> {
        return this.taskService.getTasks()
    }
    /**
   * @Get /:id
   * @description Retorna uma tarefa específica com base no ID.
   */
    @Get(':id')
    getTaskId(@Param('id') id: number): Promise<Task | null> {
        return this.taskService.getTaskId(Number(id))
    };
    /**
     * @Post /
     * @Body {title,description}
    * Cria uma nova tarefa. precisa dos parametros
    */
    @ApiBody({ type: Task })
    @Post()
    createTask(@Body('title') title: string, @Body('description') description: string): Promise<Task> {
        return this.taskService.createTask(title, description);
    }
    /**
   * @Put /:id
   * @param id ID da tarefa.
   * @Body {Task}
   * @description Atualiza uma tarefa existente com base no ID.
   */
    @Put(':id')
    updateTask(@Param('id') id: number, @Body() data: Task): Promise<Task> {
        return this.taskService.updateTask(Number(id), data);
    }
    /**
   * @Delete /:id
   * @description Remove uma tarefa com base no ID.
   * @param id ID da tarefa.
   * @response 200 Tarefa removida.
   * @response 404 Tarefa não encontrada.
   */
    @Delete(':id')
    deleteTask(@Param('id') id: number) {
        this.taskService.deleteTask(Number(id));
    }
}
