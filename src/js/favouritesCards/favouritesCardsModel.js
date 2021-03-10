export default class FavouriteCards {
    constructor (favsList) {
        this.favsList = favsList
    }

    async getFavs () {
        try {
            const ids = this.favsList.toString()
            if (ids) {
                const queryString = `http://jsproject.webcademy.ru/items?ids=${ids}`
                const response = await fetch(queryString)
                const data = await response.json()
                this.cards = data

                if (!response.ok) {
                    throw new Error('Network error')
                } 
            }
        } catch (error) {
            console.log(error)
            alert('Error with getFavs')
        }
    }
}