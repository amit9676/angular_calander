import { Task } from "./task";

//task line - a chain of tasks belong to the same category (א,ב,ג,ד)
//all tasks in the line must not conflict in hours.
//type = שולחן ראשי, שולחן משני, סודי
export class TaskLine{
    public constructor(public id: number,
        public name: string,
        public date: Date,
        public type: string,
        public color: string,
        public tasks: Task[]){}
}