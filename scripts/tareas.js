//Primero la tarea
//POO en el navegador
//Constructor por parametros de las propiedas de la tarea
//Export para exportar a otras clases

export class Tarea {
  constructor(id, descripcion) {
    //Para hacer referencia a la propia clase
    this.id = id;
    this.descripcion = descripcion;
  }
  //Acciones o metodos pasamos por paramentro descripcion
  editar(descripcion) {
    //Esto es para generar tareas sin descripcion
    this.descripcion = descripcion;
  }
}