function solve(obj) {
    let engines = {
        small: { power: 90, volume: 1800 },
        normal: { power: 120, volume: 2400 },
        monster: { power: 200, volume: 3500 }
    }
    let color = obj.color;
    let carriage = obj.carriage;
    let wheels  = obj.wheelsize;
    let power = obj.power;

    delete obj.power;
    delete obj.color;
    delete obj.carriage;
    delete obj.wheelsize;
    let engine = {};
    if(wheels % 2 == 0){
        wheels--;
    }

    if(engines.small.power >= power){
        obj['engine'] = engines.small;
    }
    else if(power > engines.small.power && power <= engines.normal.power){
        obj['engine'] = engines.normal;
    }
    else{obj['engine'] = engines.monster};
    obj['carriage'] = {type:carriage, color:color};
    obj['wheels'] = new Array(4).fill(wheels);
    return obj;
}
