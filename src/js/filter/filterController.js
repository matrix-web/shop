import * as view from './filterView'
import Filter from './filterModel'
import * as preloader from './../preloader/preloaderView'

export default async function (state) {

    // Создание объекта фильтра
    if (!state.filter) {
        state.filter = new Filter()
    }
    // Получение параметров для фильтра
    await state.filter.getParams()
    
    // Рендеринг прелоадера
    preloader.renderPreloader()

    // Запрос на сервер
    await state.filter.getResults()

    // Удаление прелоадера
    preloader.removePreloader()

    // Отрисовка фильтра
    view.render(state.filter.params)

    state.results = state.filter.result

    // Обновляем счет на кнопке
    view.changeButtonText(state.filter.result.length)

    // Прослушка событий формы
    const form = document.querySelector('#filter-form')
    const sortElement = document.querySelector('#sort-cards-by')

    // Изменение формы
    form.addEventListener('change', async (event) => {
        event.preventDefault()

        state.filter.query = view.getInput()
        await state.filter.getResults()
        state.results = state.filter.result
        view.changeButtonText(state.filter.result.length)
    })
    
    // Сброс формы
    form.addEventListener('reset', async () => {
        state.filter.query = ''
        await state.filter.getResults()
        state.results = state.filter.result
        view.changeButtonText(state.filter.result.length)
    })

    // Отправка формы
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        state.emitter.emit('event:render-listing', {})
    })

    sortElement.addEventListener('change', () => {
        state.emitter.emit('event:sort-listing', {})
    })
}