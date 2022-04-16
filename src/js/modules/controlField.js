export const controlField = (btn, list, offList) => {

    btn.addEventListener('click', () => {
        list.classList.toggle('fields__list--active');
        offList.classList.remove('fields__list--active');
    });


    list.addEventListener('click', ({ target }) => {
        console.log('target', target);
        if (target.classList.contains('fields__button')) { // если на;атый элемент имеет класс fields__button 
            list.classList.remove('fields__list--active');
        }
    });
};

export default controlField;