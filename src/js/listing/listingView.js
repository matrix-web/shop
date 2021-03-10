import priceFormat from './../utils/priceFormat'

export function render () {
    const paginationNav = document.querySelector('#pagination-nav')
    const cardsWrapper = document.createElement('div')
    const container = document.createElement('div')
    const listingContainer = document.createElement('div')

    cardsWrapper.classList.add('cards-wrapper')
    container.classList.add('container', 'p-0')
    listingContainer.classList.add('row')
    listingContainer.setAttribute('id', 'listing-container')

    cardsWrapper.append(container)
    container.append(listingContainer)

    paginationNav.before(cardsWrapper)
}

export function renderCard (object, isFaved) {
    const listingContainer = document.querySelector('#listing-container')
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
                            <div class="card__like ${isFaved ? 'card__like--active' : ''}">
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
    listingContainer.insertAdjacentHTML('beforeend', markup)
}

export function cleanListingContainer () {
    const listingContainer = document.querySelector('#listing-container')
    listingContainer.innerHTML = ''
}

export function toggleFavouriteIcon (elementIcon, isFaved) {
    if (isFaved) {
        elementIcon.classList.add('card__like--active')
    } else {
        elementIcon.classList.remove('card__like--active')
    }
}

