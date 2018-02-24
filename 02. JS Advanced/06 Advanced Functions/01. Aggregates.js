function solve(arr) {
    console.log(`Sum = ${reduce(arr, (a, b) => a + b)}`);
    console.log(`Min = ${reduce(arr, (a, b) => Math.min(a, b))}`);
    console.log(`Max = ${reduce(arr, (a, b) => Math.max(a, b))}`);
    console.log(`Product = ${reduce(arr, (a, b) => a * b)}`);
    console.log(`Join = ${reduce(arr, (a, b) => a.toString() + b)}`);

    function reduce(arr, func) {
        let result = arr[0];
        for (var i = 1; i < arr.slice(1).length; i++) {
            result = func(result, arr[i]);
        }
        return result;
    }
}



