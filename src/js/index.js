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
    'book': () => { // если в адресной строке будет наисано book, то вызовется эта фукния
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
        router.navigate('add'); // переходи на cекцию add(форма)
    })
}));


backBtns.forEach((backBtn) => {
    backBtn.addEventListener('click', () => {
        router.navigate('/');
    })
});


// закрытие поля писка:
const closeSearch = (evt) => { // нажатие на блок .search
    // evt - объект событи, создается при наустпулении события. evt.target-  элемент на котором произошел клик
    if (evt.target.closest('.search, .header__btn--search')) { // если у target(нажатый эл-ент) или его родителя есть классы .search или .header__btn--search
        return; // блок .search закрываться  не будет
    }

    search.classList.remove('search__active');
    // btnSearchs[0].classList.remove('hide');
    // btnSearchs[1].classList.remove('hide');
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

controlField(fieldsBtnSort, fieldsListSort);
controlField(fieldsBtnFilter, fieldsListFilter);


const changeFieldset = () => {
    const fileldsets = document.querySelectorAll('.add__fileldset');
    const addBtn = document.querySelector('.add__btn'); //  кнопка Далее
    const form = document.querySelector('.add__form');
    //console.log(addBtn.dataset.count);
    let count = 0;


    addBtn.addEventListener('click', ({ target }) => { // target -свойтсов  внтури объекта evt, dsdtltn элемнет, на который нажали
        const fieldset = fileldsets[count]; // получим fieldset на rотрый нажали
        let valid = true; // валидный



        for (const elem of fieldset.elements) { // перебираем HTMLCollection
            //console.log(elem);
            if (!elem.checkValidity()) { // если элемент невалидный
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
                // else { //  если пришла о сервера оишбка

                // }

            }


            fieldset.classList.add('hide');
            fileldsets[count].classList.remove('hide');
        }

        // [...fieldset.elements].forEach(elem => { //fieldset.elements -HTMLCollection(к нему нельяз применять forEach), поэтому применяем спред-оператор котрый превратит в массив
        //     console.log(elem);
        // })









    });




}


changeFieldset();

