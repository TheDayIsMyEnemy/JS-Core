let solution = (function() {
    let stock = {
        protein : 0,
        carbohydrate : 0,
        fat : 0,
        flavour : 0
    }
    let recipies = {
        apple: {carb:1, flavour:2},
        coke: {carb:10, flavour:20},
        burger: {carb:5, fat:7, flavour:3},
        omelet: {protein:5,fat:1, flavour:1},
        cheverme: {protein:10,carb:10, fat:0, flavour:10}
    }

    let options = {
        restock: function (microelement, quantity) {
            stock[microelement]+=Number(quantity)
            return 'Success';
        },
        prepare: function (recipe, quantity) {
            let ingr = recipies[recipe];
            for (var i = 0; i < Number(quantity); i++) {
                for (let obj in ingr) {
                    if(stock[obj] >= ingr[obj]){
                        stock[obj]-= ingr[obj];
                    }
                    else{
                        return `Error: not enough ${obj} in stock`
                    }
                }
            }
            return 'Success';
        },
        report: function () {
            return `protein=${stock.protein} carbohydrate=${stock.carbohydrate} fat=${stock.fat} flavour=${stock.flavour}`;
        }
    }

    return function (cmd) {
        let args = cmd.split(' ');
        return options[args[0]](args[1], args[2]);
    }
})();

console.log(solution('restock flavour 50'));
console.log(solution('prepare coke 4'));
