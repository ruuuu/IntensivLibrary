import { data, renederList, countBooks } from './renderListBooks.js';



export const controlField = (btn, list, offList) => { // кнопки фильтра  и сортjровки


    btn.addEventListener('click', () => {
        list.classList.toggle('fields__list--active');
        offList.classList.remove('fields__list--active');
    });


    list.addEventListener('click', ({ target }) => {
        //console.log('target', target); // выведет нажатый элемент

        if (target.classList.contains('fields__button')) { // если нажатый элемент имеет класс fields__button 
            list.classList.remove('fields__list--active');
        }

        if (target.dataset.sort) {
            data.sortBook(target.dataset.sort); // значение атрибута data-sort: target.dataset.sort
            renederList();
            countBooks(data.books);

        }
        if (target.dataset.filter) {
            const mas = data.filterBook(target.dataset.filter); //  отфильрованный массив книг получим
            renederList(mas);
            countBooks(mas);
        }

    });
};



export default controlField; //  экспорт функции controlField