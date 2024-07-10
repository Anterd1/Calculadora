document.getElementById('cotizadorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value);
    const costoActual = parseFloat(document.getElementById('costoActual').value);
    const incrementoAnual = 0.07;
    const anioActual = new Date().getFullYear();
    const aniosHasta18 = 18 - edad;
    
    // Calcular el costo futuro
    const costoFuturo = costoActual * Math.pow(1 + incrementoAnual, aniosHasta18);

    // Calcular el ahorro anual necesario
    const ahorroAnual = costoFuturo / aniosHasta18;
    const ahorroMensual = ahorroAnual / 12;

    let resultadoHTML = `<h2>Plan de Ahorro para ${nombre}</h2>`;
    resultadoHTML += `
        <table>
            <tr>
                <th>Año</th>
                <th>Ahorro Anual Estimado</th>
                <th>Ahorro Mensual</th>
            </tr>
    `;

    for (let i = 0; i < aniosHasta18; i++) {
        let anio = anioActual + i;
        resultadoHTML += `
            <tr>
                <td>${anio}</td>
                <td>$${formatNumber(ahorroAnual.toFixed(2))}</td>
                <td>$${formatNumber(ahorroMensual.toFixed(2))}</td>
            </tr>
        `;
    }

    resultadoHTML += `
        </table>
        <h3>Total a Ahorrar Anualmente: $${formatNumber(ahorroAnual.toFixed(2))}</h3>
        <h3>Total a Ahorrar Mensualmente: $${formatNumber(ahorroMensual.toFixed(2))}</h3>
        <h3>Monto Final Ahorrado: $${formatNumber(costoFuturo.toFixed(2))}</h3>
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