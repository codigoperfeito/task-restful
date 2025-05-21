import Task from "@/types/task";
import axios from "axios";


const baseUrl = "http://localhost:3000/tasks";


export async function getTasks(): Promise<Task[]> {
    try {
        const response = await axios.get(baseUrl)
        return response.data;
    } catch (error) {
        throw new Error(`erro na busca dos task: ${error}`);
    }
}
export async function getTaskId(id: string): Promise<Task> {
    try {
        const response = await axios.get<Task>(`${baseUrl}/${id}`)
        return response.data;
    } catch (error) {
        throw new Error(`erro na busca id: ${error}`);
    }
}
export async function createTask(title:string,description:string): Promise<Task[]> {
    try {
        const response = await axios.post<Task>(baseUrl, {
            title: title,
            description: description,
        })
        const respota = await getTasks()
        return respota;
    } catch (error) {
        throw new Error(`erro na criacacao: ${error}`);
        
    }
}
export async function updateTask(id:string,title:string,description:string,complete:boolean): Promise<Task[]> {
    try {
        const response = await axios.put<Task>(`${baseUrl}/${id}`, {title,description,complete})
        const respota = await getTasks()
        return respota;
    } catch (error) {
        throw new Error(`erro na atualizacao: ${error}`);
    }
}
export async function deleteTask(id: string): Promise<Task[]> {
    try {
        await axios.delete(`${baseUrl}/${id}`)
        const respota = await getTasks()
        return respota;
    } catch (error) {
        throw new Error(`erro na exclusao: ${error}`);
    }
}

