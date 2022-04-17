import { getBooks, getLabels, API_URI } from "./serverBook.js";

const libraryList = document.querySelector('.library__list'); // <ul class="library__list"> </ul>


export const data = {
    books: [],
    labels: [],
    sortBook(sort) {
        return this.books; // объкет
    }

};

const getStars = (raiting) => { // 
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




export const renderListBooks = async () => {

    const [books, labels] = await Promise.all([getBooks(), getLabels()]); // ждем кгда оба метода вернут данные(массив книг и массив лейблов)
    libraryList.textContent = ''; // <ul class="list__library"> </ul>

    // деструктуризация:
    books.forEach(({ author, description, id, image, label, rating, title }) => { // books = [{},{},{},{}]
        const item = document.createElement('li'); // <li> </li>
        item.classList.add('list__item');

        item.innerHTML = `
            <a href="/#/book?id=${id}">
            <article class="cart">
                <div class="cart__wrapper">
                    <img class="cart__image" src="${API_URI + image}" alt="${title}">
                    <p class="cart__label">${labels[label]}</p>
                </div>

                <div class="cart__content">
                    <h3 class="cart__title">${title}</h3>
                    <p class="cart__author">${author}</p>
                    <p class="cart__description">${description.substring(0, 80)}...</p>
                    <div class="cart__rating">
                        ${getStars(rating).join('')}    
                    </div>
                </div>
            </article>
        </a>
        `;

        libraryList.append(item); // добавляем в ul li(item)

    });
};


// getStars(stars).join('')
//getStars(stars) -  получим массив звезд и методом join() объединем их  через пробел