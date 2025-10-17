const button = document.querySelector('#contact form button')
const form = document.querySelector('#contact form')
button.addEventListener('click', sendEmail)

export function sendEmail(e) {
    e.preventDefault()
}