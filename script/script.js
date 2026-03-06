

const buttonContainer = document.getElementById('buttonContainer')

buttonContainer.addEventListener('click', (e) => {

    if (e.target.localName === 'button') {
        const buttons = document.querySelectorAll('.btn-nav')
        buttons.forEach(btn => {
            btn.classList.remove('btn-primary')
        })
        e.target.classList.add('btn-primary')
    }


})
