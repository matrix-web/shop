export default function sortCards (selectedValue, sortCollection) {
    if (selectedValue === 'priceASC') {
        sortCollection = sortCollection.sort((prev, next) => prev.price_total - next.price_total)
    } else if (selectedValue === 'priceDESC') {
        sortCollection = sortCollection.sort((prev, next) => next.price_total - prev.price_total)
    } else if (selectedValue === 'squareASC') {
        sortCollection = sortCollection.sort((prev, next) => prev.square - next.square)
    } else {
        sortCollection = sortCollection.sort((prev, next) => next.square - prev.square)
    }
}