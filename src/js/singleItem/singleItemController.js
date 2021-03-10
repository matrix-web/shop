import SingleItem from './singleItemModel'
import * as view from "./singleItemView"
import notification from "./../utils/notification"

export default async function (state) {

    // Создаем новый объект singleItem
    state.singleItem = new SingleItem(state.routeParams)

    // Получаем данные от сервера
    await state.singleItem.getItem()

    // Отрисовываем разметку для отдельного объекта
    view.render(state.singleItem.result, state.Favourites.isFav(state.singleItem.id))

    function validateForm (formData) {
        const errors = []
        const regExpPhone = /^\+\d-?\(?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/
        const [name, phone, policy] = Object.keys(formData)

        const errorsInfo = {
            name: {
                field: 'name', 
                typeError: 'empty', 
                text: 'Введите имя'
            },
            policy: {
                field: 'checkbox',
                typeError: 'unchecked',
                text: 'Дайте согласие на обработку персональных данных'
            },
            phone: [
                {
                    field: 'phone', 
                    typeError: 'empty', 
                    text: 'Введите телефон',
                }, {
                    field: 'phone', 
                    typeError: 'invalid', 
                    text: 'Некорректный формат телефона. <br> Например, +7-XXX-XXX-XX-XX'
                }
            ]
        }

        if (formData.name.length === 0) {
            errors.push(errorsInfo[name])
        }
        
        if (formData.phone.length === 0) {
            errors.push(errorsInfo[phone][0])
        } else if (!regExpPhone.test(formData.phone)) {
            errors.push(errorsInfo[phone][1])
        }

        if (!formData.policy) {
            errors.push(errorsInfo[policy])
        }

        return errors
    }

    // Запустить прослушку событий
    // Открытие модального окна
    document.querySelector('.button-order').addEventListener('click', () => {
        view.showModal()
    })

    // Закрытие модального окна
    document.querySelector('.modal__close').addEventListener('click', () => {
        view.hideModal()
    })

    // Закрытие модального окна - клик по оверлей
    document.querySelector('.modal-wrapper').addEventListener('click', event => {
        
        if (!event.target.closest('.modal')) {
            view.hideModal()
        } else {
            return null
        }
    })
    
    // Отправка формы 
    document.querySelector('.modal__form').addEventListener('submit', async event => {
        event.preventDefault()

        const formData = view.getInput()
        const errorsList = validateForm(formData)

        if (errorsList.length > 0) {
            notification(errorsList, 'danger', '#form-content')
        } else {
            await state.singleItem.submitForm(formData)
            notification(['Ваша заявка успешно отправлена!'], 'success', '#form-content')
            view.hideModal()
            view.clearForm()
        }
    })

    // Клик по кнопке "Добавить в избранное"
    document.querySelector('#addToFavouriteBtn').addEventListener('click', () => {
        state.Favourites.toggleFav(state.singleItem.id)
        view.toggleFavouriteBtn( state.Favourites.isFav(state.singleItem.id) )
    })
}