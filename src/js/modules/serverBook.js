export const API_URI = 'http://localhost:3024/'; // когда загрузим на хероку, то этот адерс надр поменять



export const getBooks = async (id) => { //отправка запроса на  получение списка книг

    // пока неполучим ответ дальше никуда не идем. ОТправляем запрос на сервер
    const response = await fetch(`${API_URI}api/books/${id || ''}`); // если id передали, то вставляем его. Получаем данные методом GET

    if (response.ok) {
        return response.json(); // вытаскиваем полученнеы даные из JSON,  получим массив книг
    }

    throw new Error(response.statusText); // если получили ошибку

    //console.log(await response.json()); // получим промис
}




export const searchBooks = async (search) => { //  отправка запроса  на книгу, сервер отдаст книгу котрая подходит под  условия поиска
    // пока неполучим ответ дальше никуда не идем. ОТправляем запрос на сервер
    const response = await fetch(`${API_URI}api/books/?search=${search}`); // если id передали, то вставляем его. Получаем данные методом GET

    if (response.ok) {
        return response.json(); // вытаскиваем полученнеы даные из JSON, получим массив книг
    }

    throw new Error(response.statusText);
}



export const addBooks = async (data) => { // отправляем данные на сервер(заплнение формы для добавления книги)

    const response = await fetch(`${API_URI}api/books/`, {
        method: 'POST',
        body: JSON.stringify(data) // тело запроса в формате JSON отправляем
    });


    if (response.ok) {
        return response.json(); // вытаскиваем полученнеы даные из JSON
    }

    throw new Error(response.statusText);
}




export const getLabels = async () => { //  отправка запроса на получение спсика лейблов
    const response = await fetch(`${API_URI}api/label/`);
    if (response.ok) {
        return response.json(); //  получим объект с лейблами
    }
    throw new Error(response.statusText);
}


export const deleteBook = async (id) => { //  отправка запроса на удаление книги по ее id

    // пока неполучим ответ дальше никуда не идем. ОТправляем запрос на сервер
    const response = await fetch(`${API_URI}api/books/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        return response.json(); // вытаскиваем полученнеы даные из JSON,  получим массив книг
    }

    throw new Error(response.statusText);
}



export const updateBook = async (id, data) => { //  отправка запроса на редактирование книги по ее id, data = {}-книга с новыми данными

    // пока неполучим ответ дальше никуда не идем. ОТправляем запрос на сервер
    const response = await fetch(`${API_URI}api/books/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });

    if (response.ok) {
        return response.json(); // вытаскиваем полученнеы даные из JSON,  получим массив книг
    }

    throw new Error(response.statusText);
}