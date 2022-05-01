import { getBooks, getLabels, API_URI } from "./serverBook.js";


export const data = { // создаем объект
    books: [],
    labels: [],

    sortBook(sort) { // сорировка книг по их ретйингу
        return this.books.sort((a, b) => { // сортирует books, a и b - объекты  и возвращет отсортированный массив книг, a={книга} и b={книга}
            if (sort === 'up') return a.rating < b.rating ? 1 : -1;
            if (sort === 'down') return a.rating > b.rating ? 1 : -1;
        });
    },

    filterBook(value) {
        return this.books.filter(book => book.label === value) // к массиву применеям метод filter, book- текущая книга. Вернет отфильтрованный массив
    }
};



const libraryList = document.querySelector('.library__list'); // <ul class="library__list"> </ul>
const fieldsList = document.querySelector('.fields__list-filter'); // фильтр  ul


// получение вертски со звездами
const getStars = (raiting) => {
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




// выводим список книг
export const renederList = (books = data.books) => { //если книжки не передали, то отображаем data.books(то что с сервера приходит)
    libraryList.textContent = ''; // нач значение пусто, <ul class="list__library"> </ul>

    // деструктуризация:
    const items = books.map(({ author, description, id, image, label, rating, title }) => { // перебираем книги
        const item = document.createElement('li'); // <li> </li>

        item.classList.add('list__item');

        item.innerHTML = `
            <a href="/#/book?id=${id}">
            <article class="cart">
                <div class="cart__wrapper">
                    <img class="cart__image" src="${API_URI + image}" alt="${title}">
                    <p class="cart__label">${data.labels[label]}</p>
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

        return item;
    }); // map

    libraryList.append(...items); // добавляем в ul все li(item) , ... спред-оператор котрый превратит items  в массив
}



const renderFields = (labels) => { // labels = {"wish": "хочу прочитать", "ready": "прочитал"}
    fieldsList.textContent = ''; // <ul></ul>

    for (const key in labels) {
        // console.log(key);
        // console.log(labels[key]);
        const item = document.createElement('li');
        item.classList.add('fields__item');

        const button = document.createElement('button');
        button.classList.add('fields__button');
        button.dataset.filter = key; // добавили кнпоке дата-атрибут data-filter='wish'
        button.textContent = labels[key];

        item.append(button); // button добавляем в li
        fieldsList.append(item); // li добавляем в  ul

    }
}



export const renderListBooks = async () => { // async сатвим тк  идет обращение к серверу

    const [books, labels] = await Promise.all([getBooks(), getLabels()]); // ждем кгда оба метода вернут данные(массив книг и массив лейблов)
    //console.log('массив книг ', books); // books = [{},{},{},{}], labels = {"wish": "хочу прочитать", "ready": "прочитал"}

    data.books = books;
    data.labels = labels;

    renederList(books);
    renderFields(labels);
    countBooks(books);

};



export const countBooks = (books) => { // перелаем массив книг

    const count = document.querySelector('.library__count');
    count.textContent = String(books.length) + ' книг'; // длина массива

};



// getStars(stars).join('')
//getStars(stars) -  получим массив звезд и методом join() объединем их  через пробел