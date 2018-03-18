class Contact{
    constructor(firstName, lastName, phone, email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.element = this.createElement();
        this.online = false;
    }

    set online(value){
        this._online = value;
        this.updateStatus();
    }

    get online(){
        return this._online;
    }//

    updateStatus(){
         if(this._online){
            this.element.find('.title').addClass('online');
        }
        else{
            this.element.find('.title').removeClass('online');
        }
    }

    createElement(){
        let contact = $('<article>')
            .append($('<div>').addClass('title')
                .text(`${this.firstName} ${this.lastName}`)
                .append($('<button>').on('click', function () {
                    let div = $(this).parent().parent().find('.info').toggle();
                    //if(div.is(':visible')){
                    //    div.css('display', 'none');
                    //}
                    //else{
                    //    div.css('display', 'block');
                    //}
                }).html('&#8505')))
            .append($('<div>').css('display', 'none').addClass('info')
                .append($('<span>')
                    .html(`&phone; ${this.phone}`))
                .append($('<span>')
                    .html(`&#9993; ${this.email}`)));

        //toggle event and div display-none/block? difference ?explain pls?wtf

        return contact;
    }


    render(id){
        $(`#${id}`).append(this.element);
    }
}

let contacts = [
    new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
    new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg"),
    new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com")
];

contacts.forEach(c => c.render('main'));


setTimeout(() => contacts[2].online = true, 2000);
setTimeout(() => contacts[2].online = false, 3000);
