class Box {
    constructor(id, classType, text) {
        this.id = id;
        this.classType = classType;
        this.text = text;
    }
}

function getBox(id, classType, text) {
    return new Box(id, classType, text);
}





