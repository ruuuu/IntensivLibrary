import { getBooks, getLabels, API_URI } from "./serverBook.js";

const book = document.querySelector('.book__container'); // <div class="book__container"> </div>

const getStars = (raiting) => { // п
    const stars = []; // пустой массив, в цикле его будем заполнять

    for (let i = 0; i < 5; i++) {

        if (i === 0) { // если 1 ая звездочка
            stars.push(`<img class="cart__rating-star" src="img/Star.svg" alt="Рейтинг ${raiting} из 5">`);
        }
        else if (i < raiting) {
            stars.push(`<img class="cart__rating-star" src="img/Star.svg" alt="">`);
        }
        else {
            stars.push(`<img class="cart__rating-star" src="img/Star_white.svg" alt="">`);
        }
    }

    return stars;
};




export const renderBook = async (id) => {
    const [books, labels] = await Promise.all([getBooks(id), getLabels()]); // books = [{},{},{},{}]

    book.textContent = ''; //нач значение пусто. у  <div class="book__container"> </div>




}