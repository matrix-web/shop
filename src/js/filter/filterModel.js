export default class Filter {
    constructor () {
        this.query = ''
        this.result = []
    }

    async getParams () {
        try {
            const queryString = 'http://jsproject.webcademy.ru/itemsinfo'
            const response = await fetch(queryString)
            const data = await response.json()
            this.params = data

            if (!response.ok) {
                throw new Error('Network error')
            }

        } catch (error) {
            alert(error)
        }
    }

    async getResults () {
        try {
            const queryString = `http://jsproject.webcademy.ru/items${this.query}`
            const response = await new Promise(resolve => setTimeout(() => resolve(fetch(queryString)), 3000))
            const data = await response.json()
            this.result = data

            if (!response.ok) {
                throw new Error('Network error')
            }

        } catch (error) {
            alert(error)
        }
    }
} 