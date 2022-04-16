const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();


    reader.addEventListener('load', () => {  // событие загруки файла
        console.log(reader);
        resolve(reader.result);
    });

    reader.addEventListener('error', (err) => {  // событие ошибки загрузки файла
        reject(err);
    });

    reader.readAsDataURL(file); // считывание загруженного файла

});



export default toBase64;

