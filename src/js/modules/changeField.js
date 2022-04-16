import { router } from './router.js'; //  импорт объекта router из router.js
import { clearPreview } from './upload.js';

const fileldsets = document.querySelectorAll('.add__fileldset'); //[fieldset, fieldset,fieldset]
const addBtn = document.querySelector('.add__btn'); //  кнопка Далее
const form = document.querySelector('.add__form'); // форма
//console.log(addBtn.dataset.count);
const otherBackBtn = document.querySelector('.other-class'); // кнопка Назад
let count = 0;




const sendBook = () => {
    const data = true; // данные с сервера получены
    if (data) {
        form.reset(); // очищаем форму
        clearPreview(); // убираем картнки котрую выбрали
        router.navigate('/'); //  переходим на главную страницу
        count = 0;
        addBtn.textContent = 'Далее';
    }
}





export const changeFieldset = () => {
    if (count === fileldsets.length - 1) { // когда на третьей страничке формы
        addBtn.textContent = 'Добавить книгу'; // меняем текст на кнпоке
    }
    else {
        addBtn.textContent = 'Далее';
    }
    fileldsets[count].classList.remove('hide');
}



const initFieldSet = () => {
    // обработчик кнопки Далее:
    addBtn.addEventListener('click', ({ target }) => { // target -свойство  внутри объекта evt, dsdtltn элемнет, на который нажали
        const fieldset = fileldsets[count]; // получим fieldset на котром находимся
        let valid = true; // валидный

        for (const elem of fieldset.elements) { // перебираем HTMLCollection
            //console.log(elem);
            if (!elem.checkValidity()) { // если элемент невалидный, выделяем поля красным border
                elem.classList.add('no-valid');
                valid = false;
            }
            else {
                elem.classList.remove('no-valid');
            }
        }

        if (!valid) return; // дальше код не идет
        fieldset.classList.add('hide');
        count += 1;


        if (count === fileldsets.length) {// есди треться страннца формы
            count = 0;
            sendBook(); // отправка созданной книги на сервер
        }

        changeFieldset();

    });


    //  релазиаия кнпоки назад ц него наичнается  с 43:10
    otherBackBtn.addEventListener('click', () => { // обработчик кнопки Назад в форме
        if (count === 0) {
            console.log('count=0, т.е. первая страница формы');
            router.navigate('/');
            form.reset();
            clearPreview(); // убираем картинку котрую грузили 

        }

        if (count === 1) {
            console.log('count=1, т.е. вторая  страница формы');
            count--;
            fileldsets[0].classList.remove('hide');
            fileldsets[1].classList.add('hide');
            fileldsets[2].classList.add('hide');
            router.navigate('add');


        }

        if (count === 2) {
            console.log('count=2, т.е. третья страница формы');
            count--;
            fileldsets[0].classList.add('hide');
            fileldsets[1].classList.remove('hide');
            fileldsets[2].classList.add('hide');
            router.navigate('add');
        }
    });


}



export default initFieldSet(); //   экспорт функции  initFieldSet();


