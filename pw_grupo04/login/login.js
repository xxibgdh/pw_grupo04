function validarDatos(form) {
    console.log(form['email'].value);
    if (validar_email(form['email'].value) == true) {
        if (form['contraseña'].value.length >= 6) {
            comprobarDatos(form);
        } else {
            console.log("algo va mal");
            var error = document.getElementById('error');
            error.innerHTML = "<p style='color: red;'>Alguno de sus datos no es correcto. Inténtelo de nuevo.</p>";
        }
    } else {
        console.log("algo va mal");
        var error = document.getElementById('error');
        error.innerHTML = "<p style='color: red;'>Alguno de sus datos no es correcto. Inténtelo de nuevo.</p>";
    }
}

function validar_email(email) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

function comprobarDatos(form) {
    console.log(new FormData(form));
    fetch('../api/v1.1/login?debug', {
        method: 'post',
        body: new FormData(form)
    }).then(function (r) {
        return r.json();
    }).then(function (j) {
        console.log(j);
        if (j.datos.length != 0) {
            if (form['contraseña'].value == j.datos[0].contrasenya) {
                console.log("hola");
                document.location.href = "../dashboard.html?id_usuario=" + j.datos[0].id_usuario + "&email=" + j.datos[0].email;
            } else {
                var error = document.getElementById('error');
                error.innerHTML = "<p style='color: red;'>Alguno de sus datos no es correcto. Inténtelo de nuevo.</p>";
            }
        } else {
            var error = document.getElementById('error');
            error.innerHTML = "<p style='color: red;'>Alguno de sus datos no es correcto. Inténtelo de nuevo.</p>";
        }
    });
}
