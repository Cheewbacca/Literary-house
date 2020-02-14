let submit = document.getElementById("btn-subm");
let name = document.getElementById("name");
let phone = document.getElementById("phone");
let error = document.getElementById("error");
let error_text = document.getElementById("error_text");
let form = document.getElementById("form");
let conf = document.getElementById("conf");


const name_regexp = new RegExp("[A-Za-zА-Яа-яЁё]{2,}");
// const phone_regexp = /(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?/;
const phone_regexp = /[0-9]{10}/;
const sms_regexp = /^\d{4}$/;

submit.addEventListener("click", (e) => {
    e.preventDefault();
    if(!name.value){
        error.style.display = "block";
        error.style.top = '50px';
        error_text.innerHTML = "Значение не должно быть пустым";
        setTimeout(() => error.style.display = "none", 3000);
    }else if(!name_regexp.test(name.value)){
        error.style.display = "block";
        error.style.top = '50px';
        error_text.innerHTML = "Имя должно состоять только из буков и не менее 2х";
        setTimeout(() => error.style.display = "none", 3000);
    }else if(!phone.value){
        error.style.display = "block";
        error.style.top = '135px';
        error_text.innerHTML = "Значение не должно быть пустым";
        setTimeout(() => error.style.display = "none", 3000);
    }else if(!phone_regexp.test(phone.value)){
        error.style.display = "block";
        error.style.top = '135px';
        error_text.innerHTML = "Введите правильный номер";
        setTimeout(() => error.style.display = "none", 3000);
    }else{
        conf.style.display = "block";
        let sms = document.getElementById("conf-val");
        if(!sms.value){
            error.style.display = "block";
            error.style.top = '265px';
            error_text.innerHTML = "Введите код из смс";
        }else if(!sms_regexp.test(sms.value)){
            error.style.display = "block";
            error.style.top = '265px';
            error_text.innerHTML = "Введите код в правильном формате";
            setTimeout(() => error.style.display = "none", 3000);
        }else{
            form.submit();
        }
    }
});