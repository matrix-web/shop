import 'url-search-params-polyfill'

const elements = {
    filterSelect: document.getElementsByClassName('filter__dropdown'),
    filterRooms: document.getElementsByClassName('rooms__checkbox'),
    filterFields: document.getElementsByClassName('range__input'),
    filterSubmit: document.getElementsByClassName("filter__show")
}

export function render (params) {

    let complexNames = ""
    params.complexNames.forEach(name => {
        complexNames += `<option value="${name}">ЖК ${name}</option>`
    })

    let rooms = ""
    params.roomValues.forEach(value => {
        rooms += `<input
                    name="rooms"
                    type="checkbox"
                    id="rooms_${value}"
                    class="rooms__checkbox"
                    value="${value}"
                /><label for="rooms_${value}" class="rooms__btn">${value}</label>`
    })

    const markup = `
                <form id="filter-form" method="GET" class="container p-0">
                    <div class="heading-1">Выбор квартир:</div>
                    <div class="filter">
                        <div class="filter__col">
                            <div class="filter__label">Выбор проекта:</div>
                            <select name="complex" id="filter-dropdown" class="filter__dropdown">
                                <option value="all">Все проекты</option>
                                ${complexNames}
                            </select>
                        </div>
                        <div class="filter__col rooms">
                            <div class="filter__label">Комнат:</div>
                            <div class="rooms__wrapper">
                                ${rooms}
                            </div>
                        </div>
                        <div class="filter__col">
                            <div class="filter__label">Площадь:</div>
                            <div class="range__wrapper">
                                <label class="range">
                                    <div for="" class="range__label">от</div>
                                    <input
                                        name="sqmin"
                                        min="0"
                                        type="number"
                                        class="range__input"
                                        placeholder="${params.squareMin}"
                                        value="${params.squareMin}"
                                    />
                                    <div class="range__value">м2</div>
                                </label>
                                <label class="range">
                                    <div for="" class="range__label">до</div>
                                    <input
                                        name="sqmax"
                                        min="0"
                                        type="number"
                                        class="range__input"
                                        placeholder="${params.squareMax}"
                                        value="${params.squareMax}"
                                    />
                                    <div class="range__value">м2</div>
                                </label>
                            </div>
                        </div>
                        <div class="filter__col">
                            <div class="filter__label">Стоимость:</div>
                            <div class="range__wrapper">
                                <div class="range">
                                    <label for="" class="range__label">от</label>
                                    <input
                                        type="number"
                                        name="pricemin"
                                        min="0"
                                        class="range__input range__input--price"
                                        placeholder="${params.priceMin}"
                                        value="${params.priceMin}"
                                    />
                                    <div class="range__value">₽</div>
                                </div>
                                <div class="range">
                                    <label for="" class="range__label">до</label>
                                    <input
                                        type="number"
                                        name="pricemax"
                                        min="0"
                                        class="range__input range__input--price"
                                        placeholder="${params.priceMax}"
                                        value="${params.priceMax}"
                                    />
                                    <div class="range__value">₽</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="filter__buttons">
                        <button class="filter__show" disabled>Объекты не найдены</button>
                        <button type="reset" class="filter__reset">Сбросить фильтр</button>
                    </div>
                </form>
                <div class="view-options-wrapper">
                    <div class="container">
                        <div class="view-options">
                            <div class="view-options__sort">
                                <label for="sort-cards-by" class="view-options__label">Сортировать</label>
                                <select id="sort-cards-by" name="sortby" class="view-options__select">
                                    <option value="priceASC">по цене ↑</option>
                                    <option value="priceDESC">по цене ↓</option>
                                    <option value="squareASC">по площади ↑</option>
                                    <option value="squareDESC">по площади ↓</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
    `

    document.querySelector('#app').insertAdjacentHTML('afterbegin', markup)
}

export function changeButtonText (number) {
    const btn = elements.filterSubmit[0]
    let message = ""

    if (number > 0) {
        message = `Показать ${number} объектов`
        btn.removeAttribute("disabled")
    } else {
        message = "Объекты не найдены"
        btn.setAttribute("disabled", "disabled")
    }

    btn.innerText = message
}

export function getInput () {
    const searchParams = new URLSearchParams()

    // 1. Значения из select
    if (elements.filterSelect[0].value !== 'all') {
        searchParams.append(elements.filterSelect[0].name, elements.filterSelect[0].value)
    }

    // 2. Параметры комнат - чекбоксы
    const roomsValues = []
    Array.from(elements.filterRooms, checkbox => {
        if (checkbox.checked && checkbox.value !== "") {
            roomsValues.push(checkbox.value)
        }
    })

    const roomValuesString = roomsValues.join(",")
    if ( roomValuesString.length ) {
        searchParams.append('rooms', roomValuesString)
    }

    // 3. Значения площадь и цена - input
    Array.from(elements.filterFields, input => {
        if ( input.value ) {
            searchParams.append(input.name, input.value.trim())
        }
    })

    // Готовая строка запроса
    const queryString = searchParams.toString()

    if ( queryString.length ) {
        return `?${queryString}`
    } else {
        return ""
    }
}