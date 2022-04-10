import Navigo from 'navigo';

// получаем секции:
const library = document.querySelector('.library');
const book = document.querySelector('.book');
const add = document.querySelector('.add');
const addBtns = document.querySelectorAll('.header__btn-add, .library__add-btn'); // массив кнопок Добавить
const backBtns = document.querySelectorAll('.header__btn--back'); // кнопки Назад

const router = new Navigo('/', { // созадем объект роутера
    hash: true,
});

const closeAllPage = () => { // скрываем все секции
    library.classList.add('hide');
    book.classList.add('hide');
    add.classList.add('hide');
}


router.on({
    '/': () => {
        closeAllPage();
        library.classList.remove('hide');
    },
    'book': () => { // если в адресной строке будет наисано book, то вызовется эта фукния
        closeAllPage();
        book.classList.remove('hide');
    },
    'add': () => {
        closeAllPage();
        add.classList.remove('hide');
    }
}).resolve();
//напишем обработчики котрые будут запускаться в зависимости от адресной строки



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


