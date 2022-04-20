import './modules/router.js'; // импорт router.js
import './modules/search.js';
import './modules/upload.js';
import { changeFieldset } from './modules/changeField.js'; // импорт фукнции changeFieldset из файла changeField.js
import { controlField } from './modules/controlField.js';




const fieldsBtnSort = document.querySelector('.fields__button-sort');
const fieldsListSort = document.querySelector('.fields__list-sort');
const fieldsBtnFilter = document.querySelector('.fields__button-filter');
const fieldsListFilter = document.querySelector('.fields__list-filter');



controlField(fieldsBtnSort, fieldsListSort, fieldsListFilter); // для сортировки
controlField(fieldsBtnFilter, fieldsListFilter, fieldsListSort); // для фильтра
changeFieldset();









// const five = document.querySelectorAll('.book__rating-star');
// five[4].addEventListener('click', ({ target }) => { // 
//     console.log(target); // выведет элемент на котрый нажали(те элемент на котром произошло событие)
// });



// [...fieldset.elements].forEach(elem => { //fieldset.elements -HTMLCollection(к нему нельяз применять forEach), поэтому применяем спред-оператор котрый превратит в массив
        //     console.log(elem);
        // })