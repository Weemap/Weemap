const botao = document.querySelector('#mobile-btn')
const mobileMenu = document.querySelector('#mobile-menu')
const mobileBtn = document.querySelector('#mobile-btn i')

botao.addEventListener('click', toggleMobileMenu)

function toggleMobileMenu() {
    if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active')
        
        mobileBtn.classList.remove('fa-x')
        mobileBtn.classList.add('fa-bars')
    } else {
        mobileMenu.classList.add('active')
        
        mobileBtn.classList.add('fa-x')
        mobileBtn.classList.remove('fa-bars')
    }
}