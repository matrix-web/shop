export default class Favourites {
    constructor () {
        this.favs = this.readStorage()
    }

    addFav (id) {
        this.favs.push(id)
        this.saveData()
    }

    removeFav (id) {
        const index = this.favs.findIndex(idItem => id === idItem)
        this.favs.splice(index, 1)
        this.saveData()
    }

    isFav (id) {
        return this.favs.includes(id)
    }

    toggleFav (id) {
        this.isFav(id) ? this.removeFav(id) : this.addFav(id)
    }

    saveData () {
        localStorage.setItem('favs', JSON.stringify(this.favs))
    }

    readStorage () {
        const storage = JSON.parse(localStorage.getItem('favs'))

        return storage ? storage : []
    }
}