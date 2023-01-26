const fs = require('fs');
const ruta = "./desafio2Archivo.txt";
const crearArchivo = async (ruta) => {
    if (!fs.existsSync(ruta)){
        await fs.promises.writeFile(ruta, "[]")
    }else if ((await fs.promises.readFile(ruta,"utf-8")).length==0){
        await fs.promises.writeFile(ruta, "[]")
    }
}
class Producto {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}


class ProductManager {
    constructor() {
        this.path = ruta;
    }
    addProduct = async (newProduct) => {
        if (toString(newProduct.id).length > 0 && newProduct.title.length > 0 && newProduct.description.length > 0 && toString(newProduct.price).length > 0 && newProduct.thumbnail.length > 0 && newProduct.code.length > 0 && toString(newProduct.stock).length > 0) {
            let contenido = await fs.promises.readFile(this.path, "utf-8");
            let arrayProductos = JSON.parse(contenido);
            if (arrayProductos.filter(product => product.code == newProduct.code).length > 0) {
                console.error("Ya existe el producto");
            }
            else 
            {
                let contenido = await fs.promises.readFile(this.path, "utf-8");
                let aux = JSON.parse(contenido);
                console.log()
                if (aux.length>0){
                    const idAutoincremental = aux[aux.length-1].id+1; //Esto para que sea incremental dependiendo del ultimo elemento
                    aux.push({ id: idAutoincremental, ...newProduct });
                    await fs.promises.writeFile(this.path, JSON.stringify(aux));
                }
                else{
                    const idAutoincremental = 1;
                    aux.push({ id: idAutoincremental, ...newProduct });
                    await fs.promises.writeFile(this.path, JSON.stringify(aux));
                }

            }
        } else {
            console.error("Debe tener todos los campos completos para agregarlo")
        }
    }

    getAllProducts= async()=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let aux = JSON.parse(contenido)
        return aux;   
    }
    updateProduct = async({id, title, description, price, thumbnail, code, stock})  => {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let aux = JSON.parse(contenido)
        if(aux.some(product=> product.id === id)) {
            let pos = aux.findIndex(product => product.id === id)
            if (title!=undefined){
                if (title.length>0)
                {
                    aux[pos].title = title;
                }
            }
            if (description!=undefined){
                if (description.length>0)
                {
                    aux[pos].description = description;
                }
            }
            if (price!=undefined){
                if (price.length>0)
                {
                    aux[pos].price = parseFloat(price);
                }
            }
            if (thumbnail!=undefined){
                if (thumbnail.length>0)
                {
                    aux[pos].thumbnail = thumbnail;
                }
            }
            if (code!=undefined){
                if (code.length>0)
                {
                    aux[pos].code = code;
                }
            }
            if (stock!=undefined){
                if (stock.length>0)
                {
                    aux[pos].stock = parseInt(stock);
                }
            }
            await fs.promises.writeFile(this.path, JSON.stringify(aux))
            console.log("Producto actualizado exitosamente");
        } else {
            console.log( "Producto no encontrado para actualizar")
        }
    
    }
    getProductById= async(id)=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let aux = JSON.parse(contenido)
        if(aux.some(product=> product.id === id)) 
        {
            let pos = aux.findIndex(product => product.id === id)
            return aux[pos];
        }else{
            return "No se encontró el producto que desea ver"
        }        
    }

    deleteProductById= async(id)=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')
        let aux = JSON.parse(contenido)
        if(aux.some(product=> product.id === id)) 
        {
            const arraySinElIdSeleccionado = aux.filter(product => product.id != id);
            await fs.promises.writeFile(this.path, JSON.stringify(arraySinElIdSeleccionado))
            console.log("Producto eliminado exitosamente");           
        }else{
            console.error("No se encontró el producto que desea eliminar")
        }        
    }


}


//Creo los productos (El link de firestore es de mi tp anterior de react)
const producto1 = new Producto("Ryzen Threadripper 3990x", "Procesador Gaming gama alta", 490000, "https://firebasestorage.googleapis.com/v0/b/ecommercereact2022.appspot.com/o/threadripper3990x.jpg?alt=media&token=e6389599-5247-4468-9e95-725d61d7f34e", "aaaa", 23);
const producto2 = new Producto("Z590 Ultra", "Motherboard Gama Alta", 82000, "https://firebasestorage.googleapis.com/v0/b/ecommercereact2022.appspot.com/o/aorusZ590ULTRA.jpg?alt=media&token=932f4071-ace9-40fb-8f04-c85adf8bf82c", "aaab", 256);
const producto3 = new Producto("Zenith II Alpha", "Motherboard Gama Alta", 1000000, "https://firebasestorage.googleapis.com/v0/b/ecommercereact2022.appspot.com/o/ROGthreadripper.jpg?alt=media&token=bfa7fdda-23a5-4c84-92c5-e33dbb3ac93a", "aaac", 56);
const producto4 = new Producto("Rx 5500 xt ASUS", "Grafica Gama Media Alta", 100000, "https://firebasestorage.googleapis.com/v0/b/ecommercereact2022.appspot.com/o/rx5500xt.jpg?alt=media&token=f28c7534-425f-497f-b90e-911baea8b560", "aaad", 32);
const producto5 = new Producto("I7 4790", "Procesador Gama Media", 82000, "https://firebasestorage.googleapis.com/v0/b/ecommercereact2022.appspot.com/o/i7_4790.jpg?alt=media&token=9180a992-2129-4ce9-b89e-08c8fdfcc7ac", "aaae", 22);
const productoVacio = new Producto("", "", "", "", "", "");
const productoPrueba = new Producto("producto prueba", "Este es un producto prueba", 200, "Sin Imagen", "abc123", 25);


//Creo un product manager
productManager = new ProductManager()



//"tests" son los requeridos por la consigna, tests2PruebasVarias son pruebas que se me ocurrieron simplemente
const tests = async () => {
    //tests pedidos y adicionales:
    await crearArchivo(ruta); //Es para que si no tiene el array vacio al inicio se lo ponga así evitamos errores, y para asegurarnos que existe el archivo
    console.log(await productManager.getAllProducts()); //Debe aparecer []
    await productManager.addProduct(productoPrueba);
    console.log(await productManager.getAllProducts()); //Debe aparecer el producto prueba (o todos en caso de haber mas)
    console.log(await productManager.getProductById(1)); //Debe aparecer el producto con el id 1 (el de prueba), en caso de no existir tira error
    await productManager.updateProduct({id: 1, title:"Prueba cambiando titulo y descripcion del elemento 1", description:"Exito"}) //Debe actualizar los campos que están solamente, sin perder el id (en caso de querer cambiar todos, tambien se puede)
    console.log(await productManager.getProductById(1));
    await productManager.deleteProductById(1); //Elimina el producto que corresponde con el id 1 (el de prueba), en caso de no existir tira error
    
}
//LA IDEA ES UTILIZAR "tests" o "tests2PruebasVarias", NO AMBOS AL MISMO TIEMPO
const tests2PruebasVarias = async ()=>{
    await crearArchivo(ruta); 
    console.log(await productManager.getAllProducts());
    await productManager.addProduct(producto1);
    await productManager.addProduct(producto2);
    await productManager.addProduct(producto3);
    await productManager.addProduct(producto4);
    await productManager.addProduct(producto5);
    await productManager.addProduct(productoPrueba);
    await productManager.addProduct(productoVacio); //Esto lanzará que debe tener todos sus campos con algun dato para agregarlos
    console.log(await productManager.getAllProducts());
    console.log(await productManager.getProductById(4)); //Devuelve el producto
    await productManager.deleteProductById(4); //Elimina el producto con el id 4 (Este id no se podrá volver a utilizar, para mantener ese id permanentemente en ese producto, aunque no exista o se agregue nuevamente)
    console.log(await productManager.getProductById(4)); //Devuelve "No se encontró el producto a ver"
    await productManager.addProduct(producto4); //Esto agregará el producto pero ya que el id 4 fue eliminado para no ocacionar problemas se colocará en el fondo con el id del ultimo elemento +1
    await productManager.updateProduct({id: 7, title: "ultimo elemento", description:"anteriormente era el 4", price:"242423.564", thumbnail:"sin foto",code:"aa234",stock:"0"}) //Todos los parametros en este caso se deben pasar entre comillas
    console.log(await productManager.getAllProducts());
}

tests2PruebasVarias();
