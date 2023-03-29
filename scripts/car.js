const tableBody = document.getElementById("tableBody")
const id = document.getElementById("txtId")
const marca = document.getElementById("txtMarca")
const modelo = document.getElementById("txtModelo")
const categoriaId = document.getElementById("txtCategoriaId")

function obtenerCar(){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://gd257f4deb7943f-ntvho1f0kb24nopq.adb.us-chicago-1.oraclecloudapps.com/ords/admin/car/car", requestOptions)
    .then(response => response.json())
    .then(result => {
        const data = result.items
        data.forEach(element => {
            tableBody.innerHTML += `<tr>
                            <td>${element.id}</td>
                            <td>${element.brand}</td>
                            <td>${element.model}</td>
                            <td>${element.category_id}</td>
                            <td><button class="btn btn-info" onclick="obtenerCarPorId(${element.id})">info</button></td>
                        </tr>`
        });
    })
    .catch(error => alert(error));
}

function eliminarCar(){
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
    fetch(`https://gd257f4deb7943f-ntvho1f0kb24nopq.adb.us-chicago-1.oraclecloudapps.com/ords/admin/car/car?id=${id.value}`, requestOptions)
        .then(response => {
            if(response.status == 204){
                location.reload()
            }else{
                alert("Error al eliminar car")
            }
        })
        .catch(error => console.log('error', error));
}

function crearCar(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "id": id.value,
        "brand": marca.value,
        "model": modelo.value,
        "category_id": categoriaId.value
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://gd257f4deb7943f-ntvho1f0kb24nopq.adb.us-chicago-1.oraclecloudapps.com/ords/admin/car/car", requestOptions)
        .then(response => {
            if(response.status == 201){
                location.reload()
            }else{
                alert("Error al agregar car")
            }
        })
        .catch(error => console.log('error', error));
}

function actualizarCar(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "id": id.value,
    "brand": marca.value,
    "model": modelo.value,
    "category_id": categoriaId.value
    });

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://gd257f4deb7943f-ntvho1f0kb24nopq.adb.us-chicago-1.oraclecloudapps.com/ords/admin/car/car", requestOptions)
        .then(response => {
            if(response.status == 201){
                location.reload()
            }else{
                alert("Error al actualizar car")
            }
        })
        .catch(error => console.log('error', error));
}

function obtenerCarPorId(idUrl){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`https://gd257f4deb7943f-ntvho1f0kb24nopq.adb.us-chicago-1.oraclecloudapps.com/ords/admin/car/car/${idUrl}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        const datos = result.items[0]
        id.value = datos.id
        modelo.value = datos.model
        marca.value = datos.brand
        categoriaId.value = datos.category_id
    })
    .catch(error => console.log('error', error));
}

obtenerCar()


