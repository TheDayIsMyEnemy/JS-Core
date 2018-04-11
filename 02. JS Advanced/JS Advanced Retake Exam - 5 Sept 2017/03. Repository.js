class Repository{
    constructor(props){
        this.data = new Map();
        this.props = props;

        let id = 0;
        this.nextId = function () {
            return id++;
        }
    }

    add(entity){
        // adds an entity to the data; if successful, returns the resulting ID
        this.validate(entity);
        let id = this.nextId();
        this.data.set(id, entity);
        return id;
    }

    get(id){
        // returns the entity with given ID
        if(!this.data.has(id)){
            throw new Error(`Entity with id: ${id} does not exist!`)
        }
        return this.data.get(id);
    }

    update(id, newEntity){
        // replaces the entity with the given id with the new entity
        if(this.data.has(id)){
            this.validate(newEntity);
            this.data.set(id, newEntity);
        }
        else{
            throw new Error(`Entity with id: ${id} does not exist!`)
        }
    }

    del(id){
        // deletes an entity by given id
        if(!this.data.delete(id)){
            throw new Error(`Entity with id: ${id} does not exist!`)
        }
    }

    get count(){
        // returns the number of stored entities
        return this.data.size;
    }

    validate(entity){
        for (let k in this.props) {
            let type = this.props[k];
            if(entity[k] == undefined){
                throw new Error(`Property ${k} is missing from the entity!"`)
            }
            else{
                let t = typeof(entity[k]);
                if(type != t){
                    throw new TypeError(`Property ${k} is of incorrect type!`)
                }
            }
        }
    }
}

// Initialize props object
let properties = {
    name: "string",
    age: "number",
    birthday: "object"
};
//Initialize the repository
let repository = new Repository(properties);
let entity = {
    name: "Kiril",
    age: 19,
    birthday: new Date(1998, 0, 7)
};
console.log(repository.add(entity));; // Returns 0
console.log(repository.add(entity));// Returns 1