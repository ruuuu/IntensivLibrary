import Navigo from 'navigo';


// получаем секции:
const library = document.querySelector('.library');
const book = document.querySelector('.book');
const add = document.querySelector('.add');
const addBtns = document.querySelectorAll('.header__btn-add, .library__add-btn'); // массив кнопок Добавить
const backBtns = document.querySelectorAll('.header__btn--back'); // кнопки Назад
const btnSearchs = document.querySelectorAll('.header__btn--search'); // кнпоки поиска в header
const search = document.querySelector('.search'); // блок с поиском



const fieldsBtnSort = document.querySelector('.fields__button-sort');

const fieldsListSort = document.querySelector('.fields__list-sort');
const fieldsBtnFilter = document.querySelector('.fields__button-filter');
const fieldsListFilter = document.querySelector('.fields__list-filter');





const router = new Navigo('/', { // созадем объект роутера
    hash: true,
});

const closeAllPage = () => { // скрываем все секции
    library.classList.add('hide');
    book.classList.add('hide');
    add.classList.add('hide');
}


// роутинг: напишем обработчики котрые будут запускаться в зависимости от адресной строки
router.on({
    '/': () => { // если находимся на главнй странице
        closeAllPage();
        library.classList.remove('hide');
        search.classList.remove('search__active');
        document.body.classList.remove('body__gradient');

    },
    'book': () => { // если в адресной строке будет написано book, то вызовется эта фукния
        closeAllPage();
        book.classList.remove('hide');
        search.classList.remove('search__active');
        document.body.classList.add('body__gradient');
    },
    'add': () => {
        closeAllPage();
        add.classList.remove('hide');
        search.classList.remove('search__active');
        document.body.classList.add('body__gradient');

    }
}).resolve();




addBtns.forEach(((btn) => {

    btn.addEventListener('click', () => {
        router.navigate('add'); // переходим на cекцию add(форма)
    })

}));


backBtns.forEach((backBtn) => { // нажатие на кнопку Назад

    backBtn.addEventListener('click', () => {
        router.navigate('/'); // переходим на главную страницу
    });

});


// закрытие поля поиска:
const closeSearch = (evt) => { // нажатие на блок .search
    // evt - объект событи, создается при наустпулении события. evt.target-  элемент на котором произошел клик
    if (evt.target.closest('.search, .header__btn--search')) { // если у target(нажатый эл-ент) или его родителя есть классы .search или .header__btn--search
        return; // блок .search закрываться  не будет
    }

    search.classList.remove('search__active');

    document.body.removeEventListener('click', closeSearch); // удаляем событие 

};



btnSearchs.forEach((btnSearch) => {

    btnSearch.addEventListener('click', () => {
        search.classList.add('search__active');
        document.body.addEventListener('click', closeSearch, true); // скобки у closeSearch не нужвн. При клике на body, закрываем блок поиска(.search)
        // третий параметр true нужен чтобы при нажатии на карточку, поле поиска закрывалось и получали стрнаицу книги 
        // btnSearch.classList.add('hide');

    });
});


// const five = document.querySelectorAll('.book__rating-star');
// five[4].addEventListener('click', ({ target }) => { // 
//     console.log(target); // выведет элемент на котрый нажали(те элемент на котром произошло событие)
// });



const controlField = (btn, list) => {

    btn.addEventListener('click', () => {
        list.classList.toggle('fields__list--active');
    });


    list.addEventListener('click', ({ target }) => {
        console.log('target', target);
        if (target.classList.contains('fields__button')) { // если на;атый элемент имеет класс fields__button 
            list.classList.remove('fields__list--active');
        }
    });
}

controlField(fieldsBtnSort, fieldsListSort); // для сортировки
controlField(fieldsBtnFilter, fieldsListFilter); // для фильтра


const changeFieldset = () => {
    const fileldsets = document.querySelectorAll('.add__fileldset'); //[fieldset, fieldset,fieldset]
    const addBtn = document.querySelector('.add__btn'); //  кнопка Далее
    const form = document.querySelector('.add__form'); // форма
    //console.log(addBtn.dataset.count);
    const otherBackBtn = document.querySelector('.other-class'); // кнопка Назад
    let count = 0;


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

        if (valid) {
            count += 1;

            if (count === fileldsets.length - 1) { // когда на третьей страничке формы
                addBtn.textContent = 'Добавить книгу'; // меняем текст на кнпоке
            }

            if (count === fileldsets.length) {
                const data = true; // данные с сервера получены
                if (data) {
                    form.reset(); // очищаем форму
                    router.navigate('/'); //  переходим на главную страницу
                    count = 0;
                    addBtn.textContent = 'Далее';
                }
            }

            fieldset.classList.add('hide');
            fileldsets[count].classList.remove('hide');
        }

    });



    otherBackBtn.addEventListener('click', () => { // обработчик кнопки Назад в форме
        if (count === 0) {
            console.log('count=0, т.е. первая страница формы');
            router.navigate('/');

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


changeFieldset();









// [...fieldset.elements].forEach(elem => { //fieldset.elements -HTMLCollection(к нему нельяз применять forEach), поэтому применяем спред-оператор котрый превратит в массив
        //     console.log(elem);
        // })