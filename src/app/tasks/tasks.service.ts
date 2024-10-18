import { Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";

// Better way as compared to provider approach(main.ts)
// Operate with same instance on duplicate component 
@Injectable({
    providedIn: 'root'
})
export class TasksService {
    private tasks = signal<Task[]>([]);

    allTasks = this.tasks.asReadonly();

    addTask(taskData: { title: string, description: string }) {
        const newTask: Task = {
            ...taskData,
            id: Math.random().toString(),
            status: 'OPEN'
        }
        this.tasks.update((oldTasks) => [...oldTasks, newTask])

    }

    updateTaskStatus(taskId: string, taskStatus: TaskStatus) {
        this.tasks.update((oldTasks) =>
            oldTasks.map((task) => task.id === taskId ? { ...task, status: taskStatus } : task))
    }
}