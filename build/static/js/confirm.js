// Инициализация переменных

let submit = document.getElementById("btn-subm");
let submit_second = document.getElementById("btn-subm_second");
let phone = document.getElementById("phone");
let error = document.getElementById("error");
let error_text = document.getElementById("error_text");
let form = document.getElementById("form");
let conf = document.getElementById("conf");
let hidden_form = document.getElementById("#hidden_form");

// Регулярные выражения

const phone_regexp = /^\d{10}$/;
const sms_regexp = /^\d{4}$/;

// Запрет ввода буков в поле

function inputNumbersOnly(event){
    this.value = this.value.replace(/[^0-9\.]/ig, '');
}

phone.addEventListener('input', inputNumbersOnly);
phone.addEventListener('paste', inputNumbersOnly);

// Сбросить дефолтные обработчики 

function preventDefault(e) {
    e.preventDefault();
}

function changeButtons(){
    submit.style.display = "none";
    submit_second.style.display = "block";
}


// Проверка формы

function checkStatusOfRequest(data) {
    let status = data.status;
    let message = data.responseJSON.message;
    if (status != 200) {
        error.style.display = "block";
        error.style.top = '60px';
        error_text.innerHTML = message;
        setTimeout(function(){error.style.display = "none";}, 5000);
        return 1;   
    }
    return 0;
}

function submitForm(){

    $("form").bind("submit", preventDefault);

    if(!phone.value){
        if(window.innerWidth >= 650){
            error.style.display = "block";
            error.style.top = '60px';
            error_text.innerHTML = "Значение не должно быть пустым";
        }else{
            error.style.display = "block";
            error.style.top = '10px';
            error.style.right = '50%';
            error.style.marginRight = '-75px';
            error_text.innerHTML = "Значение не должно быть пустым";
        }
        setTimeout(function(){error.style.display = "none";}, 2000);
    }else if(!phone_regexp.test(phone.value)){
        if(window.innerWidth >= 650){
            error.style.display = "block";
            error.style.top = '60px';
            error_text.innerHTML = "Введите номер в указаном формате";
        }else{
            error.style.display = "block";
            error.style.top = '10px';
            error.style.right = '50%';
            error.style.marginRight = '-75px';
            error_text.innerHTML = "Введите номер в указаном формате";
        }
        setTimeout(function(){error.style.display = "none";}, 2000);
    }else{ // Успешный ввод номера телефона

        // Запись номера в скрытое поле 

        let hidden_phone = document.getElementById("hidden_phone");
        hidden_phone.value = phone.value;
        let saveForm = document.forms.hidden_form;
        let formData = new FormData(saveForm);
        let action = saveForm.getAttribute('action');

        // Отправка скрытой формы

        $.ajax({
            type: "POST",
            url: action,
            data: formData,
            dataType: 'json',
            processData: false,
            async: false,
            contentType: false,
            complete: function (data) {

                // Проверка отправилась ли форма

                let request_error = checkStatusOfRequest(data);

                if(!request_error){
                    submit.removeEventListener("click", submitForm);
                    changeButtons();
                    conf.style.display = "block";
                }
            },
        });
    }
};

// Форма 

submit.addEventListener("click", submitForm);

// $("form").unbind("submit", preventDefault);

submit_second.addEventListener("click", function(){
    let sms = document.getElementById("conf-val");
    if(!sms.value){
        if(window.innerWidth >= 650){
            error.style.display = "block";
            error.style.top = '200px';
            error_text.innerHTML = "Введите код из смс";
        }else{
            error.style.display = "block";
            error.style.top = '10px';
            error.style.right = '50%';
            error.style.marginRight = '-75px';
            error_text.innerHTML = "Введите код из смс";
        }
    }else if(!sms_regexp.test(sms.value)){
        if(window.innerWidth >= 650){
            error.style.display = "block";
            error.style.top = '200px';
            error_text.innerHTML = "Введите код в правильном формате";
        }else{
            error.style.display = "block";
            error.style.top = '10px';
            error.style.right = '50%';
            error.style.marginRight = '-75px';
            error_text.innerHTML = "Введите код в правильном формате";
        }
        setTimeout(function(){error.style.display = "none";}, 2000);
    }else{
        $("form").unbind("submit", preventDefault);
    }
});