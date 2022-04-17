import { getBooks, getLabels, API_URI } from "./serverBook.js";

const container = document.querySelector('.book__container'); // <div class="book__container"> </div>
const btnDelete = document.querySelector('.header__btn--delete'); // кнопка корзины
const bookLabel = document.querySelector('.footer__btn.book__label'); // кнопка Хочу прочитать в футере
console.log('bookLabel ', bookLabel)

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
    console.log(books);
    container.textContent = ''; //нач значение пусто. у  <div class="book__container"> </div>

    const { author, title, description, label, image, rating } = books; // деуструктуризация
    const btnLabel = document.createElement('button');
    btnLabel.className = 'book__label book__label--img';
    btnLabel.textContent = labels[label];

    container.innerHTML = `
            <div class="book__wrapper">
                <img class="book__img" src="${API_URI}${image}" alt="${title}">
                // <button class="book__label book__label--img">Хочу прочитать</button>
                ${btnLabel.outerHTML}
            </div>

            <div class="book__content">
                <h2 class="book__title">1984</h2>
                <p class="book__author">Джордж Оруэлл</p>
                <div class="book__rating">
                    <img class="book__rating-star" src="img/Star.svg" alt="Рейтинг 4 из 5">
                    <!--значнеи alt прочитают роботы-->
                    <!--картинка из dist/img-->
                    <img class="book__rating-star" src="img/Star.svg" alt="">
                    <img class="book__rating-star" src="img/Star.svg" alt="">
                    <img class="book__rating-star" src="img/Star.svg" alt="">
                    <img class="book__rating-star" id="five" src="img/Star.svg" alt="">
                </div>

                <h3 class="book__subtitle">Описание</h3>

                <p class="book__description">Главный герой — Уинстон Смит — живёт в Лондоне, работает в Министерстве
                    правды и является членом внешней партии. Он не разделяет партийные лозунги и идеологию и в глубине
                    души сильно сомневается в партии, окружающей действительности и вообще во всём том, в чём только
                    можно сомневаться. Чтобы «выпустить пар» и не совершить какой-нибудь безрассудный поступок, ведёт
                    дневник, в котором старается излагать все свои сомнения. На людях же притворяется приверженцем
                    партийных идей. Однако опасается, что девушка Джулия, работающая в том же министерстве, шпионит за
                    ним и хочет разоблачить его. В то же время полагает, что высокопоставленный сотрудник их
                    министерства, член внутренней партии некий О’Брайен также не разделяет мнения партии и является
                    подпольным революционером.
                </p>
        </div>
    `;



};