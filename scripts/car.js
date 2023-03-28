const tableBody = document.getElementById("tableBody")


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
                        </tr>`
        });
    })
    .catch(error => alert(error));
}


obtenerCar()

/**/
