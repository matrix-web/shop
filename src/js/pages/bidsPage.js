import bids from './../bids/bidsController'
import pagination from './../pagination/paginationController'

export default function (state) {
    document.querySelector('#app').innerHTML =  ''
    pagination(state)
    bids(state)
}