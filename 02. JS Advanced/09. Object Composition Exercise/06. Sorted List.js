function sortedList() {
    let obj = {
        size: 0,
        collection: [],
        add: function (element) {
            this.size++;
            this.collection.push(element);
            this.orderBy();
        },
        remove: function (index) {
            if(index >= 0 && index < this.size){
                this.collection.splice(index,1);
                this.size--;
            }
            this.orderBy();
        },
        get: function (index) {
            if(index >= 0 && index < this.size){
                return this.collection[index];
            }
        },
        orderBy: function () {
            this.collection.sort((a,b)=> a-b);
        }
    }
    return obj;
}

let myObj = sortedList();

myObj.add(5)
myObj.add(1);
console.log(myObj.get(0));
