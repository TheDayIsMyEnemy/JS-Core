function validate() {
    var userReg= /^[A-Za-z0-9]{3,20}$/;
    var passReg  = /^\w{5,15}$/;
    var emailReg= /^[^@]+@.*\..*$/;

   var username = $('#username');
   var email = $('#email');
   var pass = $('#password');
   var confPass = $('#confirm-password');
   var company = $('#company');
    var btn = $('#submit');
    var checkbox = $('#company');

    checkbox.on('change', function () {
        if(checkbox.is(':checked')){
            $('#companyInfo').css('display', 'block');
        }
        else{
            $('#companyInfo').css('display', 'none');
        }
    });

   btn.on('click', function (ev) {
       ev.preventDefault();
       var valid = true;
       if(!username.val().match(userReg)){
            username.css('border-color', 'red');
            valid = false;
       }
       else{username.css('border-color', 'none');}
       if(!email.val().match(emailReg)){
           email.css('border-color', 'red');
           valid =false;
       }
       else{email.css('border-color', 'none');}
       if(!pass.val().match(passReg)){
           pass.css('border-color', 'red');
           valid =false;
       }
       else{pass.css('border-color', 'none');}
       if(!confPass.val().match(passReg) || confPass.val() != pass.val()){
           confPass.css('border-color', 'red');
           pass.css('border-color', 'red');
           valid =false;
       }
       else{confPass.css('border-color', 'none')}
       if(checkbox.is(':checked')){
           var companyNumber = Number($('#companyNumber').val());
           if(companyNumber < 1000 || companyNumber > 9999){
               $('#companyNumber').css('border-color', 'red');
               valid =false;
           }
           else{
               $('#companyNumber').css('border-color', 'none');
           }
       }

       if(valid){
           $('#valid').css('display', 'block');
       }
       else{
           $('#valid').css('display', 'none');
       }
    });
}
