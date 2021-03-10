import homePage from './pages/homePage'
import singleItem from './pages/singleItemPage'
import favouritesPage from './pages/favouritesPage'
import bidsPage from './pages/bidsPage'
import errorPage from './pages/errorPage'
import EventEmitter from "./utils/EventEmitter"
import Favourites from "./favourites/favouritesModel"

const state = {
    results: [],
    emitter: new EventEmitter(),
    Favourites: new Favourites()
}

// Router
const routesTest = {
    '/': homePage,
    'item': singleItem,
    'favourites': favouritesPage,
    'bids': bidsPage
}

function findComponentByPath (path, routes) {
    return routes[path]
}

// Router
function router () {
    const pathArray = location.hash.split('/')
    const currentPath = pathArray[0] && pathArray[1] ? pathArray[1] : '/'
    const component = findComponentByPath(currentPath, routesTest) || errorPage

    // Save routes params
    state.routeParams = pathArray[2] ? parseInt(pathArray[2]) : ''
    
    state.emitter.remove('event:page-change')

    component(state)
}

window.addEventListener('hashchange', router)
window.addEventListener('load', router)