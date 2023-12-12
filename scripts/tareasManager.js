//Va a agregar tareas, va a coger objeto tareas y lo añade aqui a tareasManager, va a hacer todo , modificar elimintar etc..
//Aqui usaremos LOCALSTORAGE
//Importamos ya Tarea para tenerlo listo
// Sale en oscuro porque no hemos creado nada

import { Tarea } from "./tareas.js";
export class TareasManager {
  //Constructor por parametros una variable que esta en el main
  constructor(listaTareas) {
    //Por cada clase creamos uns constructor por parametros y que tenga metodos
    //En este array se almacenan las tareas
    this.arregloTareas = [];
    //Al no tener base de datos le metemos un contador que defina el numero de tareas que defina el array
    this.contador = 0;
    //Este va a almacenar la lista la tareas, almacenara la estructura de cada tarea, almacenara el codigo HTML5
    this.listaTareas = listaTareas;
  }

  //Primero agregamos tareas,hacemos un metodo agregar tareas
  //Le pasamos la descripcion de tarea que viene de tareas.js
  agregarTarea(descripcion) {
    //cada vez que agregamos una tarea sumamos +1 al contador
    //Ponemos this porque es una clase, cualquier instancia de esta clase
    this.contador++;
    //Antes de meterlo al array hay que crear una tarea, creamos una nueva
    //Le pasamos por parametro this contador porque es atributo en tarea.js, la descripcion al principio esta vacia
    const nuevaTarea = new Tarea(this.contador, descripcion);
    //Una vez elevado el contador a 1 y tenemos la instancia de la tarea con su id agregamos la tarea
    this.arregloTareas.push(nuevaTarea);
    //Tenemos que tener un get y set para el contador para almacenar en el LocalStorage
    this.setContador();
    //Necesitamos tambien añadir las tareas al localStorage
    this.setArregloTareas();
  }

  //El siguiente metodo para listar Tareas
  listarTareas() {
    //Primero genero la tarea y luego dentro de esa tarea llamo a editar tarea y añado un concepto
    //el inner es para que a cada tarea le añadas una descripcion
    //Esa descripcion es diferente para cada tarea, forma de inicializar la descripcion de la tarea, a nada string vacio para q no sea null o undefined
    this.listaTareas.innerHTML = '';
      //Comprobar si tenemos algo en localStorage
      if(localStorage.getItem("arregloTareas") !== null) {
        this.arregloTareas = this.getArregloTareas();
      }
    //Bucle iterativo para listar las tareas
    //Un ORM es inyectar objetos en el Backend
    //Reverse para que cuando creemos isntancias de tareas, reverse lo que hace es al crear una tarea me da la vuelta al array
    //En vez de abajo las crea arriba
    this.arregloTareas.reverse().forEach((tarea) => {
      //Definir que vamos a dibujar en hmtl
        this.listaTareas.innerHTML += `

            <li id="${tarea.id}">
            <input type="text" class="input-tarea" value="${tarea.descripcion}">
            <button class="boton-eliminar">X</button>
            </li>

            `;
    });
  }

  //Metodo para editar tarea
  //Cuando generemos instancias de la clase tarea, cuando hagamos click escribo lo que quiera
  //Cuando de al enter llamo a editar tarea para cambiar
  //Mirara que id tiene ese objeto tarea
  editarTarea(idTarea, descripcion) {
    //Generamos una variable tarea
    //Esta linea de codigo cambia la descripcion, obtengo que tarea estoy cambiando
    //la t es una variable que itera como en el for
    const tarea = this.arregloTareas.find((t) => t.id == idTarea);
    //nos aseguramos de que tengamos la tarea y la editamos
    if (tarea) {
      tarea.editar(descripcion);
      //tener en considerancion que tenemos en localStorage
      this.setArregloTareas();
    }
  }

  //Metodo para eliminar tarea
  //es parecido a editar tarea quitando find por filter
  eliminarTarea(idTarea) {
    //guardando en arreglo de tareas, todas las tareas menos 1 la del id
    this.arregloTareas = this.arregloTareas.filter((t) => t.id != idTarea);
    //actualizamos el local storage
    this.setArregloTareas();
  }

  //Metodo para limpiar todo objeto tarea
  limpiarTodo() {
    //con esto limpiamos todas las tareas
    this.arregloTareas = [];
    //igualamos el contador a 0
    this.contador = 0;
    //localStorage
    this.setArregloTareas();
    this.setContador();
  }

  //Ahora getters y setter
  getContador() {
    const cont = localStorage.getItem("contador");
    return cont;
  }

  setContador() {
    localStorage.setItem("contador", this.contador);
  }

  //metodo para asegurar que borras todo del tiron
  inicializarContador() {
    if (this.getContador() != null) {
      this.contador = this.getContador();
    }
  }

  getArregloTareas() {
    this.setContador();
    //De ese arreglo parseamos ese array y obtenemos objetos tareas, quito el array y me quedo con objetos tareas
    const arreglo = JSON.parse(localStorage.getItem("arregloTareas"));

    //Convertir objetos genericos en instancias de la clase tarea
    //map recorre la informacion de localStorage
    const tareasConvertidas = arreglo.map((tarea) =>  new Tarea(tarea.id,tarea.descripcion));
    return tareasConvertidas;
  }

  setArregloTareas() {
    localStorage.setItem("arregloTareas", JSON.stringify(this.arregloTareas));
    this.listarTareas();
  }
  
}
