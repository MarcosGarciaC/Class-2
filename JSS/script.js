document.getElementById("falsePosForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita recargar la página

    // Obtener valores del formulario
    let funcInput = document.getElementById("func").value;
    let xl = parseFloat(document.getElementById("xl").value);
    let xu = parseFloat(document.getElementById("xu").value);
    let es = parseFloat(document.getElementById("es").value);
    let imax = parseInt(document.getElementById("imax").value);

    // Convertir la función ingresada en una evaluable
    let f;
    try {
        f = math.compile(funcInput);
    } catch (error) {
        alert("Error en la función ingresada. Verifica la sintaxis.");
        return;
    }

    // Implementación del método de Falsa Posición
    let iter = 0;
    let xr_old = 0;
    let xr = 0;
    let ea = 100;
    let tableBody = document.getElementById("resultTableBody");
    tableBody.innerHTML = ""; // Limpiar tabla anterior

    do {
        xr_old = xr;
        xr = xu - (f.evaluate({ x: xu }) * (xl - xu)) / (f.evaluate({ x: xl }) - f.evaluate({ x: xu })); // Fórmula de falsa posición
        iter++;

        if (xr !== 0) {
            ea = Math.abs((xr - xr_old) / xr) * 100; // Cálculo del error relativo
        }

        let test = f.evaluate({ x: xl }) * f.evaluate({ x: xr });

        if (test < 0) {
            xu = xr;
        } else if (test > 0) {
            xl = xr;
        } else {
            ea = 0;
        }

        // Agregar fila a la tabla de iteraciones
        let row = `<tr>
            <td>${iter}</td>
            <td>${xl.toFixed(6)}</td>
            <td>${xu.toFixed(6)}</td>
            <td>${xr.toFixed(6)}</td>
            <td>${f.evaluate({ x: xl }).toFixed(6)}</td>
            <td>${f.evaluate({ x: xu }).toFixed(6)}</td>
            <td>${f.evaluate({ x: xr }).toFixed(6)}</td>
            <td>${ea.toFixed(6)}</td>
        </tr>`;
        tableBody.innerHTML += row;

    } while (ea > es && iter < imax);

    // Mostrar la raíz final
    document.getElementById("rootResult").innerText = `Raíz aproximada: ${xr.toFixed(6)}`;
});
