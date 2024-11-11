//equipos
const equipos = [
    { nombre: 'San Martin (T)' }, // 0
    { nombre: 'San Martin (SJ)' }, // 1
    { nombre: 'Quilmes' }, // 2
    { nombre: 'All Boys' }, // 3
    { nombre: 'Gimnasia (J)' }, // 4
    { nombre: 'Estudiantes (BA)' }, // 5
    { nombre: 'Racing (C)' },   // 6
    { nombre: 'San Miguel' },   // 7
    { nombre: 'Aldosivi' }, // 8
    { nombre: 'Dep. Madryn' },  // 9
    { nombre: 'Nueva Chicago' },    // 10
    { nombre: 'Gimnasia (M)' }, // 11
    { nombre: 'San Telmo' },    // 12
    { nombre: 'Colon' },    // 13
    { nombre: 'Def. de Belgrano' }, // 14
    { nombre: 'Gimnasia (S)' }  // 15
]

// Datos de equipos de la Zona A
const equiposZonaA = [
    { nombre: 'San Martin (T)', puntos: 81, posicion: 1 },
    { nombre: 'San Martin (SJ)', puntos: 70, posicion: 2 },
    { nombre: 'Quilmes', puntos: 60, posicion: 3 },
    { nombre: 'All Boys', puntos: 58, posicion: 4 },
    { nombre: 'Gimnasia (J)', puntos: 58, posicion: 5 },
    { nombre: 'Estudiantes (BA)', puntos: 56, posicion: 6 },
    { nombre: 'Racing (C)', puntos: 53, posicion: 7 },
    { nombre: 'San Miguel', puntos: 53, posicion: 8 }
];

// Datos de equipos de la Zona B
const equiposZonaB = [
    { nombre: 'Aldosivi', puntos: 64, posicion: 1 },
    { nombre: 'Dep. Madryn', puntos: 64, posicion: 2 },
    { nombre: 'Nueva Chicago', puntos: 64, posicion: 3 },
    { nombre: 'Gimnasia (M)', puntos: 63, posicion: 4 },
    { nombre: 'San Telmo', puntos: 62, posicion: 5 },
    { nombre: 'Colon', puntos: 58, posicion: 6 },
    { nombre: 'Def. de Belgrano', puntos: 58, posicion: 7 },
    { nombre: 'Gimnasia (S)', puntos: 58, posicion: 8 }
];

let partidoFinalAscenso = {
    local: equiposZonaA[0],
    visitante: equiposZonaB[0],
    resultado: { local: 0, visitante: 2 }
};
// Lista de resultados de la primera fase
let resultadosPrimeraFase = [
    {nombre: 'San Martin (SJ)', resultado: { local: 2, visitante: 1 }},
    {nombre: 'Quilmes', resultado: { local: 2, visitante: 0 }},
    {nombre: 'All Boys', resultado: {local: 1, visitante: 1}},
    {nombre: 'San Telmo', resultado: { local: 1, visitante: 0 }},
    {nombre: 'Gimnasia (M)', resultado: { local: 1, visitante: 1 }},
    {nombre: 'Nueva Chicago', resultado: { local: 1, visitante: 1 }},
    {nombre: 'Dep. Madryn', resultado: { local: 0, visitante: 0 }}
];
let resultadosCuartos = [
    {nombre: 'San Martin (T)', resultadoIda: { local: 1, visitante: 2 }, resultadovuelta: { local: '', visitante: '' }},
    {nombre: 'San Martin (SJ)', resultadoIda: { local: 0, visitante: 1 }, resultadovuelta: { local: '', visitante: '' }},
    {nombre: 'Dep. Madryn', resultadoIda: { local: 3, visitante: 1 }, resultadovuelta: { local: '', visitante: '' }},
    {nombre: 'Nueva Chicago', resultadoIda: { local: 0, visitante: 0 }, resultadovuelta: { local: '', visitante: '' }}
];
let resultadosSemi = [
    {nombre: 'San Martin (T)', resultadoIda: { local: '', visitante: '' }, resultadovuelta: { local: '', visitante: '' }},
    {nombre: 'San Martin (SJ)', resultadoIda: { local: '', visitante: '' }, resultadovuelta: { local: '', visitante: '' }}
];

let partidosPrimeraFase = [];
let partidosCuartos = [];
let partidosSemifinales = [];
let equiposCuartos = [];
let equiposSemi = [];
let equiposfinal = [];

mostrarPartidoFinalAscenso();
// Inicializar todo al cargar la página
inicializarPartidosPrimeraFase();
//actualizar tabla octavos y calculo de partidos de cuartos

actualizarTablaYProximaFase(); // Llamamos a esta función para mostrar la tabla y los partidos


function mostrarPartidoFinalAscenso() {
    const contenedor = document.getElementById('final-match');
    contenedor.innerHTML = '';

    const tabla = document.createElement('table');
    const encabezado = document.createElement('tr');
    ['Local', 'Visitante', 'Resultado', 'Ingresar Resultado'].forEach(texto => {
        const th = document.createElement('th');
        th.textContent = texto;
        encabezado.appendChild(th);
    });
    tabla.appendChild(encabezado);

    const partido = partidoFinalAscenso;
    const fila = document.createElement('tr');

    const celdaLocal = document.createElement('td');
    celdaLocal.textContent = partido.local.nombre;

    const celdaVisitante = document.createElement('td');
    celdaVisitante.textContent = partido.visitante.nombre;

    const celdaResultado = document.createElement('td');
    if (partido.resultado) {
        celdaResultado.textContent = `${partido.resultado.local} - ${partido.resultado.visitante}`;
    } else {
        celdaResultado.textContent = 'Por jugar';
    }

    const celdaIngresar = document.createElement('td');
    const inputLocal = document.createElement('input');
    inputLocal.type = 'number';
    inputLocal.min = 0;
    inputLocal.value = partido.resultado ? partido.resultado.local : '';
    inputLocal.id = `local-final`;

    const inputVisitante = document.createElement('input');
    inputVisitante.type = 'number';
    inputVisitante.min = 0;
    inputVisitante.value = partido.resultado ? partido.resultado.visitante : '';
    inputVisitante.id = `visitante-final`;

    const botonGuardar = document.createElement('button');
    botonGuardar.textContent = 'Guardar';
    botonGuardar.onclick = () => guardarResultadoFinalAscenso();

    celdaIngresar.appendChild(inputLocal);
    celdaIngresar.appendChild(document.createTextNode(' - '));
    celdaIngresar.appendChild(inputVisitante);
    celdaIngresar.appendChild(botonGuardar);

    fila.appendChild(celdaLocal);
    fila.appendChild(celdaVisitante);
    fila.appendChild(celdaResultado);
    fila.appendChild(celdaIngresar);

    tabla.appendChild(fila);

    contenedor.appendChild(tabla);
}

function guardarResultadoFinalAscenso() {
    const marcadorLocal = document.getElementById(`local-final`).value;
    const marcadorVisitante = document.getElementById(`visitante-final`).value;

    if (marcadorLocal === '' || marcadorVisitante === '') {
        alert('Por favor, ingrese ambos marcadores.');
        return;
    }

    partidoFinalAscenso.resultado = {
        local: parseInt(marcadorLocal),
        visitante: parseInt(marcadorVisitante)
    };

    actualizarTablaYProximaFase();
}
// Función para inicializar los partidos de la primera fase
function inicializarPartidosPrimeraFase() {
    partidosPrimeraFase = [
        // 2do de Zona A vs 8vo de Zona B
        { local: equiposZonaA[1], visitante: equiposZonaB[7], resultado: null }, // San Martin (SJ) vs Gimnasia (S)
        
        // 3ro de Zona A vs 7mo de Zona B
        { local: equiposZonaA[2], visitante: equiposZonaB[6], resultado: null }, // Quilmes vs Def. de Belgrano
        
        // 4to de Zona A vs 6to de Zona B
        { local: equiposZonaA[3], visitante: equiposZonaB[5], resultado: null }, // All Boys vs Colon
        
        // 5to de Zona B vs 5to de Zona A (San Telmo tiene más puntos)
        { local: equiposZonaB[4], visitante: equiposZonaA[4], resultado: null }, // San Telmo vs Gimnasia (J)
        
        // 6to de Zona A vs 4to de Zona B (Gimnasia (M) es local por mejor posición)
        { local: equiposZonaB[3], visitante: equiposZonaA[5], resultado: null }, // Gimnasia (M) vs Estudiantes (BA)
        
        // 7mo de Zona A vs 3ro de Zona B (Nueva Chicago es local por mejor posición)
        { local: equiposZonaB[2], visitante: equiposZonaA[6], resultado: null }, // Nueva Chicago vs Racing (C)
        
        // 8vo de Zona A vs 2do de Zona B (Dep. Madryn es local por mejor posición)
        { local: equiposZonaB[1], visitante: equiposZonaA[7], resultado: null }  // Dep. Madryn vs San Miguel
    ];

    // Actualizar los resultados ya conocidos
    // Necesitamos identificar cuáles son esos partidos y asignarles el resultado correspondiente
    resultadosPrimeraFase.forEach(resultado => {
        if (resultado.resultado.local !== undefined && resultado.resultado.visitante !== undefined) {
            const partido = partidosPrimeraFase.find(p => p.local.nombre === resultado.nombre);
            if (partido) {
                partido.resultado = resultado.resultado;
            }
        }
    });
    
}

// Función para mostrar los partidos de la primera fase
function mostrarPartidosPrimeraFase() {
    const contenedor = document.getElementById('first-phase-matches');
    contenedor.innerHTML = '';

    const tabla = document.createElement('table');
    const encabezado = document.createElement('tr');
    ['Local', 'Visitante', 'Resultado', 'Ingresar Resultado'].forEach(texto => {
        const th = document.createElement('th');
        th.textContent = texto;
        encabezado.appendChild(th);
    });
    tabla.appendChild(encabezado);

    partidosPrimeraFase.forEach((partido, index) => {
        const fila = document.createElement('tr');

        const celdaLocal = document.createElement('td');
        celdaLocal.textContent = partido.local.nombre;

        const celdaVisitante = document.createElement('td');
        celdaVisitante.textContent = partido.visitante.nombre;

        const celdaResultado = document.createElement('td');
        if (partido.resultado) {
            celdaResultado.textContent = `${partido.resultado.local} - ${partido.resultado.visitante}`;
        } else {
            celdaResultado.textContent = 'Por jugar';
        }

        const celdaIngresar = document.createElement('td');

        const inputLocal = document.createElement('input');
        inputLocal.type = 'number';
        inputLocal.min = 0;
        inputLocal.value = partido.resultado ? partido.resultado.local : '';
        inputLocal.id = `local-${index}`;

        const inputVisitante = document.createElement('input');
        inputVisitante.type = 'number';
        inputVisitante.min = 0;
        inputVisitante.value = partido.resultado ? partido.resultado.visitante : '';
        inputVisitante.id = `visitante-${index}`;

        const botonGuardar = document.createElement('button');
        botonGuardar.textContent = 'Guardar';
        botonGuardar.onclick = () => guardarResultado(index);

        celdaIngresar.appendChild(inputLocal);
        celdaIngresar.appendChild(document.createTextNode(' - '));
        celdaIngresar.appendChild(inputVisitante);
        celdaIngresar.appendChild(botonGuardar);

        fila.appendChild(celdaLocal);
        fila.appendChild(celdaVisitante);
        fila.appendChild(celdaResultado);
        fila.appendChild(celdaIngresar);

        tabla.appendChild(fila);
    });

    contenedor.appendChild(tabla);
}

// Función para guardar el resultado de un partido ingresado por el usuario
function guardarResultado(index) {
    const marcadorLocal = document.getElementById(`local-${index}`).value;
    const marcadorVisitante = document.getElementById(`visitante-${index}`).value;

    if (marcadorLocal === '' || marcadorVisitante === '') {
        alert('Por favor, ingrese ambos marcadores.');
        return;
    }

    partidosPrimeraFase[index].resultado = {
        local: parseInt(marcadorLocal),
        visitante: parseInt(marcadorVisitante)
    };

    actualizarTablaYProximaFase();
}

function actualizarTablaYProximaFase() {

    // Actualizar las vistas de Primera Fase
    mostrarPartidosPrimeraFase();

    // Determinar el perdedor del partido por el primer ascenso
    let perdedorFinal;
    if (partidoFinalAscenso.resultado) {
        if (partidoFinalAscenso.resultado.local > partidoFinalAscenso.resultado.visitante) {
            perdedorFinal = partidoFinalAscenso.visitante;
        } else if (partidoFinalAscenso.resultado.local < partidoFinalAscenso.resultado.visitante) {
            perdedorFinal = partidoFinalAscenso.local;
        } else {
            perdedorFinal = partidoFinalAscenso.visitante; // Asumimos que el visitante pierde en caso de empate
        }
    } else {
        // Asumimos que el local ganó si no hay resultado
        perdedorFinal = partidoFinalAscenso.visitante;
    }
        
    // Obtener los equipos que avanzan a la siguiente fase
    equiposCuartos = partidosPrimeraFase.map(partido => {
        if (partido.resultado) {
            if (partido.resultado.local > partido.resultado.visitante) {
                return partido.local;
            } else if (partido.resultado.local < partido.resultado.visitante) {
                return partido.visitante;
            } else {
                return partido.local; // Avanza el local en caso de empate
            }
        } else {
            return partido.local; // Asumimos que gana el local si no hay resultado
        }
    });

    // Agregar el perdedor a los equipos que avanzan
    equiposCuartos.push(perdedorFinal);
    //console.log('Equipos que avanzan:', equiposAvanzanPrimeraFase); // Agrega este console.log

    ordenarEquipos(equiposCuartos);
    mostrarTablaParaCuartos(equiposCuartos);

    // Generar los partidos de Cuartos
    generarPartidosCuartos(equiposCuartos);
    // Actualizar los resultados ya conocidos
    // Necesitamos identificar cuáles son esos partidos de resultadosCuartos que tienen resultados de ida o de vuelta y asignarl el resultado a resultadosCuartos
    resultadosCuartos.forEach(enfrentamiento => {
        if (enfrentamiento.resultadoIda.local !== '' && enfrentamiento.resultadoIda.visitante !== '') {
            const partido = partidosCuartos.find(p => p.equipoLocal.nombre === enfrentamiento.nombre);
            if (partido) {
                partido.partidoIda.resultado = enfrentamiento.resultadoIda;
            }
        }
        if (enfrentamiento.resultadovuelta.local !== '' && enfrentamiento.resultadovuelta.visitante !== '') {
            const partido = partidosCuartos.find(p => p.equipoLocal.nombre === enfrentamiento.nombre);
            if (partido) {
                partido.partidoVuelta.resultado = enfrentamiento.resultadovuelta;
            }
        }
    });
    mostrarPartidosCuartos();
    calcularResultadoGlobalCuartos(null);
    equiposSemi = calcularEquiposQueAvanzan('semi');
    ordenarEquipos(equiposSemi);
    mostrarTablaActualizadaCuartos(equiposSemi);


    // Generar los partidos de las semifinales
    generarPartidosSemifinales(equiposSemi);
    mostrarSemifinales();
    mostrarPartidoFinalAscenso();
}

function ordenarEquipos(equipos) {
    return equipos.sort((a, b) => {
        if (a.posicion !== b.posicion) { // Si tienen distinta posición
            return a.posicion - b.posicion; // Ordenar por posición de menor a mayor
        }
        if (a.puntos !== b.puntos) { // Si tienen la misma posición pero distintos puntos
            return b.puntos - a.puntos; // Ordenar por puntos de mayor a menor
        }
        return b.diferencia - a.diferencia; // Ordenar por diferencia de mayor a menor
    });
}

function calcularEquiposQueAvanzan(fase) {

    let partidos = [];
    if (fase === 'semi') {
        partidos = partidosCuartos;
    } else if (fase === 'final') {
        partidos = partidosSemifinales;
    }

    console.log('obtenerEquiposQueAvanzan:', partidos);

    return partidos.map(partido => {
        if (partido.ganador) {
            return partido.ganador;
        } else {
            return null;
        }
    });

}

function calcularResultadoGlobalCuartos(index) {
    
    //obtener lista de indices de los partidos de cuartos
    const partidos = partidosCuartos;

    //si index no es nulo descartar de la lista los que no coinciden con ese index
    if (index !== null) {
        partidos = partidos.filter((partido, i) => i === index);
    }

    console.log('calcularResultadoGlobalCuartos partidos:', partidos);
    //recorrer la lista de partidos
    partidos.forEach((partido, index) => {

        // Obtener los resultados de ida y vuelta
        const resultadoIda = partido.partidoIda.resultado;
        const resultadoVuelta = partido.partidoVuelta.resultado;

        console.log('Resultado Ida:', resultadoIda);
        console.log('Resultado Vuelta:', resultadoVuelta);
        // Si falta algún resultado, asignar al local del partido de vuelta como ganador provisional
        // if (!resultadoIda || !resultadoVuelta) {
        //     partido.ganador = partido.partidoVuelta.local;
        //     return;
        // }

        // Asumir empate en cada partido sin resultado
        const resultadoRealIda = resultadoIda || { local: 0, visitante: 0 };
        const resultadoRealVuelta = resultadoVuelta || { local: 0, visitante: 0 };

        // Determinar los ganadores de cada partido
        const ganadorIda = resultadoRealIda.local > resultadoRealIda.visitante ? partido.partidoIda.local :
                           resultadoRealIda.local < resultadoRealIda.visitante ? partido.partidoIda.visitante : null;
        
        const ganadorVuelta = resultadoRealVuelta.local > resultadoRealVuelta.visitante ? partido.partidoVuelta.local :
                              resultadoRealVuelta.local < resultadoRealVuelta.visitante ? partido.partidoVuelta.visitante : null;

        // Criterio 1: Verificar si un equipo ganó ambos partidos o ganó uno y empató el otro
        if (ganadorIda && ganadorIda === ganadorVuelta) {
            partido.ganador = ganadorIda; // Mismo ganador en ambos partidos
        } else if (ganadorIda && !ganadorVuelta) {
            partido.ganador = ganadorIda; // Ganador en el partido de ida, empate en el partido de vuelta
        } else if (ganadorVuelta && !ganadorIda) {
            partido.ganador = ganadorVuelta; // Ganador en el partido de vuelta, empate en el partido de ida
        } else {
            // Criterio 2: Si no hay un ganador directo, evaluar la diferencia de gol
            const golesLocal = resultadoRealIda.local + resultadoRealVuelta.visitante;
            const golesVisitante = resultadoRealIda.visitante + resultadoRealVuelta.local;

            if (golesLocal > golesVisitante) {
                partido.ganador = partido.partidoIda.local;
            } else if (golesVisitante > golesLocal) {
                partido.ganador = partido.partidoIda.visitante;
            } else {
                // Criterio 3: En caso de empate total, gana el local en el partido de vuelta
                partido.ganador = partido.partidoVuelta.local;
            }
        }

        // Sincronizar el ganador con `partidosCuartos` para el índice adecuado
        if (index !== null) {
            partidosCuartos[index].ganador = partido.ganador;
        } else {
            partidosCuartos[i].ganador = partido.ganador;
        }
    });
    // Actualizar los equipos que avanzan a la siguiente fase
//    actualizarEquiposParaSiguienteFase();
}

// Función para generar los partidos de la próxima fase
function generarPartidosCuartos(equipos) {
    //partidosCuartos = [];
    // Hacemos una copia del arreglo para no modificar el original
    const equiposCopy = equipos.slice(); // O también puedes usar [...equipos]
    
    // Emparejar el 1ro con el último, 2do con el penúltimo, etc.
    while (equiposCopy.length > 1) {
        const local = equiposCopy.shift(); // Saca el primer equipo (mejor ubicado)
        const visitante = equiposCopy.pop(); // Saca el último equipo (peor ubicado)
            // Cada cruce tiene dos partidos
        partidosCuartos.push({
            equipoLocal: local,
            equipoVisitante: visitante,
            partidoIda: { local: visitante, visitante: local, resultado: null },
            partidoVuelta: { local: local, visitante: visitante, resultado: null }
        });
    }
}

// Función para mostrar la tabla actualizada
function mostrarTablaParaCuartos(equiposAvanzan) {
    const contenedor = document.getElementById('updated-standings');
    contenedor.innerHTML = '';

    //console.log('Equipos que avanzan:', equiposAvanzan);

    const tabla = document.createElement('table');
    const encabezado = document.createElement('tr');
    ['Posición', 'Equipo', 'Posición Original', 'Puntos'].forEach(texto => {
        const th = document.createElement('th');
        th.textContent = texto;
        encabezado.appendChild(th);
    });
    tabla.appendChild(encabezado);

    equiposAvanzan.forEach((equipo, index) => {
        const fila = document.createElement('tr');

        const celdaPosicion = document.createElement('td');
        celdaPosicion.textContent = index + 1;

        const celdaEquipo = document.createElement('td');
        celdaEquipo.textContent = equipo.nombre;

        const celdaPosicionOriginal = document.createElement('td');
        celdaPosicionOriginal.textContent = equipo.posicion;

        const celdaPuntos = document.createElement('td');
        celdaPuntos.textContent = equipo.puntos;

        fila.appendChild(celdaPosicion);
        fila.appendChild(celdaEquipo);
        fila.appendChild(celdaPosicionOriginal);
        fila.appendChild(celdaPuntos);

        tabla.appendChild(fila);
    });

    contenedor.appendChild(tabla);
}

// Función para mostrar los partidos de la próxima fase (ida y vuelta)
function mostrarPartidosCuartos() {
    const contenedor = document.getElementById('next-phase-matches');
    contenedor.innerHTML = '';

    if (partidosCuartos.length === 0) {
        contenedor.textContent = 'No hay partidos programados para la próxima fase aún.';
        return;
    }

    const tabla = document.createElement('table');
    const encabezado = document.createElement('tr');
    ['Día', 'Local', 'Visitante', 'Resultado', 'Ingresar Resultado'].forEach(texto => {
        const th = document.createElement('th');
        th.textContent = texto;
        encabezado.appendChild(th);
    });
    tabla.appendChild(encabezado);

    partidosCuartos.forEach((partido, index) => {
        // Partidos de Ida
        const filaIda = document.createElement('tr');
        filaIda.classList.add('partido-ida'); // Clase para personalizar estilos

        const celdaDiaIda = document.createElement('td');
        celdaDiaIda.textContent = 'Ida'; // Marcar el partido como "Ida"

        const celdaLocalIda = document.createElement('td');
        celdaLocalIda.textContent = partido.partidoIda.local.nombre;

        const celdaVisitanteIda = document.createElement('td');
        celdaVisitanteIda.textContent = partido.partidoIda.visitante.nombre;

        const celdaResultadoIda = document.createElement('td');
        celdaResultadoIda.textContent = partido.partidoIda.resultado
            ? `${partido.partidoIda.resultado.local} - ${partido.partidoIda.resultado.visitante}`
            : 'Por jugar';

        const celdaIngresarIda = document.createElement('td');
        const inputLocalIda = document.createElement('input');
        inputLocalIda.type = 'number';
        inputLocalIda.min = 0;
        inputLocalIda.value = partido.partidoIda.resultado ? partido.partidoIda.resultado.local : '';
        inputLocalIda.id = `cuartos-ida-local-${index}`;

        const inputVisitanteIda = document.createElement('input');
        inputVisitanteIda.type = 'number';
        inputVisitanteIda.min = 0;
        inputVisitanteIda.value = partido.partidoIda.resultado ? partido.partidoIda.resultado.visitante : '';
        inputVisitanteIda.id = `cuartos-ida-visitante-${index}`;

        const botonGuardarIda = document.createElement('button');
        botonGuardarIda.textContent = 'Guardar';
        botonGuardarIda.onclick = () => guardarResultadoIdaYVuelta('cuartos', 'ida', index);

        celdaIngresarIda.appendChild(inputLocalIda);
        celdaIngresarIda.appendChild(document.createTextNode(' - '));
        celdaIngresarIda.appendChild(inputVisitanteIda);
        celdaIngresarIda.appendChild(botonGuardarIda);
        filaIda.appendChild(celdaDiaIda);
        filaIda.appendChild(celdaLocalIda);
        filaIda.appendChild(celdaVisitanteIda);
        filaIda.appendChild(celdaResultadoIda);
        filaIda.appendChild(celdaIngresarIda);
        tabla.appendChild(filaIda);

        // Partidos de Vuelta
        const filaVuelta = document.createElement('tr');
        filaVuelta.classList.add('partido-vuelta'); // Clase para personalizar estilos

        const celdaDiaVuelta = document.createElement('td');
        celdaDiaVuelta.textContent = 'Vuelta'; // Marcar el partido como "Vuelta"

        const celdaLocalVuelta = document.createElement('td');
        celdaLocalVuelta.textContent = partido.partidoVuelta.local.nombre;

        const celdaVisitanteVuelta = document.createElement('td');
        celdaVisitanteVuelta.textContent = partido.partidoVuelta.visitante.nombre;

        const celdaResultadoVuelta = document.createElement('td');
        celdaResultadoVuelta.textContent = partido.partidoVuelta.resultado
            ? `${partido.partidoVuelta.resultado.local} - ${partido.partidoVuelta.resultado.visitante}`
            : 'Por jugar';

        const celdaIngresarVuelta = document.createElement('td');

        const inputLocalVuelta = document.createElement('input');
        inputLocalVuelta.type = 'number';
        inputLocalVuelta.min = 0;
        inputLocalVuelta.value = partido.partidoVuelta.resultado ? partido.partidoVuelta.resultado.local : '';
        inputLocalVuelta.id = `cuartos-vuelta-local-${index}`;

        const inputVisitanteVuelta = document.createElement('input');
        inputVisitanteVuelta.type = 'number';
        inputVisitanteVuelta.min = 0;
        inputVisitanteVuelta.value = partido.partidoVuelta.resultado ? partido.partidoVuelta.resultado.visitante : '';
        inputVisitanteVuelta.id = `cuartos-vuelta-visitante-${index}`;

        const botonGuardarVuelta = document.createElement('button');
        botonGuardarVuelta.textContent = 'Guardar';
        botonGuardarVuelta.onclick = () => guardarResultadoIdaYVuelta('cuartos', 'vuelta', index);

        celdaIngresarVuelta.appendChild(inputLocalVuelta);
        celdaIngresarVuelta.appendChild(document.createTextNode(' - '));
        celdaIngresarVuelta.appendChild(inputVisitanteVuelta);
        celdaIngresarVuelta.appendChild(botonGuardarVuelta);

        filaVuelta.appendChild(celdaDiaVuelta);
        filaVuelta.appendChild(celdaLocalVuelta);
        filaVuelta.appendChild(celdaVisitanteVuelta);
        filaVuelta.appendChild(celdaResultadoVuelta);
        filaVuelta.appendChild(celdaIngresarVuelta);
        tabla.appendChild(filaVuelta);

       
        // Fila vacía para separar los enfrentamientos
        const filaSeparadora = document.createElement('tr');
        filaSeparadora.classList.add('separador-enfrentamientos');
        const celdaSeparadora = document.createElement('td');
        celdaSeparadora.colSpan = 5; // Ocupa todas las columnas
        celdaSeparadora.innerHTML = '<hr>'; // Línea de separación
        filaSeparadora.appendChild(celdaSeparadora);
        tabla.appendChild(filaSeparadora);
    });

    contenedor.appendChild(tabla);
}

function guardarResultadoIdaYVuelta(fase, idaOVuelta, index) {
    const marcadorLocal = document.getElementById(`${fase}-${idaOVuelta}-local-${index}`).value;
    const marcadorVisitante = document.getElementById(`${fase}-${idaOVuelta}-visitante-${index}`).value;

    if (marcadorLocal === '' || marcadorVisitante === '') {
        alert('Por favor, ingrese ambos marcadores de ida.');
        return;
    }

    if ('ida' === idaOVuelta) {
        partidosCuartos[index].partidoIda.resultado = {
            local: parseInt(marcadorLocal),
            visitante: parseInt(marcadorVisitante)
        };
    } else {
        partidosCuartos[index].partidoVuelta.resultado = {
            local: parseInt(marcadorLocal),
            visitante: parseInt(marcadorVisitante)
        };
    }

    mostrarPartidosCuartos();
    calcularResultadoGlobalCuartos(null);
    console.log('Partidos de Cuartos:', partidosCuartos);
    equiposSemi = calcularEquiposQueAvanzan('semi');
    console.log('Equipos que avanzan a Semifinales:', equiposSemi);
    ordenarEquipos(equiposSemi);
    mostrarTablaActualizadaCuartos(equiposSemi);


    // Generar los partidos de las semifinales
    generarPartidosSemifinales(equiposSemi);
    mostrarSemifinales();
    mostrarPartidoFinalAscenso();
}





































// Función para generar los partidos de las semifinales
function generarPartidosSemifinales(equipos) {
    partidosSemifinales = [];
    // Hacemos una copia del arreglo para no modificar el original
    const equiposCopy = equipos.slice(); // O también puedes usar [...equipos]
    
    // Emparejar el 1ro con el último, 2do con el penúltimo, etc.
    while (equiposCopy.length > 1) {
        const local = equiposCopy.shift(); // Saca el primer equipo (mejor ubicado)
        const visitante = equiposCopy.pop(); // Saca el último equipo (peor ubicado)
        partidosSemifinales.push({ local, visitante, resultado: null });
    }
}

// Función para mostrar la tabla actualizada de cuartos
function mostrarTablaActualizadaCuartos(equiposAvanzan) {
    const contenedor = document.getElementById('updated-standings-quarters');
    contenedor.innerHTML = '';

    const tabla = document.createElement('table');
    const encabezado = document.createElement('tr');
    ['Posición', 'Equipo', 'Posición Original', 'Puntos'].forEach(texto => {
        const th = document.createElement('th');
        th.textContent = texto;
        encabezado.appendChild(th);
    });
    tabla.appendChild(encabezado);

    equiposAvanzan.forEach((equipo, index) => {
        if (!equipo) return; // Ignora equipos undefined
        const fila = document.createElement('tr');

        const celdaPosicion = document.createElement('td');
        celdaPosicion.textContent = index + 1;

        const celdaEquipo = document.createElement('td');
        celdaEquipo.textContent = equipo.nombre || "Equipo sin nombre";

        const celdaPosicionOriginal = document.createElement('td');
        celdaPosicionOriginal.textContent = equipo.posicion || "Sin posición";

        const celdaPuntos = document.createElement('td');
        celdaPuntos.textContent = equipo.puntos || "Sin puntos";

        fila.appendChild(celdaPosicion);
        fila.appendChild(celdaEquipo);
        fila.appendChild(celdaPosicionOriginal);
        fila.appendChild(celdaPuntos);

        tabla.appendChild(fila);
    });

    contenedor.appendChild(tabla);
}


// Función para mostrar los partidos de las semifinales
function mostrarSemifinales() {
    const contenedor = document.getElementById('semifinal-matches');
    contenedor.innerHTML = '';

    if (partidosSemifinales.length === 0) {
        contenedor.textContent = 'No hay partidos programados para las semifinales aún.';
        return;
    }

    const tabla = document.createElement('table');
    const encabezado = document.createElement('tr');
    ['Local', 'Visitante', 'Resultado', 'Ingresar Resultado'].forEach(texto => {
        const th = document.createElement('th');
        th.textContent = texto;
        encabezado.appendChild(th);
    });
    tabla.appendChild(encabezado);

    partidosSemifinales.forEach((partido, index) => {
        if (!partido.local || !partido.visitante) return; // Ignorar partidos incompletos
        const fila = document.createElement('tr');

        const celdaLocal = document.createElement('td');
        celdaLocal.textContent = partido.local.nombre;

        const celdaVisitante = document.createElement('td');
        celdaVisitante.textContent = partido.visitante.nombre;

        const celdaResultado = document.createElement('td');
        if (partido.resultado) {
            celdaResultado.textContent = `${partido.resultado.local} - ${partido.resultado.visitante}`;
        } else {
            celdaResultado.textContent = 'Por jugar';
        }

        const celdaIngresar = document.createElement('td');
        const inputLocal = document.createElement('input');
        inputLocal.type = 'number';
        inputLocal.min = 0;
        inputLocal.value = partido.resultado ? partido.resultado.local : '';
        inputLocal.id = `local-semi-${index}`;

        const inputVisitante = document.createElement('input');
        inputVisitante.type = 'number';
        inputVisitante.min = 0;
        inputVisitante.value = partido.resultado ? partido.resultado.visitante : '';
        inputVisitante.id = `visitante-semi-${index}`;

        const botonGuardar = document.createElement('button');
        botonGuardar.textContent = 'Guardar';
        botonGuardar.onclick = () => guardarResultadoSemifinal(index);

        celdaIngresar.appendChild(inputLocal);
        celdaIngresar.appendChild(document.createTextNode(' - '));
        celdaIngresar.appendChild(inputVisitante);
        celdaIngresar.appendChild(botonGuardar);


        fila.appendChild(celdaLocal);
        fila.appendChild(celdaVisitante);
        fila.appendChild(celdaResultado);
        fila.appendChild(celdaIngresar);

        tabla.appendChild(fila);
    });

    contenedor.appendChild(tabla);
}

// Función para guardar el resultado de un partido de las semifinales
function guardarResultadoSemifinal(index) {
    const marcadorLocal = document.getElementById(`local-semi-${index}`).value;
    const marcadorVisitante = document.getElementById(`visitante-semi-${index}`).value;

    if (marcadorLocal === '' || marcadorVisitante === '') {
        alert('Por favor, ingrese ambos marcadores.');
        return;
    }

    partidosSemifinales[index].resultado = {
        local: parseInt(marcadorLocal),
        visitante: parseInt(marcadorVisitante)
    };

    // Si deseas, puedes implementar la actualización para fases posteriores
    // actualizarTablaYProximaFase(); // Si hay más fases
    mostrarSemifinales(); // Actualizamos la vista
}



function calcularResultadoGlobal(index) {
    const partido = partidosCuartos[index];

    // Obtener los resultados de ida y vuelta
    const resultadoIda = partido.partidoIda.resultado;
    const resultadoVuelta = partido.partidoVuelta.resultado;

    console.log('Resultado Ida:', resultadoIda);
    console.log('Resultado Vuelta:', resultadoVuelta);
    // Si falta algún resultado, asignar al local del partido de vuelta como ganador provisional
    if (!resultadoIda || !resultadoVuelta) {
        partido.ganador = partido.partidoVuelta.local;
        return;
    }

    // Determinar los ganadores de cada partido
    const ganadorIda = resultadoIda.local > resultadoIda.visitante ? partido.partidoIda.local :
                      resultadoIda.local < resultadoIda.visitante ? partido.partidoIda.visitante : null;
    const ganadorVuelta = resultadoVuelta.local > resultadoVuelta.visitante ? partido.partidoVuelta.local :
                          resultadoVuelta.local < resultadoVuelta.visitante ? partido.partidoVuelta.visitante : null;

    // Criterio 1: Verificar si un equipo ganó ambos partidos o ganó uno y empató el otro
    if (ganadorIda && ganadorIda === ganadorVuelta) {
        partido.ganador = ganadorIda; // Mismo ganador en ambos partidos
    } else if (ganadorIda && !ganadorVuelta) {
        partido.ganador = ganadorIda; // Ganador en el partido de ida, empate en el partido de vuelta
    } else if (ganadorVuelta && !ganadorIda) {
        partido.ganador = ganadorVuelta; // Ganador en el partido de vuelta, empate en el partido de ida
    } else {
        // Criterio 2: Si no hay un ganador directo, evaluar la diferencia de gol
        const golesLocal = resultadoIda.local + resultadoVuelta.visitante;
        const golesVisitante = resultadoIda.visitante + resultadoVuelta.local;

        if (golesLocal > golesVisitante) {
            partido.ganador = partido.partidoIda.local;
        } else if (golesVisitante > golesLocal) {
            partido.ganador = partido.partidoIda.visitante;
        } else {
            // Criterio 3: En caso de empate total, gana el local en el partido de vuelta
            partido.ganador = partido.partidoVuelta.local;
        }
    }

    // Actualizar los equipos que avanzan a la siguiente fase
    actualizarEquiposParaSiguienteFase();
}


function actualizarEquiposParaSiguienteFase() {
    equiposSemi = partidosCuartos;
//        .filter(partido => partido.ganador) // Solo incluir partidos con ganador definido
//        .map(partido => partido.ganador)
//        .filter(equipo => equipo); // Filtrar cualquier valor `undefined` que quede
    
    ordenarEquipos(equiposSemi);
    mostrarTablaActualizadaCuartos(equiposSemi);
    generarPartidosSemifinales(equiposSemi);
    mostrarSemifinales();
}

