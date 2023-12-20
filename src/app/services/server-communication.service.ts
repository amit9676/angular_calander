import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { url1 } from 'src/environments/environment';
import { Time } from 'src/models/time';
import { Task } from 'src/models/task';
import { TaskLine } from 'src/models/taskLine';

@Injectable({
  providedIn: 'root'
})
export class ServerCommunicationService {

  constructor(private httpClient: HttpClient) { }

  public getAllTimes():Observable<Time[]>{

    //const url = "http://localhost:51507/api/votes";
    const url = "/assets/hours.json"
    return this.httpClient.get<Time[]>(url);
  }

  public getAllTasks():Observable<Task[]>{
    const url = "/assets/tasks.json"
    return this.httpClient.get<Task[]>(url);
  }

  public getAllTaskLines():Observable<TaskLine[]>{
    const url = "/assets/taskLines.json"
    return this.httpClient.get<TaskLine[]>(url);
  }



}
