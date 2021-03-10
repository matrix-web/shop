import * as view from './paginationView'

export default function (state) {
    // Отрисовка контейнера пагинации
    view.renderContainer()

    // Получение контейнера с пагинацией
    const paginationNav = document.querySelector('#pagination-nav')

    paginationNav.addEventListener('click', event => {
        state.emitter.emit('event:page-change', event)
    })
}