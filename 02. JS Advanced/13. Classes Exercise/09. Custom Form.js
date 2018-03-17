let result;
result = (function () {
    class Textbox {
        constructor(selector, regex) {
            this._elements = $(selector);
            this.value = '';
            this._invalidSymbols = regex;
            this.attachEvents();
        }

        attachEvents() {
            this._elements.on('input', (event) => {
                let text = $(event.target).val();
                this.value = text;
            })
        }

        get elements() {
            return this._elements;
        }

        get value() {
            return this._value;
        }

        set value(v) {
            this._value = v;
            for (let el of this._elements) {
                $(el).val(v);
            }
        }

        isValid() {
            return !this._invalidSymbols.test(this._value);
        }
    }

    class Form {
        constructor(txtBoxes) {
            this._element = $('<div>').addClass('form');
            this.textboxes = txtBoxes;
        }

        get textBoxes() {
            return this._textBoxes;
        }

        set textboxes(txtBoxes) {
            for (let obj of txtBoxes) {
                if (!obj instanceof Textbox) {
                    throw new TypeError('Object is not an instance of Textbox');
                }
            }

            this._textBoxes = txtBoxes;

            for (let textBox of this._textBoxes) {
                for (let el of textbox._elements) {
                    this._element.append($(el));
                }
            }
        }

        submit() {
            let isValid = true;
            for (let textbox of this._textBoxes) {
                if (textbox.isValid()) {
                    for (let element of textbox._elements) {
                        $(element).css('border', '2px solid green');
                    }
                }
                else {
                    for (let element of textbox._elements) {
                        $(element).css('border', '2px solid red');
                    }
                    isValid = false;
                }
            }

            return isValid;
        }

        attach(selector) {
            $(selector).append(this._element);
        }
    }


    return {
        Textbox: Textbox, Form: Form
    }

}());

let Textbox = result.Textbox;
let Form = result.Form;
let username = new Textbox("#username",/[^a-zA-Z0-9]/);
let password = new Textbox("#password",/[^a-zA-Z]/);
username.value = "username";
password.value = "password2";
let form = new Form(username,password);
form.attach("#root");

