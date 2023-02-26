import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Task {
    id: number;
    title: string;
    done: boolean;
}

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit{
    constructor(private httpClient: HttpClient) {}
  
    public tasks: Task[] = [];
    public newTask: string = "";

    public ngOnInit(): void {
        this.loadTasks()
    }

    public loadTasks(): void {
        const url = "https://tasks-api.jmscarpa.com.br/tasks"
        this.httpClient.get<Task[]>(url).toPromise().then(data => {
            this.tasks = data;
        })
    }

    public save(): void {
        const url = "https://tasks-api.jmscarpa.com.br/tasks"
        this.httpClient.post(url, {title: this.newTask}).toPromise().then( _ => {
            this.newTask = '';
            this.loadTasks()
        })
    }

    public deleteTask(id: number): void {
        const url = `https://tasks-api.jmscarpa.com.br/tasks/${id}`
        this.httpClient.delete(url).toPromise().then( _ => {
            this.loadTasks();
        })    
    }

    public toggleTask(task: Task): void {
        task.done = !task.done;
        const url = `https://tasks-api.jmscarpa.com.br/tasks/${task.id}`;
        this.httpClient.patch(url, { done: task.done}).toPromise()
    }

}