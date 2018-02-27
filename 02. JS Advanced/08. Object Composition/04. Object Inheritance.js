function solve(input) {
    let cmdProcessor = (function () {
        let cars = [];
      return {
          create: function (name) {
              cars.push({name:name[1]});
          },
          inherit: function (name, parent) {
              let p = cars.find(a=> a.name == parent);
              let car = Object.create(p);
              car.name = name;
              cars.push(car);
          },
          set: function (args) {
              let p = cars.find(a=> a.name == args[1]);
              p[args[2]] = args[3];
          },
          print : function (args) {
              let p = cars.find(a=> a.name == args[1]);
              let res = [];
              for (let k in p) {
                  if(k != 'name'){
                      res.push(k + ':' + p[k]);
                  }
              }
              console.log(res.join(', '));
          }
      }
    })();

    for (let c of input) {
        let cmd = c.split(' ');
        if(cmd[0] == 'create' && cmd.length > 2){
            cmdProcessor[cmd[2]](cmd[1], cmd[3]);
        }
        else{
            cmdProcessor[cmd[0]](cmd);
        }

    }
}

solve(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2'])

