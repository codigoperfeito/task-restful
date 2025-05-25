import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/tasks.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService){};
    async getTasks() : Promise<Task[]> {
        return await this.prisma.task.findMany();
    }
    async getTaskId(id:number) : Promise<Task | null> {
        const task = await this.prisma.task.findUnique({
            where : {
                id : id,
            }
        })
        if(!task) throw new NotFoundException("erro id nao encontrado");
        return task;
    }
    async createTask(title:string,description:string,complete:boolean = false) : Promise<Task> {
            return await this.prisma.task.create({
            data: {
                title : title,
                description : description,
                complete : complete
            }
        })
    }
    async updateTask(id:number,task:Task):Promise<Task>{
        const idTask = await this.prisma.task.findUnique({where:{id:id}})
        if(!idTask) throw new NotFoundException("nao foi possivel atualizar id nao encontrado");
        return await this.prisma.task.update({
            where : {
                id : id,
            },
            data : {
                    title : task.title,
                    description:task.description,
                    complete: task.complete
            }
        });
    }
    async deleteTask(id:number): Promise<void>{
        const task = await this.prisma.task.findUnique({where:{id:id}});
        if(!task) throw new NotFoundException("nao foi possivel deletar id nao encontrado")
        await this.prisma.task.delete({
            where : {
                id:id
            }
        })
    }
}
