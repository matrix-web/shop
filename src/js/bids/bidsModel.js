export default class Bids {
    
    async getBids () {
        try {
            const queryString = 'http://jsproject.webcademy.ru/bids'
            const response = await fetch(queryString)
            const data = await response.json()

            this.bidsList = data

            if (!response.ok) {
                throw new Error('Network error')
            }
        } catch (error) {
            alert('Error with getting bids')
            console.log(error)
        }
    }
}