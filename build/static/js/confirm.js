// Инициализация переменных

let submit = document.getElementById("btn-subm");
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


// Проверка формы

function checkStatusOfRequest(data) {
    let status = data.status;

    if (status != 200) {
        error.style.display = "block";
        error.style.top = '60px';
        error_text.innerHTML = "При отправке запроса что-то пошло не так";
        setTimeout(()=>error.style.display = "none", 5000)
        return 1;
    }
    return 0;
}

// Форма 

submit.addEventListener("click", (e) => {

    // Запрет на отправку формы 

    $("form").bind("submit", preventDefault);

    // Валидация номера телефона 

    if(!phone.value){
        error.style.display = "block";
        error.style.top = '60px';
        error_text.innerHTML = "Значение не должно быть пустым";
        setTimeout(() => error.style.display = "none", 3000);
    }else if(!phone_regexp.test(phone.value)){
        error.style.display = "block";
        error.style.top = '60px';
        error_text.innerHTML = "Введите правильный номер в указаном формате";
        setTimeout(() => error.style.display = "none", 3000);
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

                let error = checkStatusOfRequest(data);

                if(!error){

                    // Валидаця смс-кода в случае успешной отправки формы

                    conf.style.display = "block";

                    let sms = document.getElementById("conf-val");
                    if(!sms.value){
                        error.style.display = "block";
                        error.style.top = '200px';
                        error_text.innerHTML = "Введите код из смс";
                    }else if(!sms_regexp.test(sms.value)){
                        error.style.display = "block";
                        error.style.top = '200px';
                        error_text.innerHTML = "Введите код в правильном формате";
                        setTimeout(() => error.style.display = "none", 3000);
                    }else{

                        // Отправка формы на сервер

                        $("form").unbind("submit", preventDefault);
                    }
                }
            },
        });
    }
});