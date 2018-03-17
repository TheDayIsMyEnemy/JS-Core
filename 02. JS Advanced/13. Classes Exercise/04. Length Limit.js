class Stringer{
    constructor(str, length){
        this.innerString= str;
        this.innerLength = length;
    }

    increase(length){
        this.innerLength+=length;
    }

    decrease(length){
        this.innerLength-=length;
        if(this.innerLength < 0){
            this.innerLength = 0;
        }
    }

    toString(){
        if(this.innerLength == 0){
            return '...';
        }
        if(this.innerString.length > this.innerLength){
            this.innerString = this.innerString.slice(0, this.innerLength) + '...';
        }

        return this.innerString;
    }
}