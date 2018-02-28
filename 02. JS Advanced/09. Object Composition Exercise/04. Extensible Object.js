function solve() {
    let template = {
        name: 'myTemplate',
        myFunc: function () {
            console.log('justTest');
        }
    }

    let myObj = {
        extend: function (template) {
            for (let k in template) {
                if(typeof(template[k]) === 'function')
                {
                    Object.prototype[k] = template[k];
                    //Object.getPrototypeOf(myObj)[k]=template[k];
                }
                else{
                    myObj[k] = template[k];
                }//
            }
        }
    }

    myObj.extend(template);

    //console.log(Object.prototype);
   //for (let k in myObj) {
   //    console.log(k + ' ' + myObj[k]);
   //}

    return myObj;
}

solve();