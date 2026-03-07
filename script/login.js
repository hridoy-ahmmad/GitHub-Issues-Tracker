const userName = document.getElementById('userName')
const password = document.getElementById('password')


// step-1: login Functionality
const btnSubmit = () => {
    const inputUserName = userName.value
    const inputPassword = password.value

    if (inputUserName === 'admin' && inputPassword === 'admin123') {
        window.location.assign('/pages/home.html')
        
    } else {
        alert('Wrong Credentials')
    }
}