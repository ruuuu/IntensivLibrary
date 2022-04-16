import toBase64 from './toBase64.js';


const label = document.querySelector('.upload__label');
const preview = document.querySelector('.upload__preview'); // <img>
const file = document.querySelector('.upload__file'); // input type="file"



const previewSrc = preview.src;

file.addEventListener('change', async () => { //  когда выбрали файл при добалвении изображения во 2 ом шаге формы
    // for(let file of file.files){ // если несколько файлов выбали 
    //     const base64 = toBase64(file);
    // }

    if (file.files.length > 0) { // если выбран  файл(их может быть несколько)
        const base64 = await toBase64(file.files[0]); // тк возаращает промис, то ждем когда придет результат(await)

        preview.style.display = 'block'; // показываем картинку котрую выбрали
        label.classList.add('upload__label--active');
        console.log('base64 ', base64);
        preview.src = base64;

    }

});



export const clearPreview = () => {
    preview.style.display = '';
    label.classList.remove('upload__label--active');
    preview.src = previewSrc;
}
