// ===============================
// Formatear el input de monto con separadores de miles
// ===============================

// Seleccionamos el input de monto
const montoInput = document.getElementById("validationCustomMonto");

// Escuchamos el evento "input" (cada vez que el usuario escribe)
montoInput.addEventListener("input", function() {
    // Quitamos todo lo que no sea dígito usando expresión regular
    let valor = this.value.replace(/\D/g, "");

    if (valor) {
        // Convertimos el valor a número entero
        let numero = parseInt(valor, 10);

        // Formateamos con separadores de miles y agregamos el símbolo $
        this.value = `$ ${numero.toLocaleString("es-CL")}`;
    } else {
        // Si el campo queda vacío, lo limpiamos
        this.value = "";
    }
});


// ===============================
// Tabla de tasas según cuotas
// ===============================

// Definimos un objeto que relaciona número de cuotas con tasa anual
const tasasPorCuotas = {
    6: 10,   // 10% anual para 6 cuotas
    12: 12,  // 12% anual para 12 cuotas
    18: 14,  // 14% anual para 18 cuotas
    24: 16,  // 16% anual para 24 cuotas
    30: 18   // 18% anual para 30 cuotas
};


// ===============================
// Detectar el cambio en el select de cuotas
// ===============================

document.getElementById("validationCustomCuotas").addEventListener("change", function() {
    // Convertimos el valor seleccionado en número (ej: "12 cuotas" → 12)
    let cuotasSeleccionadas = parseInt(this.value);

    // Buscamos la tasa correspondiente en la tabla, si no existe devolvemos 0
    let tasa = tasasPorCuotas[cuotasSeleccionadas] || 0;

    // Mostramos la tasa en el input deshabilitado
    document.getElementById("validationCustomTasa").value = `${tasa}%`;
});


// ===============================
// Capturar el submit del formulario
// ===============================

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita recargar la página al enviar el formulario

    // Obtenemos los valores de los campos del formulario
    let nombre = document.getElementById("validationCustom01").value;
    let apellido = document.getElementById("validationCustom02").value;
    let email = document.getElementById("validationCustomUsername").value;

    // Limpiamos el monto (quitamos $ y puntos) y lo convertimos a número
    let monto = Number(document.getElementById("validationCustomMonto").value.replace(/\$/g, "").replace(/\./g, "").replace(/\s/g, ""));
    let cuotas = document.getElementById("validationCustomCuotas").value;
    let plazo = parseInt(cuotas); // Convertimos cuotas en número
    let tasa = Number(document.getElementById("validationCustomTasa").value.replace("%", "")); // Limpiamos el símbolo %

    // Validación del monto: debe ser mayor a $1.000.000
    if (monto <= 1000000) {
        // Si no cumple, marcamos el campo como inválido y mostramos feedback
        document.getElementById("validationCustomMonto").classList.add("is-invalid");
        return; // Detenemos la simulación
    } else {
        // Si cumple, marcamos el campo como válido
        document.getElementById("validationCustomMonto").classList.remove("is-invalid");
        document.getElementById("validationCustomMonto").classList.add("is-valid");
    }

    // Llamamos a la función de cálculo con los datos obtenidos
    calcularPrestamo(nombre, apellido, email, monto, tasa, plazo);
});


// ===============================
// Función de cálculo del préstamo
// ===============================

function calcularPrestamo(nombre, apellido, email, monto, tasa, plazo) {
    // Convertimos la tasa anual a tasa mensual en formato decimal
    let tasaMensual = tasa / 12 / 100;

    // Fórmula de cuota fija (sistema francés)
    let cuotaMensual = monto * (tasaMensual / (1 - Math.pow(1 + tasaMensual, -plazo)));

    // Calculamos el total a pagar
    let totalAPagar = cuotaMensual * plazo;

    // Redondeamos los valores al entero más cercano
    cuotaMensual = Math.round(cuotaMensual);
    totalAPagar = Math.round(totalAPagar);

    // Creamos un objeto con toda la información del préstamo
    let prestamo = {
        cliente: `${nombre} ${apellido}`,
        email: email,
        monto: monto,
        tasa: tasa,
        plazo: plazo,
        cuotaMensual: cuotaMensual,
        totalAPagar: totalAPagar
    };

    // Mostramos los resultados en pantalla
    mostrarResultados(prestamo);
}


// ===============================
// Mostrar resultados en HTML
// ===============================

function mostrarResultados(prestamo) {
    let resultadoDiv = document.getElementById("resultado");

    // Rellenamos los campos con los valores calculados
    document.getElementById("monto").textContent = `Monto: $${prestamo.monto.toLocaleString("es-CL")}`;
    document.getElementById("tasa").textContent = `Tasa anual: ${prestamo.tasa}%`;
    document.getElementById("plazo").textContent = `Plazo: ${prestamo.plazo} meses`;
    document.getElementById("cuota").textContent = `Cuota mensual: $${prestamo.cuotaMensual.toLocaleString("es-CL")}`;
    document.getElementById("total").textContent = `Total a pagar: $${prestamo.totalAPagar.toLocaleString("es-CL")}`;

    // Mostramos el bloque de resultados (quitamos la clase d-none)
    resultadoDiv.classList.remove("d-none");

    // Mostramos el botón "Volver a simular"
    document.getElementById("btnReset").classList.remove("d-none");

    // También mostramos el objeto en consola para depuración
    console.log(prestamo);
}


// ===============================
// Limpiar resultados y volver a simular
// ===============================

document.getElementById("btnReset").addEventListener("click", function() {
    // Ocultamos el bloque de resultados
    document.getElementById("resultado").classList.add("d-none");

    // Ocultamos el botón nuevamente
    this.classList.add("d-none");

    // Reseteamos el formulario a su estado inicial
    document.querySelector("form").reset();

    // Limpiamos el campo de tasa
    document.getElementById("validationCustomTasa").value = "";
});