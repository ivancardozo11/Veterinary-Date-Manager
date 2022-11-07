class Citas{
    constructor(){
        this.citas = []
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];
    }
    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id);
    }
    editarCita(citaActualiazada){
        this.citas = this.citas.map(cita => cita.id === citaActualiazada.id ? citaActualiazada: cita );
    }

}

export default Citas;