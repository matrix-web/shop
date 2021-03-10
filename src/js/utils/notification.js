function createNotification (text, type) {
    const notificationElement = document.createElement('div')
    notificationElement.classList.add('alert', `alert-${type}`)
    notificationElement.setAttribute('role', 'alert')

    notificationElement.innerText = text
    
    return notificationElement
}

function addNotification (selector, markup) {
    const element = document.querySelector(selector)

    element.insertAdjacentElement('beforeend', markup)
}

function deleteNotificationSuccess () {
    const alertSuccess = document.querySelector('.alert-success')

    setTimeout(() => {
        if (alertSuccess) {
            alertSuccess.style.opacity = 0
            setTimeout(() => alertSuccess.remove(), 2000);
        }
    }, 2000)
}

export default function notification (wargningsList, type, selector) {
    type = type.toLowerCase()

    let markup = ''
    const types = ['danger', 'success', 'secondary']
    document.querySelectorAll('.alert').forEach(alert => alert.remove())

    if (types.includes(type)) {
        wargningsList.forEach(item => {
            if (type === 'danger') {
                markup = createNotification(item.text, type)
                addNotification(selector, markup)
            } else if (type === 'success') {
                markup = createNotification(item, type)
                addNotification(selector, markup)
                deleteNotificationSuccess()
            } else {
                markup = createNotification(item, type)
                addNotification(selector, markup)
            }
        })
        
        return markup
    } else {
        throw new Error('Ошибка! Такого типа не существует. Используйте один из следующих типов: "danger", "success", "secondary"')
    }
}