export const API_URI = 'http://localhost:3024/'; // когда загрузим на хероку, то этот адерс надр поменять


// получение спсика книг
export const getBooks = async (id) => {
    // пока неполучим ответ дальше никуда не идем. ОТправляем запрос на сервер
    const response = await fetch(`${API_URI}api/books/${id || ''}`) // если id передали, то вставляем его

    if (response.ok) {
        return response.json();
    }

    throw new Error(response.statusText); // если получили ошибку

    //console.log(await response.json());// получим промис

}





// получение спсика лейбов
export const getLabels = async () => {
    const response = await fetch(`${API_URI}api/label/`)
    if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);

    //console.log(await response.json());

}