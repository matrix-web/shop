export function renderContainer () {
    const markup = `
        <nav id="pagination-nav" aria-label="page navigation">
            <ul id="pagination" class="pagination">

            </ul>
        </nav>`

    document.querySelector('#app').insertAdjacentHTML('beforeend', markup)
}

export function pagePrint (pagination, page, title, activePage, activeClass = '') {

    if (activePage && activeClass !== '') {
        return `<li class="page-item ${activeClass}"><button data-page="${page}" class="page-link">${title}</button></li>`
    }

    if (title === pagination.nextArrow && !activePage) {
        return `<li class="page-item"><button data-page="${page}" data-nav="${title}" class="page-link" disabled>${title}</button></li>`
    } else if (title === pagination.nextArrow && activePage) {
        return `<li class="page-item"><button data-page="${page}" data-nav="${title}" class="page-link">${title}</button></li>`
    }


    if (title === pagination.prevArrow && !activePage) {
        return `<li class="page-item"><button data-page="${page}" data-nav="${title}" class="page-link" disabled>${title}</button></li>`
    } else {
        return `<li class="page-item"><button data-page="${page}" data-nav="${title}" class="page-link">${title}</button></li>`
    }
    
    return `<li class="page-item"><button data-page="${page}" class="page-link">${title}</button></li>`
}

// Проверка количества элементов на странице для корректного отображения пагинации
export function changePaginationState (pagination) {
    const paginationNav = document.querySelector('#pagination-nav')

    if (pagination.elements.length <= pagination.numberOfElementsPerPage) {
        paginationNav.classList.add('hide')
    } else {
        paginationNav.classList.remove('hide')
        pagination.pageChange(pagination.pageActive)
    }
}

export function renderPaginationItems (markupItems) {
    const pagination = document.querySelector('#pagination')

    pagination.innerHTML = markupItems
}

