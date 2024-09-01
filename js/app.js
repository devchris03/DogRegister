document.addEventListener('DOMContentLoaded', function() {

    const formField = {
        nombre: '',
        email: '',
        descripcion: '',
    }


    const name = document.querySelector('#nombre'); 
    const email = document.querySelector('#email'); 
    const email2 = document.querySelector('#email2'); 
    const description = document.querySelector('#descripcion');
    const send = document.querySelector('#buttonSend');
    const reset = document.querySelector('#buttonReset');
    const form = document.querySelector('#form');
    const sucess = document.querySelector('#sucess');


    name.addEventListener('blur', validate);
    email.addEventListener('blur', validate);
    email2.addEventListener('blur', validateEmail);
    description.addEventListener('blur', validate);
    reset.addEventListener('click', resetForm);
    send.addEventListener('click', submitForm);


    // valida los campos
    function validate(event) {
        const field = event.target;

        if(event.target.value.trim() == '') {
            showAlert(`El campo ${field.id} es obligatorio`, field.parentElement, field);
            formField[event.target.id] = '';
            validateForm()
            return;
        }

        if(event.target.id == 'email') {
            validateEmail(event);
            formField[event.target.id] = event.target.value.trim().toLowerCase();
            validateForm()
            return
        }

        formField[event.target.id] = event.target.value.trim().toLowerCase();

        cleanAlert(field.parentElement, field)

        validateForm()
    }


    // valida si los valores ingresados a los campos email son correctos
    function validateEmail(event) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const result = regex.test(event.target.value.trim());
        const field = event.target;

        if(event.target.value.trim() !== '' && !result) {
            showAlert(`El email es invalido, por favor verifique o intente de nuevo`,field.parentElement, field)
            return;
        }

        if(event.target.value.trim() !== '' && result || event.target.value.trim() == '') {
            cleanAlert(field.parentElement, field);
            return;
        }
    }


    // muestra alerta
    function showAlert(msgAlert, reference, field) {

        // confirma si ya existe una alerta
        cleanAlert(reference, field);

        const alert = document.createElement('P');
        alert.textContent = msgAlert;
        alert.classList.add('form__error');
        field.classList.add('form__campError');
        reference.appendChild(alert);
    }


    // elimina alerta 
    function cleanAlert(reference, field) {
        const exist = reference.querySelector('.form__error');
        if(exist) {
            exist.remove()
            field.classList.remove('form__campError')
        }
    }


    // habilita y deshabilita el botón enviar
    function validateForm() {
        if(Object.values(formField).includes('')) {
            send.disabled = true;
        } else {
            send.disabled = false; 
        }
    }


    // reinicia el formulario
    function resetForm() {
        
        formField['email'] = '';
        formField['nombre'] = '';
        formField['descripcion'] = '';
        form.reset();
        
        validateForm()
    }


    // envia registro 
    function submitForm() {
        const snipper = form.querySelector('.form__snipper');
        const campos = form.querySelectorAll('.field');
        snipper.hidden = false;
        campos.forEach((campo) => {
            campo.disabled = true;
        })
        
        
        setTimeout(() => {
            send.disabled = true;
            snipper.hidden = true;
            campos.forEach((campo) => {
                campo.disabled = false;
            });
            resetForm();

            // muestra mensaje de éxito
            sucess.classList.add('active');
            setTimeout(() => {
                sucess.classList.remove('active');
            }, 3000);

        }, 3000);
        

    }

})