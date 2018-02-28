(function stringExtension() {
    String.prototype.ensureStart = function (str) {
        if(!this.startsWith(str)){
            let result = str +this;
            return result;
        }
        return this;
    }
    String.prototype.ensureEnd = function (str) {
        if(!this.endsWith(str)){
            let result = str +this;
            return result;
        }
        return this;
    }
    String.prototype.isEmpty = function () {
        return this.length == 0;
    }
    String.prototype.truncate = function (n) {
        if(this.length > n){
            let split = this.split(' ');
            if(split.length > 1){
                let newStr = '';
                for (let obj of split) {
                    newStr+=obj;
                    if(newStr.length + 3 > n){
                        newStr+='...';
                        return newStr;
                    }
                    else{
                        newStr+=' '
                    }
                }

            }
            if(n >= 4){
                let newStr = this.slice(0, n-3) + '...';
                return newStr;
            }

            return '.'.repeat(n);

        }
        return this;
    }
    String.format = function (str, ...params) {
        for (let obj of params) {
            str = str.replace(/({\d})/, obj);
        }
        return str;
    }
})();

let str = 'my string'
console.log(str = str.ensureStart('my'));
console.log(str = str.ensureStart('hello '));
console.log(str = str.truncate(16));
console.log(str = str.truncate(14));
console.log(str = str.truncate(8));
console.log(str = str.truncate(4));
console.log(str = str.truncate(2));
console.log(str = String.format('The {0} {1} fox',
    'quick', 'brown'));;
console.log(str = String.format('jumps {0} {1}',
    'dog'));;
