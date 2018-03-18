class Task{
    constructor(title, deadline){
        this.title = title;
        this.deadline = deadline; //date object
        this.status = 'Open';
        this.statusIcons = { Open: '\u2731', 'In Progress':'\u219D ',
            Complete:'\u2714', Overdue:'\u26A0'};
    }

    set deadline(date){
        if(date < Date.now()){
            throw new TypeError('Cannot set a past deadline');
        }
        this._deadline = date;
    }

    get deadline(){
        return this._deadline;
    }

    get isOverdue(){
        if(this.status === 'Complete') {return false;}
        return this._deadline < Date.now();
    }

    static comparator(a, b) {
        if (Task.statusRank === undefined) {
            Object.defineProperty(Task, 'statusRank', {
                value: {
                    'Open': 2,
                    'In Progress': 1,
                    'Complete': 3
                },
                configurable: false,
                enumerable: false,
                writable: false
            });
        }
        let rankA = a.isOverdue ? 0 : Task.statusRank[a.status];
        let rankB = b.isOverdue ? 0 : Task.statusRank[b.status];
        if (rankA - rankB !== 0) {
            return rankA - rankB;
        }
        return a.deadline - b.deadline;
    }

    toString(){
        let res = this.isOverdue ? '(overdue)' : `(deadline: ${this.deadline})`;
        let result = `[${this.statusIcons[this.status]}] ${this.title}`;

        if(this.status != 'Complete'){
            result+=' ' + res;
        }

        return result;
    }
}


let task5 = new Task('Task 5', new Date());


task5.status = "Complete";

console.log(task5 + '');