export default class SingleItem {
    constructor (id) {
        this.id = id
    }

    async getItem () {
        try {
            const queryString = `http://jsproject.webcademy.ru/items/${this.id}`
            const response = await fetch(queryString)
            const data = await response.json()
            this.result = data

            if (!response.ok) {
                throw new Error('Network error')
            }
        } catch (error) {
            alert(error)
        }
    }

    async submitForm (formData) {
        const queryString = `http://jsproject.webcademy.ru/bidnew`

        const response = await fetch(queryString, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(formData)
        })

        const data = await response.json()

        this.response = data
    }
}