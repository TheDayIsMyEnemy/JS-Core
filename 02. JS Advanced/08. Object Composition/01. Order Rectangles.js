function solve(rects) {
    let res = [];
    for (let obj of rects) {
        let rect = {
            width: obj[0],
            height: obj[1],
            area:function(){return this.width * this.height},
            compareTo: function (other) {
                let diff = other.area() - this.area();
                return diff || other.width - this.width;
            }
        }
        res.push(rect);
    }
   res.sort((a,b) => a.compareTo(b));
  return res;
}
