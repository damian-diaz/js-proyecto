document.addEventListener('DOMContentLoaded', () => {


    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Camiseta',
            precio: 650000,
            imagen: "https://www.afashop.com.ar/ccstore/v1/images/?source=/file/v3363863698249912481/products/HB9215_FC_eCom-0.jpg&height=475&width=475" 
        },
        {
            id: 2,
            nombre: 'Short',
            precio: 6000,
            imagen: "https://thumbs.nosto.com/quick/rbxh5h46/8/244418_alt_0a745037085ac24bb6d2ae90cda37716fabe9b0203494e03b375e98910595386/81ee8d3375a4ef82ba4be93c060acd436ea2d749751db423ca73eb4dd6dc20c6/A"
        },
        {
            id: 3,
            nombre: 'Botinero de la Seleccion',
            precio: 15000,
            imagen: "http://d3ugyf2ht6aenh.cloudfront.net/stores/001/150/632/products/sin-titulo131-7a83bb24737e1b87cd16215301224765-640-0.jpg"
        },
        {
            id: 4,
            nombre: 'Medias Originales',
            precio: 8000,
            imagen: "https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/e857da94c5fd41e8b3fdae8c00ba5657_9366/medias-uniforme-titular-argentina-22.jpg"
        },
        {
            id: 5,
            nombre: 'Camiseta Suplente',
            precio: 55600,
            imagen: "https://media.futbolmania.com/media/catalog/product/cache/1/small_image/300x/9df78eab33525d08d6e5fb8d27136e95/H/G/HG7233_camiseta-adidas-argentina-pre-match-color-azul_miniatura.jpg"
        },
        {
            id: 6,
            nombre: 'Remera de Entrenamiento',
            precio: 17000,
            imagen: "https://cdn.solodeportes.com.ar/media/catalog/product/cache/7c4f9b393f0b8cb75f2b74fe5e9e52aa/m/u/musculosa-de-argentina-adidas-entrenamiento-verde-100020fh8578001-1.jpg"
        }
    
    ];
    
    const getDatos = () => {
        return new Promise ((resolve, reject) => {
            setTimeout(()=>{
                resolve(baseDeDatos);
            },1500);
        });
    }
    
    getDatos()
    .then((baseDeDatos)=>console.log(baseDeDatos));
    
    let carrito = [];
           const divisa = '$';
           const DOMitems = document.querySelector('#items');
           const DOMcarrito = document.querySelector('#carrito');
           const DOMtotal = document.querySelector('#total');
           const DOMbotonVaciar = document.querySelector('#boton-vaciar');
           const miLocalStorage = window.localStorage;
    
     // Funciones
     cargarCarritoDeLocalStorage();
     renderizarProductos();
     renderizarCarrito();
             
    function renderizarProductos() {
                    baseDeDatos.forEach((info) => {
                        
                    const miNodo = document.createElement('div');
                    miNodo.classList.add('card', 'col-sm-4');
                        
                    const miNodoCardBody = document.createElement('div');
                    miNodoCardBody.classList.add('card-body');
                                       
                    const miNodoTitle = document.createElement('h5');
                    miNodoTitle.classList.add('card-title');
                    miNodoTitle.textContent = info.nombre;
                       
                    const miNodoImagen = document.createElement('img');
                    miNodoImagen.classList.add('img-fluid');
                    miNodoImagen.setAttribute('src', info.imagen);
                        
                    const miNodoPrecio = document.createElement('p');
                    miNodoPrecio.classList.add('card-text');
                    miNodoPrecio.textContent = `${info.precio}${divisa}`;
                       
                    const miNodoBoton = document.createElement('button');
                    miNodoBoton.classList.add('btn', 'btn-primary');
                    miNodoBoton.textContent = '+';
                    miNodoBoton.setAttribute('marcador', info.id);
                    miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
                        
                    miNodoCardBody.appendChild(miNodoImagen);
                    miNodoCardBody.appendChild(miNodoTitle);
                    miNodoCardBody.appendChild(miNodoPrecio);
                    miNodoCardBody.appendChild(miNodoBoton);
                    miNodo.appendChild(miNodoCardBody);
                    DOMitems.appendChild(miNodo);
                    });
                }
    
               
                function anyadirProductoAlCarrito(evento) {
                     carrito.push(evento.target.getAttribute('marcador'))
                    
                    renderizarCarrito();
                    guardarCarritoEnLocalStorage();
                }
    
            
                function renderizarCarrito() {
                    
                    DOMcarrito.textContent = '';
                    const carritoSinDuplicados = [...new Set(carrito)];
                    carritoSinDuplicados.forEach((item) => {
                    const miItem = baseDeDatos.filter((itemBaseDatos) => {
                            
                            return itemBaseDatos.id === parseInt(item);
                        });
                       
                        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                         
                            return itemId === item ? total += 1 : total;
                        }, 0);
                  
                        const miNodo = document.createElement('li');
                        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
                        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
                       
                        const miBoton = document.createElement('button');
                        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
                        miBoton.textContent = 'X';
                        miBoton.style.marginLeft = '1rem';
                        miBoton.dataset.item = item;
                        miBoton.addEventListener('click', borrarItemCarrito);
                       
                        miNodo.appendChild(miBoton);
                        DOMcarrito.appendChild(miNodo);
                    });
                    
                    DOMtotal.textContent = calcularTotal();
                }
    
                 function borrarItemCarrito(evento) {
                     const id = evento.target.dataset.item;
                   carrito = carrito.filter((carritoId) => {
                        return carritoId !== id;
                    });
                    renderizarCarrito();
                  guardarCarritoEnLocalStorage();
    
                }
    
                function calcularTotal() {
                    return carrito.reduce((total, item) => {
                        const miItem = baseDeDatos.filter((itemBaseDatos) => {
                            return itemBaseDatos.id === parseInt(item);
                        });
                        return total + miItem[0].precio;
                    }, 0).toFixed(2);
                }
    
                function vaciarCarrito() {
                    carrito = [];
                    renderizarCarrito();
                    localStorage.clear();
    
                }
    
                function guardarCarritoEnLocalStorage () {
                    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
                }
    
                function cargarCarritoDeLocalStorage () {
                    if (miLocalStorage.getItem('carrito') !== null) {
                        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
                    }
                }
    
                DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    
                
            });