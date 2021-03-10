export default class Pagination {
    constructor (totalNumberOfElements, numberOfElementsPerPage, elements) {
        this.totalNumberOfElements = totalNumberOfElements
        this.numberOfElementsPerPage = numberOfElementsPerPage
        this.numberOfPages = Math.ceil(this.totalNumberOfElements / this.numberOfElementsPerPage)
        this.elements = elements || []
        this.pages = this.createPages()
        this.pageActive = 1
        this.show = 5
        this.prevShow = false
        this.nextShow = false
        this.firstShow = false
        this.lastShow = false
        this.prevArrow = '&laquo;'
        this.nextArrow = '&raquo;'
        this.classActive = 'active'
        this.separator = '...'
        this.pageLeft = 0
        this.pageRight = 0
        this.pagePrev = 0
        this.pageNext = 0
        this.markup = ''
    }

    createPages () {
        const pages = {}

        if (this.elements.length) {
            for (let i = 1; i <= this.numberOfPages; i++) {
                const startLimit = (i - 1) * this.numberOfElementsPerPage

                pages[i] = []
                pages[i] = this.elements.slice(startLimit, startLimit + this.numberOfElementsPerPage)
            }
        }

        return pages
    }

    updateElements (elements) {
        this.elements = elements
        this.numberOfPages = Math.ceil(elements.length / this.numberOfElementsPerPage)
        this.pages = this.createPages()
    }
    
    pagePrint(page, title, activePage, activeClass = '') {

        if (activePage && activeClass !== '') {
            return `<li class="page-item ${activeClass}"><button data-page="${page}" class="page-link">${title}</button></li>`
        }
    
        if (title === this.nextArrow && !activePage) {
            return `<li class="page-item"><button data-page="${page}" data-nav="${title}" class="page-link" disabled>${title}</button></li>`
        } else if (title === pagination.nextArrow && activePage) {
            return `<li class="page-item"><button data-page="${page}" data-nav="${title}" class="page-link">${title}</button></li>`
        }
    
    
        if (title === this.prevArrow && !activePage) {
            return `<li class="page-item"><button data-page="${page}" data-nav="${title}" class="page-link" disabled>${title}</button></li>`
        } else {
            return `<li class="page-item"><button data-page="${page}" data-nav="${title}" class="page-link">${title}</button></li>`
        }
        
        return `<li class="page-item"><button data-page="${page}" class="page-link">${title}</button></li>`
    }

    pageChange (page) {
        let pageActive = false
        
        this.markup = ''

        this.pageLeft = page - this.show
        this.pageRight = page + this.show
        this.pagePrev = page - 1
        this.pageNext = page + 1
    
        if (page == 1) {
            this.prevShow = false
            this.pagePrev = null
        } else {
            this.pagePrev = page - 1
            this.prevShow = true
        }
    
        if (page === this.numberOfPages) {
            this.nextShow = false
            this.pageNext = null
        } else {
            this.nextShow = true
        }
    
        if (this.pageLeft < 2) {
            this.pageLeft = 2
        }
    
        if (this.pageRight > (this.numberOfPages - 1)) {
            this.pageRight = this.numberOfPages - 1
        }
    
        if (page == 1) {
            this.firstShow = true
            this.pageActive = page
        } else {
            this.firstShow = false
        }
    
        if (page == this.numberOfPages) {
            this.lastShow = true
            this.pageActive = page
        } else {
            this.lastShow = false
        }

        this.markup += this.pagePrint(this.pagePrev, this.prevArrow, this.prevShow)
        this.markup += this.pagePrint(1, 1, this.firstShow, this.classActive)
    
        if (this.pageLeft > 2) {
            this.markup += this.pagePrint(this.separator, this.separator, true)
        }
    
        for (let i = this.pageLeft; i <= this.pageRight; i++) {
            pageActive = false
            if (page === i) {
                pageActive = true
                this.pageActive = page
            }
    
            this.markup += this.pagePrint(i, i, pageActive, this.classActive)
        }
    
        if (this.pageRight < (this.numberOfPages - 1)) {
            this.markup += this.pagePrint(this.separator, this.separator, true)
        }
    
        if (this.numberOfPages !== 1) {
            this.markup += this.pagePrint(this.numberOfPages, this.numberOfPages, this.lastShow, this.classActive)
        }
    
        this.markup += this.pagePrint(this.pageNext, this.nextArrow, this.nextShow)
    }
}