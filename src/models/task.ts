//a single task model

export class Task{
    public constructor(public date: Date,
        public startTime: string,
        public endTime: string, //endTime - startTime = the amount of time the task takes
        public rowspan: number, // the time it takes as factor of 0:30. for example 1 hour time -> rowspan = 2. 1:30 -> 3...
        public taskLine: number, //to which line it belongs (by id), there can not be 2 tasks belong to the same line that conflict in hours
        public content: string,
        public color: string,
        public owner: string){}
}