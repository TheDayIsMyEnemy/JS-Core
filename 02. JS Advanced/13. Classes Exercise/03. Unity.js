class Rat{
    constructor(name){
        this.name = name;
        this.unitedRats = [];
    }

    unite(otherRat){
        if(otherRat instanceof Rat){
            this.unitedRats.push(otherRat);
        }
    }

    getRats(){
        return this.unitedRats;
    }

    toString(){
        var result = `${this.name}`;
        if(this.unitedRats.length > 0){
            result+=`\n${this.unitedRats.map(v=> '##' + v.name).join('\n')}`;
        }
        return result;
    }
}
