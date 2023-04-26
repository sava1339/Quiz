import './index.html';
import './style.css';

let page = 1;
let mail = "";
let tel = "";
let userName = "";
const values = {
    person:-1,
    city:-1,
    education:-1,
    place:-1,
    FEducation:-1,
    price: -1,
    specialty:-1,
    date:-1
}
const dateList = [
    "Как можно мыстрее",
    "Месяц",
    "Квартал",
    "Полгода",
    "Год"
]
const specialtyList = [
    "Экономика",
    "Философия",
    "Социология",
    "Юриспруденция",
    "Менеджмент"
]
const questionList = [
    "Для кого вы ищете учебное заведение?",
    "В каком городе планируете поступать?",
    "Какое образование уже есть?",
    "Куда планируете поступать?",
    "Какую форму обучения предпочитаете?",
    "Рассматриваете платное обучение?",
    "Какая специальность интересует?",
    "Как скоро планируете поступать?",
    "Ваша подборка готова! 🥳 Куда нам отправить её?"
]
const priceList = [
    "Нет, только бюджет",
    "Да, планирую учиться платно",
    "Возможны оба варианта"
]
const personList = [
    "Себе",
    "Супругу/супруге",
    "Родственнику",
    "Коллеге",
    "Ребенку",
    "Другое"
]
const educationList = [
    "9 классов",
    "Колледж/техникум",
    "11 классов",
    "Училище",
    "Неоконченное высшее"
]
const FEducationList = [
    "Очную",
    "Заочную",
    "Дистанционную"
]
const placeList = [
    "Вуз",
    "Колледж/техникум",
    "Училище"
]
const cityList = [
    "Санкт-Питербург",
    "Москва",
    "Новосибирск",
    "Нижний новгород",
    "Ростов-на-Дону"
]
const form = document.querySelector("form")
const next_button = document.querySelector(".button-next")
const cancel_button = document.querySelector(".button-cancel")
const form_buttons = document.querySelector(".form-bottom-buttons")
const question = document.querySelector(".question")
const step = document.querySelector(".step")
let radio_buttons;
const checkHaveValue = (value,array)=>{
    if(value>-1){
        array.forEach(el=>{
            if(el.querySelector("input").value==value){
                el.querySelector("input").checked = true;
                el.querySelector("input").parentNode.style.border = "1px solid black";
                el.querySelector("input").parentNode.style.background = "white";
                next_button.classList.add("active")
            }
        })
    }
}
form.addEventListener("click",(event)=>{
    if(event.target.tagName=="INPUT"){
        if(page!=2 && page!=7 && page!=9){
            radio_buttons = document.querySelectorAll(".radio-button")
            radio_buttons.forEach(el=>{
                el.style.border = " 1px solid #F5F5F5"
                el.style.background = "#F5F5F5"
            })
            event.target.parentNode.style.border = "1px solid black";
            event.target.parentNode.style.background = "white";
            next_button.classList.add("active")
            values[event.target.name] = event.target.value
        }
    }
})
const redrawPage = ()=>{
    next_button.classList.remove("active")
    if(page>1 && page!= 9){
        cancel_button.style.display = "block"
        form_buttons.style.justifyContent = "space-between"
        next_button.style.width = "auto"
    }else if(page==9){
        cancel_button.style.display = "none"
        form_buttons.style.justifyContent = "center"
        next_button.style.width = "100%"
    }else{
        cancel_button.style.display = "none"
        form_buttons.style.justifyContent = "end"
        next_button.style.width = "auto"
    }
    question.textContent = questionList[page-1]
    step.textContent = `Шаг ${page}/9`
    if(page===1){
        form.innerHTML = ""
        for(let i=0;i<personList.length;i++){
            form.insertAdjacentHTML('beforeend',`
            <div  class="radio-button">
                <input id="${i}" type="radio" value="${i}" name="person">
                <label for="${i}">${personList[i]}</label>
            </div>
            `)
        }
        const radio_buttons = document.querySelectorAll(".radio-button")
        checkHaveValue(values["person"],radio_buttons)
    }
    if(page===2){
        form.innerHTML = `
            <div class="city">
            <div class="city-text">
            <p class="city-top-text">Город</p>
            <p class="city-bottom-text"></p>
            </div>
            <div class="select">
            <div class="top-select"></div>
            <div class="bottom-select"></div>
            </div>
            </div>
        `
        const city_text = document.querySelector(".city-text")
        const select = document.querySelector(".select")
        const top_select = document.querySelector(".top-select")
        const bottom_select = document.querySelector(".bottom-select")
        const city_bottom_text = document.querySelector(".city-bottom-text")
        const redrawCitySelect = (cityId) =>{
            city_bottom_text.textContent = cityList[cityId]
            bottom_select.innerHTML = ""
            top_select.innerHTML = `<div><input type="radio" name="city" checked id="${cityId}"><label for="${cityId}" >${cityList[cityId]}</label></div>`
            for(let i = 0;i<cityList.length;i++){
                if(i != cityId){
                    bottom_select.insertAdjacentHTML('beforeend',`
            <div><input type="radio" name="city" id="${i}"><label for="${i}" >${cityList[i]}</label></div>
            `)
                }
            }
        }
        if(values["city"]>-1){
            next_button.classList.add("active")
            redrawCitySelect(values["city"])
        }else{
            for(let i = 0;i<cityList.length;i++){
                bottom_select.insertAdjacentHTML('beforeend',`
            <div><input type="radio" name="city" id="${i}"><label for="${i}" >${cityList[i]}</label></div>
            `)
            }
        }
        bottom_select.addEventListener('click',(event)=>{
            if(event.target.tagName=="INPUT"){
                redrawCitySelect(event.target.id)
                values["city"] = event.target.id
                next_button.classList.add("active")
            }
        })
        top_select.addEventListener("click",(event)=>{
            if(event.target.tagName=="INPUT"){
                redrawCitySelect(-1)
                top_select.innerHTML = ""
                values["city"] = -1
                next_button.classList.remove("active")
            }
        })
        city_text.addEventListener("click",()=>{
            select.classList.toggle("active")
        })
    }
    if(page===3){
        form.innerHTML = ""
        for(let i=0;i<educationList.length;i++){
            form.insertAdjacentHTML('beforeend',`
            <div  class="radio-button">
                <input id="${i}" type="radio" value="${i}" name="education">
                <label for="${i}">${educationList[i]}</label>
            </div>
            `)
        }
        const radio_buttons = document.querySelectorAll(".radio-button")
        checkHaveValue(values["education"],radio_buttons)
    }
    if(page===4){
        form.innerHTML = ""
        for(let i=0;i<placeList.length;i++){
            form.insertAdjacentHTML('beforeend',`
            <div  class="radio-button">
                <input id="${i}" type="radio" value="${i}" name="place">
                <label for="${i}">${placeList[i]}</label>
            </div>
            `)
        }
        const radio_buttons = document.querySelectorAll(".radio-button")
        checkHaveValue(values["place"],radio_buttons)
    }
    if(page===5){
        form.innerHTML = ""
        for(let i=0;i<FEducationList.length;i++){
            form.insertAdjacentHTML('beforeend',`
            <div  class="radio-button">
                <input id="${i}" type="radio" value="${i}" name="FEducation">
                <label for="${i}">${FEducationList[i]}</label>
            </div>
            `)
        }
        const radio_buttons = document.querySelectorAll(".radio-button")
        checkHaveValue(values["FEducation"],radio_buttons)
    }
    if(page===6){
        form.innerHTML = ""
        for(let i=0;i<priceList.length;i++){
            form.insertAdjacentHTML('beforeend',`
            <div  class="radio-button">
                <input id="${i}" type="radio" value="${i}" name="price">
                <label for="${i}">${priceList[i]}</label>
            </div>
            `)
        }
        const radio_buttons = document.querySelectorAll(".radio-button")
        checkHaveValue(values["price"],radio_buttons)
    }
    if(page===7){
        form.innerHTML = `
            <div class="city">
            <div class="city-text">
            <p class="city-top-text">Специальность</p>
            <p class="city-bottom-text"></p>
            </div>
            <div class="select">
            <div class="top-select"></div>
            <div class="bottom-select"></div>
            </div>
            </div>
        `
        const city_text = document.querySelector(".city-text")
        const select = document.querySelector(".select")
        const top_select = document.querySelector(".top-select")
        const bottom_select = document.querySelector(".bottom-select")
        const city_bottom_text = document.querySelector(".city-bottom-text")
        const redrawCitySelect = (cityId) =>{
            city_bottom_text.textContent = specialtyList[cityId]
            bottom_select.innerHTML = ""
            top_select.innerHTML = `<div><input type="radio" name="specialty" checked id="${cityId}"><label for="${cityId}" >${specialtyList[cityId]}</label></div>`
            for(let i = 0;i<cityList.length;i++){
                if(i != cityId){
                    bottom_select.insertAdjacentHTML('beforeend',`
            <div><input type="radio" name="city" id="${i}"><label for="${i}" >${specialtyList[i]}</label></div>
            `)
                }
            }
        }
        if(values["specialty"]>-1){
            next_button.classList.add("active")
            redrawCitySelect(values["specialty"])
        }else{
            for(let i = 0;i<specialtyList.length;i++){
                bottom_select.insertAdjacentHTML('beforeend',`
            <div><input type="radio" name="specialty" id="${i}"><label for="${i}" >${specialtyList[i]}</label></div>
            `)
            }
        }
        bottom_select.addEventListener('click',(event)=>{
            if(event.target.tagName=="INPUT"){
                redrawCitySelect(event.target.id)
                values["specialty"] = event.target.id
                next_button.classList.add("active")
            }
        })
        top_select.addEventListener("click",(event)=>{
            if(event.target.tagName=="INPUT"){
                redrawCitySelect(-1)
                top_select.innerHTML = ""
                values["specialty"] = -1
                next_button.classList.remove("active")
            }
        })
        city_text.addEventListener("click",()=>{
            select.classList.toggle("active")
        })
    }
    if(page===8){
        form.innerHTML = ""
        for(let i=0;i<dateList.length;i++){
            form.insertAdjacentHTML('beforeend',`
            <div  class="radio-button">
                <input id="${i}" type="radio" value="${i}" name="date">
                <label for="${i}">${dateList[i]}</label>
            </div>
            `)
        }
        const radio_buttons = document.querySelectorAll(".radio-button")
        checkHaveValue(values["date"],radio_buttons)
    }
    if(page===9){
        form.innerHTML = `
        <input type="text" id="mail" placeholder="Почта" class="inputData">
        <input type="text" id="tel" placeholder="Телефон" class="inputData">
        <input type="text" id="userName" placeholder="Имя Фамилия" class="inputData">
        `
        const inpMail = document.querySelector("#mail")
        const inpTel = document.querySelector("#tel")
        const inpUserName = document.querySelector("#userName")
        inpMail.value = mail;
        inpTel.value = tel;
        inpUserName.value = userName;
        const checkForms = ()=>{
            if(mail != "" && tel != "" && userName != ""){
                next_button.classList.add("active")
            }else{
                next_button.classList.remove("active")
            }
        }
        inpMail.addEventListener('input',(event)=>{
            mail = event.target.value
            checkForms()
        })
        inpTel.addEventListener('input',(event)=>{
            tel = event.target.value
            checkForms()
        })
        inpUserName.addEventListener('input',(event)=>{
            userName = event.target.value
            checkForms()
        })
    }
}
next_button.addEventListener("click",()=>{
    if(next_button.classList.contains("active")){
        if(page!=9){
            page += 1;
            redrawPage()
        }else{
            alert(`Мы успешно отправили подборку на вашу почту:${mail}, также мы отправим сообщение человеку ${userName}, по номеру ${tel}`)
        }
    }
})
cancel_button.addEventListener("click",()=>{
    page -= 1;
    redrawPage()
})
redrawPage()