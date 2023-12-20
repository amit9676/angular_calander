//represents a timestamp, intervals of half an hours (can be x:00 or x:30 only)

import { Task } from "./task";

export class Time{
    public constructor(public time: string,
        public hour: number,
        public minutes: number,
        public amountOfTasksInIt: number,
        public listOfTasksThatBeginOnThisTime: Task[]){}
}