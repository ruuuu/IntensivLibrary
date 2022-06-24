import Navigo from 'navigo';
import { renderListBooks } from './renderListBooks.js';
import { renderBook } from './renderBook.js';



// получаем секции:
const library = document.querySelector('.library');
const book = document.querySelector('.book');
const add = document.querySelector('.add');
const addBtns = document.querySelectorAll('.header__btn-add, .library__add-btn'); // массив кнопок Добавить
const backBtns = document.querySelectorAll('.header__btn--back'); // кнопки Назад
const search = document.querySelector('.search'); // блок с поиском

export const router = new Navigo('/', { // созадем объект роутера, экспортруем его,тк его испльзуем в changeField.js
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
        renderListBooks(); // отобраденеи спсика книг на главной станице

    },
    'book': ({ params: { id } }) => { // если в адресной строке будет написано book, то вызовется эта фукния
        console.log(id); // 014558610733 -id книги 
        closeAllPage();
        book.classList.remove('hide');
        search.classList.remove('search__active');
        document.body.classList.add('body__gradient');
        renderBook(id); // вызвать фкцию котрая отрисует книжку
    },
    'add': (obj) => {
        console.log(obj);
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