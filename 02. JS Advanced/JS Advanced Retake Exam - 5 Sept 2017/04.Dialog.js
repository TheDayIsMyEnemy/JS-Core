class Dialog{
    constructor(message, callback){
        this.message = message;
        this.callback = callback;
        this.element = this.createElement();
    }

    addInput(label, name, type){
        let okBtn = this.element.find('button')[0];
        let l = $(`<label>${label}</label>`);
        let i = $(`<input name="${name}" type="${type}">`);
        $(okBtn).before($(l));
        $(okBtn).before($(i));
    }

    render(){
        this.element.appendTo('body');
    }

    createElement(){
        let that = this;
        let div = $('<div>').addClass('overlay');
        let div2 = $('<div>').addClass('dialog');
        let p = $(`<p>${this.message}</p>`)
        let okBtn = $('<button>OK</button>');
        let cancelBtn = $('<button>Cancel</button>');
        cancelBtn.on('click', function () {
           div.remove();
        });
        okBtn.on('click', function () {
            let obj = {};
            let input = that.element.find('input');

            if(input.length > 0){
                for (let inp of input) {
                    let value = $(inp).val();
                    let attr = $(inp).attr('name');
                    obj[attr] = value;
                }
            }
            that.callback(obj);
            div.remove();
        });
        div2.append(p);
        div2.append(okBtn);
        div2.append(cancelBtn);
        div.append(div2);
        return div;
    }
}