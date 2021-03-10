import filter from './../filter/filterController'
import listing from './../listing/listingController'
import pagination from './../pagination/paginationController'

export default async function (state) {
    document.querySelector("#app").innerHTML = ''
    await filter(state)
    pagination(state)
    listing(state)
}