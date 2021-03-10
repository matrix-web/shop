import favouritesCards from "./../favouritesCards/favouritesCardsController"
import pagination from './../pagination/paginationController'

export default function (state) {
    document.querySelector("#app").innerHTML =  ''
    pagination(state)
    favouritesCards(state)
}