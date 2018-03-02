function solve(arr, startIndex, endIndex){
    if(!Array.isArray(arr)){
        return NaN;
    }
    if(startIndex < 0){
        startIndex = 0;
    }
    if(endIndex > arr.length-1){
        endIndex = arr.length-1;
    }
    let sum = 0;
    if(arr.length > 0){
        for(let a=startIndex;a <= endIndex; a++){
            sum+= Number(arr[a]);
        }
    }
    return sum;
}

console.log(solve([10, 'twenty', 30, 40], 0, 2));