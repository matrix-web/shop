import * as view from './bidsView'
import Bids from './bidsModel'
import notification from './../utils/notification'
import Pagination from './../pagination/paginationModel'
import * as paginationView from './../pagination/paginationView'

export default async function (state) {
    view.renderContainer()

    // Создаем объект модели для работы с заявками
    if ( !state.bids ) {
        state.bids = new Bids()
    }

    // Получаем заявки от сервера
    await state.bids.getBids()

    const pagination = new Pagination(state.bids.bidsList.length, 50, state.bids.bidsList)

    paginationView.changePaginationState(pagination)
    paginationView.renderPaginationItems(pagination.markup)

    // Отрисовка заявок для активной старницы
    view.renderBids(pagination.pages[pagination.pageActive])

    state.emitter.subscribe('event:page-change', event => {
        const isPageLink = event.target.classList.contains('page-link')

        if (isPageLink) {
            const pageNum = parseInt(event.target.dataset.page)
            view.cleanBidsHolder()
            
            if (!isNaN(pageNum)) {
                pagination.pageChange(pageNum)
                paginationView.renderPaginationItems(pagination.markup)

                view.renderBids(pagination.pages[pageNum])
            }
        }
    })


    if (!state.bids.bidsList.length) {
        notification(['Заявки отсутствуют'], 'secondary', '#bids-holder')
    } else {
        const notificationElement = document.querySelector('.alert-secondary')

        if (notificationElement) {
            notificationElement.remove()
        }
    }
}