function solve(arr,sortCriteria) {
    var result = [];

    class Ticket{
        constructor(destination, price, status){
            this.destination = destination;
            this.price = Number(price);
            this.status = status;
        }
    }

    for (var i = 0; i < arr.length; i++) {
        var tokens = arr[i].split('|');
        var name = tokens[0];
        var price = Number(tokens[1]);
        var status = tokens[2];
        var ticket = new Ticket(name, price, status);
        result.push(ticket);
    }

    result.sort((a,b) => {
        return a[sortCriteria] > b[sortCriteria];
    })

    return result;
}

console.log(solve(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'destination'));