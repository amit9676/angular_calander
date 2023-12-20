import { Component, OnInit, HostListener } from '@angular/core';
import { ServerCommunicationService } from 'src/app/services/server-communication.service';
import { DailyTasks } from 'src/models/dailyTasks';
import { Task } from 'src/models/task';
import { TaskLine } from 'src/models/taskLine';
import { Time } from 'src/models/time';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public hours: Time[] = [];
  public currentDate: Date = new Date(Date.now());
  public allTasks: Task[] = [];
  public taskLines: TaskLine[] = [];
  public dailyTasks: Task[] = [];
  public dailyTasksHeader: DailyTasks;


  constructor(private serverCommunication: ServerCommunicationService) { }

  ngOnInit() {
    this.serverCommunication.getAllTimes().subscribe(items => {this.hours=items}, () => {alert("חלה בעיה בטעינת הדף, נא רענן את העמוד או בדוק את החיבור.");});
    this.serverCommunication.getAllTaskLines().subscribe(items => {this.taskLines=items}, () => {alert("חלה בעיה בטעינת הדף, נא רענן את העמוד או בדוק את החיבור.");});
    this.serverCommunication.getAllTasks().subscribe(items => {this.allTasks=items;
      this.extractDailyTasksFromAllTasks(this.currentDate);
      this.loadHoursWithDailyTasks();}, () => {alert("חלה בעיה בטעינת הדף, נא רענן את העמוד או בדוק את החיבור.");});
    
  }

  private getLineById(id: number): TaskLine{
    for (let l of this.taskLines){
      if (id === l.id){
        return l;
      }
    }
    return undefined
  }

  public range(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index);
  }

  public loadHoursWithDailyTasks(){
    for(let hour of this.hours){
      hour.listOfTasksThatBeginOnThisTime = this.dailyTasks.filter(t => t.startTime == hour.time);
      hour.amountOfTasksInIt = hour.listOfTasksThatBeginOnThisTime.length;
      console.log(hour.time + ", " + hour.amountOfTasksInIt);
    }
    //this.hours[0].listOfTasksThatBeginOnThisTime = this.dailyTasks.filter(t => t.startTime == this.hours[0].time)
    
  }

  public extractDailyTasksFromAllTasks(targetDate: Date): void {
    this.dailyTasks = this.allTasks.filter(t => this.isSameDate(t.date, targetDate));
    this.dailyTasksHeader = new DailyTasks();
    this.dailyTasksHeader.primaryTablesNumber=0;
    this.dailyTasksHeader.secondaryTablesNumber=0;
    this.dailyTasksHeader.secretNumber=0;
    for(let t of this.dailyTasks){
      t.color = this.getLineById(t.taskLine).color
      if(this.getLineById(t.taskLine).type === "שולחן ראשי"){
        this.dailyTasksHeader.primaryTablesNumber++;
      }
      else if(this.getLineById(t.taskLine).type === "שולחן משני"){
        this.dailyTasksHeader.secondaryTablesNumber++;
      }
      else if(this.getLineById(t.taskLine).type === "סודי"){
        this.dailyTasksHeader.secretNumber++;
      }
    }
    this.loadHoursWithDailyTasks();
    //console.log(this.dailyTasks)
  }
  
  private isSameDate(date1: Date, date2: Date): boolean {
    // Compare the date parts of two Date objects
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    return d1.toDateString() === d2.toDateString();
  }

  public moveDate(action: string): void {
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    if (action == "next") {
        // Move this.currentDate one day forward

        this.currentDate = new Date(this.currentDate.getTime() + oneDay);
    } else {
        // Move this.currentDate one day backward
        this.currentDate = new Date(this.currentDate.getTime() - oneDay);
    }
    this.extractDailyTasksFromAllTasks(this.currentDate);
  }
  
}
