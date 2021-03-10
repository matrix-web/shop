export function renderContainer () {
    const markup = `
            <div class="container p-0 mb-5">
                <div class="heading-1">Заявки</div>
            </div>
            <!-- panels-wrapper -->
            <div class="panels-wrapper">
                <div id="bids-holder" class="container p-0">
                    <!-- Bids will be here -->
                </div>
            </div>
    `

    document.querySelector('#app').insertAdjacentHTML('afterbegin', markup)
}

export function cleanBidsHolder () {
    document.querySelector('#bids-holder').innerHTML = ''
}

function renderBid (bid) {
    const markup = `
                <div class="panel panel--no-hover">
                    <div>${bid.id}</div>
                    <div class="panel__bidname">${bid.name}</div>
                    <div class="panel__bidphone">${bid.phone}</div>
                </div>`
    
    document.querySelector('#bids-holder').insertAdjacentHTML('beforeend', markup)
}

export function renderBids (bids) {
    bids.forEach(bid => renderBid(bid))
}

