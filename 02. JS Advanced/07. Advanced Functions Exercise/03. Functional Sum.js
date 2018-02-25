let increase = (function() {
    let sum = 0;
    function add(number) {
        sum += number;
        return add;
    }
    add.toString = () => sum;
    return add;
})();

console.log(increase(5)(20)(24)(42).toString());
