
import Citas from './classes/Citas.js';
import UI from './classes/UI.js';

import { mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, formulario } from './selectores.js';

const ui = new UI();
const administrarCitas = new Citas();


let editando;


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
export function datosCita(e){
    citaObj[e.target.name] = e.target.value;
 }

 //valida y agrega una nueva cita a la clase de citas
 export function nuevaCita(e){
    e.preventDefault();

    //Extraer la informacion del objeto de cita
    const {mascota, propietario, telefono, fecha, hora, sintomas}= citaObj;

    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){

        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;
    }

    if (editando) {
        ui.imprimirAlerta('Editado correctamente');

        //Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj});

        //Regresar el texto del boton a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';
        
        // Quitar modo edicion
        editando = false;
    }else{
        // Generar un id unico
        citaObj.id = Date.now();

        //Creando una nueva cita
        administrarCitas.agregarCita({...citaObj});

        ui.imprimirAlerta('Se agregó correctamente');
    }


    //reiniciar el objeto para la validacion

    
    reiniciarObjeto();
    //Reiniciar el formulario
    formulario.reset();
    
    //Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);

}

export function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario= '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id) {
    //Elimina la cita
    administrarCitas.eliminarCita(id);

    //Muestre un mensaje
    ui.imprimirAlerta('La cita se elimino correctamente');

    //Refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

//Carga los datos y el modo edicion
export function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id }= cita;

    //Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Cambia el texto de la barra de crear cita
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    editando = true;
}
 