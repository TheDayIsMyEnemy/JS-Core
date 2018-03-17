class SortedList{
    constructor(){
        this.collection = [];
        this.size = 0;
    }

    add(element){
        this.size++;
        this.collection.push(element);
        this.orderBy();
    }

    remove(index){
        if(index >= 0 && index < this.size){
            this.collection.splice(index,1);
            this.size--;
        }
        this.orderBy();
    }

    get(index){
        if(index >= 0 && index < this.size){
            return this.collection[index];
        }
    }

    orderBy() {
        this.collection.sort((a,b)=> a-b);
    }
}