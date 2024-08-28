document.addEventListener('DOMContentLoaded', function() {
    const inputName = document.querySelector('#inputName');
    const inputEmail = document.querySelector('#inputEmail');
    const inputMessage = document.querySelector('#inputMessage');
    const buttonClean = document.querySelector('#buttonClean');
    const buttonSend = document.querySelector('#buttonSend');

    

    inputName.addEventListener('blur', (event) => {
        const value = event.target.value.trim();
        const regex = /^[a-zA-z]+$/;

        if(value) {
            console.log('valor ingresado')
            if(regex.test(value)){
                console.log('valor correcto')

            } else {
                console.log('el campo solo admite letras')
            }

        } else {
            console.log('es obligatorio llenar el campo')
        }
    })

    inputEmail.addEventListener('blur', (event) => {
        const value = event.target.value.trim();

        if(value) {
            if(value.includes('@')){
                console.log('email correcto')

            } else {
                console.log('email no admitido')
            }

        } else {
            console.log('es obligatorio llenar el campo')
        }
    });

    inputMessage.addEventListener('blur', (event) => {
        const value = event.target.value.trim();
        
        if(value) {
            console.log('mensaje')

        } else {
            console.log('es obligatorio llenar el campo')
        }
    })

    
})