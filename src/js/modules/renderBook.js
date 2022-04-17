import { getBooks, getLabels, API_URI } from "./serverBook.js";

const container = document.querySelector('.book__container'); // <div class="book__container"> </div>
const btnDelete = document.querySelector('.header__btn--delete'); // кнопка корзины
const bookLabel = document.querySelector('.footer__btn.book__label'); // кнопка "Хочу прочитать" в футере



const getStars = (raiting) => { // п
    const stars = []; // пустой массив, в цикле его будем заполнять

    for (let i = 0; i < 5; i++) {

        if (i === 0) { // если 1 ая звездочка
            stars.push(`<img class="book__rating-star" src="img/Star.svg" alt="Рейтинг ${raiting} из 5">`);
        }
        else if (i < raiting) {
            stars.push(`<img class="book__rating-star" src="img/Star.svg" alt="">`);
        }
        else {
            stars.push(`<img class="book__rating-star" src="img/Star_white.svg" alt="">`);
        }
    }

    return stars;
};




export const renderBook = async (id) => {
    const [books, labels] = await Promise.all([getBooks(id), getLabels()]); // books = [{},{},{},{}]
    console.log(books);
    container.textContent = ''; //нач значение пусто. у  <div class="book__container"> </div>

    const { author, title, description, label, image, rating } = books; // деуструктуризация
    const btnLabel = document.createElement('button');
    btnLabel.className = 'book__label book__label--img';
    btnLabel.textContent = labels[label];
    btnLabel.dataset.label = label; // btnLabel устанавливаем дата атрибут data-label=label

    container.innerHTML = `
            <div class="book__wrapper">
                <img class="book__img" src="${API_URI}${image}" alt="${title}">
                ${btnLabel.outerHTML}
            </div>

            <div class="book__content">
                <h2 class="book__title">${title}</h2>
                <p class="book__author">${author}</p>
                <div class="book__rating">
                    ${getStars(rating).join('')}
                </div>

                <h3 class="book__subtitle">Описание</h3>

                <p class="book__description">${description}</p>
            </div>
    `;

    btnDelete.dataset.id = id; // кнопке удаления добавили дата-атрибут data-id = id
    bookLabel.dataset.label = label;
    bookLabel.textContent = labels[label];

};

