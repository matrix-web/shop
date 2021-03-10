import FavouriteCards from './favouritesCardsModel'
import * as view from './favouritesCardsView'
import notification from './../utils/notification'
import sortCards from './../utils/sort'

import Pagination from './../pagination/paginationModel'
import * as paginationView from './../pagination/paginationView'

export default async function (state) {
    view.renderContainer()

    // Получить список объектов, которые енаходятся в избранном
    const favsList = state.Favourites.favs
    const sortElement = document.querySelector('#sort-cards')
    const options = sortElement.options
    const sortWrapper = document.querySelector('#options-sort-wrapper')

    // Получение данных от сервера
    const favouriteCards = new FavouriteCards(favsList)
    await favouriteCards.getFavs()

    const favouriteCardsLength = (favouriteCards.cards) ? favouriteCards.cards.length : 0
    const pagination = new Pagination(favouriteCardsLength, 9, favouriteCards.cards)

    if (favouriteCards.cards) {
        // Изменение состояния пагинации
        paginationView.changePaginationState(pagination)
        // Рендеринг пагинации
        paginationView.renderPaginationItems(pagination.markup)

        // Сортировка по цене по умолчанию
        sortCards(options[options.selectedIndex].value, pagination.pages[pagination.pageActive])

        state.emitter.subscribe('event:page-change', event => {
            const isPageLink = event.target.classList.contains('page-link')

            if (isPageLink) {
                const pageNum = parseInt(event.target.dataset.page)
                sortCards(options[options.selectedIndex].value, pagination.pages[pageNum])

                if (!isNaN(pageNum)) {
                    pagination.pageChange(pageNum)
                    paginationView.renderPaginationItems(pagination.markup)

                    view.renderCards(pagination.pages[pageNum])
                }
            }
        })

        view.renderCards(pagination.pages[pagination.pageActive])

        // Запускаем прослушку клика на иконке "Добавить в избранное"
        addToFavsListener()

    } else {
        sortWrapper.remove()
        notification(['Список пуст'], 'secondary', '#cards-container')
    }

    // Функция для работы иконок "Добавить в избранное"
    function addToFavsListener ()  {
        Array.from(document.getElementsByClassName('card__like'), item => {
            item.addEventListener('click', event => {
                event.preventDefault()
                
                const currentId = parseInt(event.target.closest('.card').dataset.id)
                
                state.Favourites.toggleFav(currentId)
                view.toggleFavouriteIcon(event.target.closest('.card__like'))
            })
        })
    }

    sortElement.addEventListener('change', event => {
        sortCards(event.target.value, pagination.pages[pagination.pageActive])
        view.renderCards(pagination.pages[pagination.pageActive])
    })
}