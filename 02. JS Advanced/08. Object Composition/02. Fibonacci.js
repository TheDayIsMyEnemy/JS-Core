function getFibonator() {
    let fib1 = 0;
    let fib2 = 1;
    return function () {
        let f = fib1 + fib2;
        fib1 = fib2;
        fib2 = f;
        return fib1;
    }
}

let fib = getFibonator();

