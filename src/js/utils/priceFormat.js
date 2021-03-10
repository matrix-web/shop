export default function (price) {
    const priceFormatter = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0
    })
    
    return priceFormatter.format(price)
}