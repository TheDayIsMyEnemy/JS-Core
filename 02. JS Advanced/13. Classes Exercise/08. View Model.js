class Textbox {
    constructor(selector, regex){
        this._elements = $(selector);
        this.value = '';
        this._invalidSymbols = regex;
        this.attachEvents();
    }

    attachEvents(){
        this._elements.on('input', (event) => {
            let text = $(event.target).val();
            this.value = text;
        })
    }

    get elements(){
        return this._elements;
    }

    get value(){
        return this._value;
    }

    set value(v){
        this._value = v;
        for(let el of this._elements){
            $(el).val(v);
        }
    }

    isValid(){
        return !this._invalidSymbols.test(this._value);
    }
}

let textbox = new Textbox(".textbox",/[^a-zA-Z0-9]/);
