document.addEventListener('DOMContentLoaded', function() {
    const name = document.querySelector('#nombre'); 
    const email = document.querySelector('#email'); 
    const email2 = document.querySelector('#email2'); 
    const description = document.querySelector('#descripcion');

    name.addEventListener('blur', validate);
    email.addEventListener('blur', validate);
    email2.addEventListener('blur', validateEmail);
    description.addEventListener('blur', validate);


    // valida los campos
    function validate(event) {
        const campName = event.target.id;
        const reference = event.target.parentElement;
        const camp = event.target;

        if(event.target.value.trim() == '') {
            showAlert(`El campo ${campName} es obligatorio`, reference, camp);
            return;
        }

        if(event.target.id == 'email') {
            validateEmail(event);
            return
        }

        cleanAlert(reference, camp)
    }



    // muestra alerta
    function showAlert(msgAlert, reference, camp) {

        // confirma si ya existe una alerta
        cleanAlert(reference, camp);


        const alert = document.createElement('P');
        alert.textContent = msgAlert;
        alert.classList.add('form__error');
        camp.classList.add('form__campError');
        reference.appendChild(alert);
    }



    // elimina alerta 
    function cleanAlert(reference, camp) {
        const exist = reference.querySelector('.form__error');
        if(exist) {
            exist.remove()
            camp.classList.remove('form__campError')
        }
    }



    // valida si los valores ingresados a los campos email son correctos
    function validateEmail(event) {
        const value = event.target.value;
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const result = regex.test(value);
        const camp = event.target;
        const reference = event.target.parentElement;


        if(event.target.value.trim() !== '' && !result) {
            showAlert(`El email es invalido, por favor verifique o intente de nuevo`,reference, camp)
            return;
        }

        if(event.target.value.trim() !== '' && result || event.target.value.trim() == '') {
            cleanAlert(reference, camp);
            return;
        }


    }
})