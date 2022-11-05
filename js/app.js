//Register users
const  mascotaInput = document.querySelector('#mascota');
const  propietarioInput = document.querySelector('#propietario');
const  telefonoInput= document.querySelector('#telefono');
const  fechaInput = document.querySelector('#fecha');
const  horaInput = document.querySelector('#hora');
const  sintomasInput = document.querySelector('#sintomas');

// UI
const  formulario = document.querySelector('#nueva-cita');
const  contenedorCitas = document.querySelector('#citas');


class Citas{
    constructor(){
        this.citas = [];
    }

    agregarCita(cita){
        this.cita = [...this.citas, cita];
    }

}

class UI{

    imprimirAlerta(mensaje, tipo){
        //Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //Agregar clase en base al tipo de error
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        }
        else{
            divMensaje.classList.add('alert-success');
        }

        //Mensaje de error
        divMensaje.textContent = mensaje;

        // Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        //Quitar la alerta despues de 5 segundos
        setTimeout(()=>{
            divMensaje.remove();
        }, 5000);
    }

    imprimirCitas({ cita }){
        cita.forEach( cita =>{
            const {mascota, propietario, telefono, fecha, hora, sintomas, id }= cita;
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;
            
            console.log(mascotaParrafo);
            

            //Agregar los parrafos al divCita
            divCita.appendChild(mascotaParrafo);

            //Agregar las citas al HTML
            contenedorCitas.appendChild(divCita);
        })
    }

}

const ui = new UI();
const administrarCitas = new Citas();

//Registar eventos
eventListeners();
function eventListeners(){
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}
//Eventos con la informacion de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

//Agrega datos al objeto de cita.
function datosCita(e){
   citaObj[e.target.name] = e.target.value;
}

//valida y agrega una nueva cita a la clase de citas
function nuevaCita(e){
    e.preventDefault();

    //Extraer la informacion del objeto de cita
    const {mascota, propietario, telefono, fecha, hora, sintomas}= citaObj;

    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){

        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;
    }

    // Generar un id unico
    citaObj.id = Date.now();


    //Creando una nueva cita
    administrarCitas.agregarCita({...citaObj});

    //reiniciar el objeto para la validacion

    
    reiniciarObjeto();
    //Reiniciar el formulario
    formulario.reset();
    
    //Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);

}

function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario= '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}