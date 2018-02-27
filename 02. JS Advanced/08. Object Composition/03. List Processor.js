function solve(arr) {
    let processor = (function () {
        let items = [];
        return {
            add: function (item) {
                items.push(item);
            },
            remove: function (item) {
                items = items.filter(a=> a != item);
            },
            print: function () {
                console.log(items.join(','));
            }
        }
    })();
    for (let obj of arr) {
        let cmd =obj.split(' ');
        processor[cmd[0]](cmd[1]);
    }
}

solve(['add pesho', 'add gosho', 'add pesho', 'remove pesho','print'])
