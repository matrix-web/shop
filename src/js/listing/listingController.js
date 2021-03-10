import * as view from './listingView'
import sortCards from './../utils/sort'
import Pagination from './../pagination/paginationModel'
import * as  paginationView from './../pagination/paginationView'

export default function (state) {
    // Рендер контейнера для карточек
    view.render()

    const sortSelectElement = document.querySelector('#sort-cards-by')
    const options = sortSelectElement.options

    const pagination = new Pagination(state.results.length, 9, state.results)
    const pageActive = pagination.pageActive
    
    if (state.results.length) {
        // Если элементов для отображения меньше чем количество элементов на страницу, то скрывать пагинацию
        paginationView.changePaginationState(pagination)
        
        // Отрисовка пагинации
        paginationView.renderPaginationItems(pagination.markup)
        
        // Сортировка элементов по цене или площади
        sortCards(options[options.selectedIndex].value, pagination.pages[pageActive])

        // Рендеринг карточек для активной страницы
        pagination.pages[pageActive].forEach(item => {
            view.renderCard(item, state.Favourites.isFav(parseInt(item.id)))
        })

        state.emitter.subscribe('event:page-change', event => {
            const isPageLink = event.target.classList.contains('page-link')

            if (isPageLink) {
                const pageNum = parseInt(event.target.dataset.page)
                view.cleanListingContainer()

                if (!isNaN(pageNum)) {
                    pagination.pageChange(pageNum)
                    paginationView.renderPaginationItems(pagination.markup)

                    sortCards(options[options.selectedIndex].value, pagination.pages[pageNum])

                    pagination.pages[pageNum].forEach(item => {
                        view.renderCard(item, state.Favourites.isFav(parseInt(item.id)))
                    })
                }
            }
        })

        // Запуск прослушки клика на иконке "Добавить в избранное"
        addToFavsListener()

        state.emitter.subscribe('event:render-listing', () => {
            // Очиститить контейнер с карточками
            view.cleanListingContainer()
            
            // Сортировка карточек по цене и по площади
            sortCards(options[options.selectedIndex].value, state.results)

            pagination.updateElements(state.results)

            pagination.pages[pageActive].forEach(item => {
                view.renderCard(item, state.Favourites.isFav(parseInt(item.id)))
            })

            // Изменение состояния пагинации
            paginationView.changePaginationState(pagination)
            // Отрисовка пагинации
            paginationView.renderPaginationItems(pagination.markup)

            // Запуск прослушки клика на иконке "Добавить в избранное"
            addToFavsListener()
        })

        state.emitter.subscribe('event:sort-listing', () => {
            // Очиститить контейнер с карточками
            view.cleanListingContainer()

            // Сортировка карточек по цене и по площади
            sortCards(event.target.value, pagination.pages[pageActive])

            // Рендер карточек
            pagination.pages[pageActive].forEach(item => {
                view.renderCard(item, state.Favourites.isFav(parseInt(item.id)))
            }) 
        })

    } else {
        paginationNav.classList.add('hide')
    }

    // Функция для работы иконок "Добавить в избранное"
    function addToFavsListener ()  {
        Array.from(document.getElementsByClassName('card__like'), item => {
            item.addEventListener('click', event => {
                event.preventDefault()
                
                const currentId = parseInt(event.target.closest('.card').dataset.id)
                
                state.Favourites.toggleFav(currentId)
                view.toggleFavouriteIcon(event.target.closest('.card__like'), state.Favourites.isFav(currentId))
            })
        })
    }
}