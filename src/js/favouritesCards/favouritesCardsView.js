import priceFormat from './../utils/priceFormat'

export function renderContainer () {
    const markup = ` 
                <div class="container p-0 mb-3">
                    <div class="heading-1">Избранное</div>
                </div>
                <div id="options-sort-wrapper" class="view-options-wrapper">
                    <div class="container p-0">
                        <div class="view-options">
                            <div class="view-options__sort">
                                <label for="sort-cards" class="view-options__label">Сортировать</label>
                                <select id="sort-cards" class="view-options__select">
                                    <option value="priceASC">по цене ↑</option>
                                    <option value="priceDESC">по цене ↓</option>
                                    <option value="squareASC">по площади ↑</option>
                                    <option value="squareDESC">по площади ↓</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cards-wrapper">
                    <div id="cards-container" class="container p-0">
                        <div id="cards-holder" class="row">
                            <!-- cards will be here -->
                        </div>
                    </div>
                </div>
                `
    
    document.querySelector('#app').insertAdjacentHTML('afterbegin', markup)
}

function renderCard (object) {
    const cardsContainer = document.querySelector('#cards-holder')
    const formattedTotalPrice = priceFormat(object.price_total)
    const formattedPriceSqM = priceFormat(object.price_sq_m)

    const markup = `
                <article class="col-md-4">
                    <!-- card -->
                    <a href="#/item/${object.id}" data-id="${object.id}" class="card">
                        <div class="card__header">
                            <div class="card__title">
                                ЖК ${object.complex_name}
                            </div>
                            <div class="card__like card__like--active">
                                <i class="fas fa-heart"></i>
                            </div>
                        </div>
                        <div class="card__img">
                            <img src="${object.image}" alt="План квартиры" />
                        </div>
                        <div class="card__desc">
                            <div class="card__price">
                                <div class="card__price-total">
                                    ${formattedTotalPrice}
                                </div>
                                <div class="card__price-per-meter">
                                    ${formattedPriceSqM}/м2
                                </div>
                            </div>

                            <!-- card__params params -->
                            <div class="card__params params">
                                <div class="params__item">
                                    <div class="params__definition">
                                        Комнат
                                    </div>
                                    <div class="params__value">${object.rooms}</div>
                                </div>
                                <div class="params__item">
                                    <div class="params__definition">
                                        Площадь
                                    </div>
                                    <div class="params__value">${object.square}</div>
                                </div>
                            </div>
                            <!-- //card__params params -->
                        </div>
                        <div class="card__footer">
                            <div class="card__art">${object.scu}</div>
                            <div class="card__floor">Этаж ${object.floor} из ${object.floors_total}</div>
                        </div>
                    </a>
                    <!-- // card -->
                </article>
                `
    cardsContainer.insertAdjacentHTML('beforeend', markup)
}

export function renderCards (cards) {
    document.querySelector('#cards-holder').innerHTML = ''
    
    if (cards) {
        cards.forEach(card => renderCard(card))
    }
}

export function toggleFavouriteIcon (elementIcon, isFaved) {
    elementIcon.classList.toggle('card__like--active')
}