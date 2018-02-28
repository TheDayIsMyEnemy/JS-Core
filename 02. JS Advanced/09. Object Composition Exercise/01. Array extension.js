(function solve() {
    Array.prototype.last = function () {
        return this[this.length - 1];
    }
    Array.prototype.skip = function (n) {
        let arr = [];
        for (let i = n; i < this.length; i++) {
            arr.push(this[i])
        }
        return arr;
    };
    Array.prototype.take = function (n) {
        let result = [];
        for (var i = 0; i < n; i++) {
            result.push(this[i]);
        }
        return result;
    }
    Array.prototype.sum = function () {
        let sum = 0;
        for (let a = 0; a < this.length; a++) {
            sum += this[a];
        }
        return sum;
    }
    Array.prototype.average = function () {
        let sum = 0;
        for (let a = 0; a < this.length; a++) {
            sum += this[a];
        }
        return sum / this.length
    }

})();