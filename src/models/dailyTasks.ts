import { TaskLine } from "./taskLine";

export class DailyTasks{
    public constructor(public date?: Date,
        public taskLines?: TaskLine[],
        public primaryTablesNumber?: number,
        public secondaryTablesNumber?: number,
        public secretNumber?: number){}
}