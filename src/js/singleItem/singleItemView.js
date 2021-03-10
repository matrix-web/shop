import priceFormat from './../utils/priceFormat'

export function render (object, isFaved) {
    const appContainer = document.querySelector('#app')
    const formattedTotalPrice = priceFormat(object.price_total)
    const formattedPriceSqM = priceFormat(object.price_sq_m)

    const markupModal = `
        <div id="modal-wrapper" class="modal-wrapper none">
            <div class="modal">
                <div class="modal__header">
                    <div class="modal__title">
                        Заявка на бронирование
                    </div>
                    <div class="modal__details">
                        Квартира <span>${object.flat_number}</span> в ЖК "${object.complex_name}" Дом ${object.building}
                        <div class="modal__details-art">${object.scu}</div>
                    </div>
                </div>

                <form class="modal__form">
                    <div id="form-content" class="modal__form-content">
                        <!-- formgroup -->
                        <div class="formgroup">
                            <label
                                class="modal__form-input-label"
                                for="form-phone"
                            >
                                Имя
                            </label>
                            <input
                                type="text"
                                id="form-name"
                                class="modal__form-input"
                                placeholder="Введите имя"
                            />
                        </div>
                        <!-- // formgroup -->
                        <!-- formgroup -->
                        <div class="formgroup">
                            <label
                                class="modal__form-input-label"
                                for="form-phone"
                            >
                                Телефон
                            </label>
                            <input
                                type="text"
                                id="form-phone"
                                class="modal__form-input"
                                placeholder="+7 (XXX) XXX-XX-XX"
                            />
                        </div>
                        <!-- // formgroup -->

                        <div class="formgroup formgroup--checkbox mb-3">
                            <input type="checkbox" id="policy" />
                            <label class="policy-text" for="policy"
                                >Я согласен на обработку моих персональных
                                данных. С Политикой в отношении обработки
                                персональных данных ознакомлен и
                                согласен.</label>
                        </div>
                    </div>
                    <input
                        class="modal__submit"
                        type="submit"
                        value="Отправить заявку"
                    />
                </form>
                <button class="modal__close">
                    Закрыть
                </button>
            </div>
        </div>
    `

    const markup = `
        <div class="container p-0 pt-5">
            <div class="heading-1">
                ${object.title}, ${object.square} м2 за ${formattedTotalPrice}
            </div>

            <!-- object -->
            <div class="object">
                <!-- object__photo -->
                <div class="object__photo">
                    <div class="object__photo-wrapper">
                        <img src="${object.image}" alt="${object.title}, ${object.square} м2" />
                    </div>
                </div>
                <!-- // object__photo -->

                <!-- object__desc -->
                <div class="object__desc">
                    <div class="object__desc-sector">
                        ЖК ${object.complex_name}
                    </div>

                    <div class="object__desc-name">
                        <div class="object__desc-title">
                            ${object.title}
                        </div>
                        <div class="object__desc-art">${object.scu}</div>

                        <!-- Добавить в избранное -->
                        <button id="addToFavouriteBtn" data-isFaved="${isFaved}" class="button-favourite ${isFaved ? 'button-favourite--active' : ''}">
                            <i class="fas fa-heart"></i> 
                            <span>
                                ${isFaved ? 'В избранном' : 'В избранное'}
                            </span>
                        </button>
                    </div>

                    <div class="object__desc-details">
                        <!-- params -->
                        <div class="params">
                            <div class="params__item">
                                <div class="params__definition">Корпус</div>
                                <div class="params__value">${object.building}</div>
                            </div>
                            <div class="params__item">
                                <div class="params__definition">Этаж</div>
                                <div class="params__value">${object.floor}</div>
                            </div>
                            <div class="params__item">
                                <div class="params__definition">Номер</div>
                                <div class="params__value">${object.flat_number}</div>
                            </div>
                            <div class="params__item">
                                <div class="params__definition">Комнат</div>
                                <div class="params__value">${object.rooms}</div>
                            </div>
                        </div>
                        <!-- // params -->
                    </div>

                    <div class="details">
                        <div class="details__row">
                            <div class="details__name">Стоимость</div>
                            <div
                                class="details__value details__value--price"
                            >
                                ${formattedTotalPrice}
                            </div>
                        </div>
                        <div class="details__row">
                            <div class="details__name">Цена за м2</div>
                            <div class="details__value">${formattedPriceSqM}/м2</div>
                        </div>
                        <div class="details__row">
                            <div class="details__name">Площадь</div>
                            <div class="details__value">${object.square} м2</div>
                        </div>
                    </div>

                    <button class="button-order">Забронировать</button>
                </div>
                <!-- // object__desc -->
            </div>
                <!-- // object -->
            </div>

            <div class="container p-0">
                <a href="/" class="back-to-results"
                    >← Вернуться к результатам поиска</a
                >
            </div>
        `

    appContainer.insertAdjacentHTML('beforeend', markup)
    appContainer.insertAdjacentHTML('beforeend', markupModal)
}

export function showModal () {
    document.querySelector('#modal-wrapper').classList.remove('none')
}

export function hideModal () {
    document.querySelector('#modal-wrapper').classList.add('none')
}

export function getInput () {
    const formData = {}

    formData.name = document.querySelector('#form-name').value.trim()
    formData.phone = document.querySelector('#form-phone').value.trim()
    formData.policy = document.querySelector('#policy').checked

    return formData
}

export function clearForm () {
    document.querySelector('.modal__form').reset()
}

export function toggleFavouriteBtn (isFaved) {
    const btn = document.querySelector('#addToFavouriteBtn')
    if (isFaved) {
        btn.classList.add('button-favourite--active')
        btn.querySelector('span').innerText = 'В избранном'
    } else {
        btn.classList.remove('button-favourite--active')
        btn.querySelector('span').innerText = 'В избранное'
    }
}