// OBJETO PRODUCTOS
let productos = {

    electronica: [
        {nombre:"Laptop", precio:15000, stock:5},
        {nombre:"Smartphone", precio:8000, stock:10},
        {nombre:"Audífonos", precio:1200, stock:20}
    ],

    ropa: [
        {nombre:"Playera", precio:300, stock:15},
        {nombre:"Pantalón", precio:700, stock:8},
        {nombre:"Sudadera", precio:900, stock:6}
    ],

    alimentos: [
        {nombre:"Manzana", precio:25, stock:50},
        {nombre:"Leche", precio:30, stock:40},
        {nombre:"Pan", precio:35, stock:25}
    ]

};

// RECORRER CATEGORÍAS Y PRODUCTOS CON for...in
for(let categoria in productos){

    console.log("Categoría:", categoria);

    for(let producto of productos[categoria]){
        console.log("Producto:", producto.nombre, "- Precio:", producto.precio);
    }

}

const select = document.getElementById("categorias");
const lista = document.getElementById("listaProductos");

// CREAR SELECT DINÁMICAMENTE
function cargarCategorias(){

    select.innerHTML = "";

    for(let categoria in productos){

        const option = document.createElement("option");

        option.value = categoria;
        option.textContent = categoria;

        select.appendChild(option);

    }

}

// MOSTRAR PRODUCTOS
function mostrarProductos(categoria){

    lista.innerHTML = "";

    const productosCategoria = productos[categoria];

    productosCategoria.forEach(function(producto){

        const li = document.createElement("li");

        li.textContent = producto.nombre + 
        " | Precio: $" + producto.precio + 
        " | Stock: " + producto.stock;

        lista.appendChild(li);

    });

}

// EVENTO SELECT
select.addEventListener("change", function(){

    mostrarProductos(this.value);

});

// EXPORTAR JSON
document.getElementById("exportar").addEventListener("click", function(){

    const datos = JSON.stringify(productos, null, 2);

    const blob = new Blob([datos], {type:"application/json"});

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "productos.json";

    a.click();

});

// IMPORTAR JSON
document.getElementById("importarJson").addEventListener("change", function(event){

    const archivo = event.target.files[0];

    if(!archivo) return;

    const lector = new FileReader();

    lector.onload = function(e){

        productos = JSON.parse(e.target.result);

        cargarCategorias();

        mostrarProductos(select.value);

    };

    lector.readAsText(archivo);

});

// INICIALIZAR
cargarCategorias();
mostrarProductos(select.value);