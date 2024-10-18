import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";

// Better way as compared to provider approach(main.ts)
// Operate with same instance on duplicate component 
// @Injectable({
//     providedIn: 'root'
// })
export class TasksService {
    // private tasks = signal<Task[]>([]);
    private tasks: Task[] = [];
    private loggingService = inject(LoggingService);


    get allTasks() {
        // using a getter which returns a copy to make sure that original tasks can't be change
        return [...this.tasks]
    }
    // allTasks = this.tasks.asReadonly();

    addTask(taskData: { title: string, description: string }) {
        const newTask: Task = {
            ...taskData,
            id: Math.random().toString(),
            status: 'OPEN'
        }
        this.tasks = [...this.tasks, newTask];
        // this.tasks.update((oldTasks) => [...oldTasks, newTask])
        this.loggingService.log('ADDED TASK with title' + taskData.title)

    }

    updateTaskStatus(taskId: string, newStatus: TaskStatus) {
        // this.tasks.update((oldTasks) =>
        //     oldTasks.map((task) => task.id === taskId ? { ...task, status: newStatus } : task))
        this.tasks = this.tasks.map((task) => task.id === taskId ? { ...task, status: newStatus } : task);
        this.loggingService.log('CHANGED TASK STATUS' + newStatus)

    }
}