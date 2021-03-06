import { searchBooks } from './serverBook.js';
import { renederList, data } from './renderListBooks.js';
import { countBooks } from './renderListBooks.js';



const btnSearchs = document.querySelectorAll('.header__btn--search'); // кнпоки поиска в header
const search = document.querySelector('.search'); // блок с поиском
const searchForm = document.querySelector('.search__form'); // форма поиска


// закрытие поля поиска:
const closeSearch = (evt) => { // нажатие на блок .search
    // evt - объект события, создается при наступлении события. evt.target-  элемент на котором произошел клик
    if (evt.target.closest('.search, .header__btn--search')) { // если у target(нажатый эл-ент) или его родителя есть классы .search или .header__btn--search
        return; // блок .search закрываться  не будет
    }

    search.classList.remove('search__active');

    document.body.removeEventListener('click', closeSearch); // удаляем событие 

    renederList(data.books); //  возвращаем списко книг
    countBooks(data.books); // в лейбле отображаем сколько книг
};



btnSearchs.forEach((btnSearch) => {

    btnSearch.addEventListener('click', () => { // обработчик кнопки поиска
        search.classList.add('search__active');
        document.body.addEventListener('click', closeSearch, true); // скобки у closeSearch не нужны, т.к. это коллбэк функция. При клике на body, закрываем блок поиска(.search)
        // третий параметр true нужен чтобы при нажатии на карточку, поле поиска закрывалось и получали стрнаицу книги 
        // btnSearch.classList.add('hide');

    });
});




// поиск
searchForm.addEventListener('submit', async (evt) => {

    evt.preventDefault(); // отменяем событие по умолчанию, т.е. перезагрузка страницы
    const books = await searchBooks(searchForm.input.value);
    renederList(books);
    countBooks(books); // отображаем в  лейбле число книг
    evt.target.reset(); // очищаем поле поиска

    closeSearch(evt.target); // закрываем поле поиска

});