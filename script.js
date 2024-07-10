document.getElementById('cotizadorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value);
    const incrementoAnual = 0.07;
    const anioActual = new Date().getFullYear();
    let resultadoHTML = `<h2>Plan de Ahorro para ${nombre}</h2>`;
    resultadoHTML += `
        <table>
            <tr>
                <th>Año</th>
                <th>Edad</th>
                <th>Monto Anual</th>
                <th>Monto Mensual</th>
            </tr>
    `;
    let montoTotal = 0;

    for (let i = edad; i <= 18; i++) {
        let anio = anioActual + (i - edad);
        let costoAnual = 100000; // Asumiendo un costo base de $100,000 para el año actual.
        for (let j = 0; j < (anio - anioActual); j++) {
            costoAnual += costoAnual * incrementoAnual;
        }
        let costoMensual = costoAnual / 12;
        resultadoHTML += `
            <tr>
                <td>${anio}</td>
                <td>${i}</td>
                <td>$${formatNumber(costoAnual.toFixed(2))}</td>
                <td>$${formatNumber(costoMensual.toFixed(2))}</td>
            </tr>
        `;
        montoTotal += costoAnual;
    }

    resultadoHTML += `
        </table>
        <h3>Total a Ahorrar: $${formatNumber(montoTotal.toFixed(2))}</h3>
    `;
    document.getElementById('resultado').innerHTML = resultadoHTML;

    // Mostrar el botón para agendar con el agente
    document.getElementById('calendarioBtn').style.display = 'block';

    // Hacer scroll hacia el resultado
    document.getElementById('resultado').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('calendarioBtn').addEventListener('click', function() {
    window.location.href = 'https://calendario-agente.com'; // Cambia esta URL por la de tu agente.
});

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}