let solution = (function () {
    let counter = 0;
        return class Extensible{
            constructor(){
                this.id = counter;
                counter++;
            }
            extend(template){
                for (let k in template) {
                    if(typeof(template[k]) === 'function')
                    {
                        Extensible.prototype[k] = template[k];
                    }
                    else{
                        this[k] = template[k];
                    }
                }
            }
        }
})();

let Extensible = solution;
let template = {
    name: 'myTemplate',
    myFunc: function () {
        console.log('justTest');
    }
}
let obj = new Extensible();
//console.log(obj);
obj.extend(template);
for (let k in obj) {
    console.log(k + ' ' + obj[k]);
}


