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

// Lista de partidos de la primera fase
let partidosPrimeraFase = [];

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
    // Suponiendo que Quilmes, San Telmo y Gimnasia (M) ganaron
    // Necesitamos identificar cuáles son esos partidos y asignarles el resultado correspondiente
    partidosPrimeraFase.forEach(partido => {
        if (partido.local.nombre === 'Quilmes') {
            partido.resultado = { local: 2, visitante: 0 }; // Quilmes ganó
        } else if (partido.local.nombre === 'San Telmo') {
            partido.resultado = { local: 1, visitante: 0 }; // San Telmo ganó de visitante
        } else if (partido.local.nombre === 'Gimnasia (M)') {
            partido.resultado = { local: 1, visitante: 1 }; // Gimnasia (M) ganó de visitante
        } else if (partido.local.nombre === 'Nueva Chicago') {
        partido.resultado = { local: 1, visitante: 1 }; // Gimnasia (M) ganó de visitante
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
        //if (!partido.resultado) {
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
       /* } else {
            celdaIngresar.textContent = 'Resultado guardado';
        }*/

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
    // Obtener los equipos que avanzan a la siguiente fase
    let equiposAvanzan = partidosPrimeraFase.map(partido => {
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

    // Agregar el perdedor a los equipos que avanzan
    equiposAvanzan.push(perdedorFinal);
    console.log('Equipos que avanzan:', equiposAvanzan); // Agrega este console.log

    // Ordenar los equipos que avanzan según su posición en la fase regular
    equiposAvanzan.sort((a, b) => {
        if (a.posicion !== b.posicion) {
            return a.posicion - b.posicion; // El que tiene mejor posición (número menor) va primero
        } else {
            return b.puntos - a.puntos; // Si están en la misma posición, el que tiene más puntos va primero
        }
    });

    // Generar los partidos de la próxima fase
    generarPartidosProximaFase(equiposAvanzan);

    // Actualizar las vistas
    mostrarPartidosPrimeraFase();
    mostrarTablaActualizada(equiposAvanzan);
    mostrarProximaFase();
    mostrarPartidoFinalAscenso();
}


// Lista de partidos de la próxima fase
let partidosProximaFase = [];

// Función para generar los partidos de la próxima fase
function generarPartidosProximaFase(equipos) {
    partidosProximaFase = [];
    // Hacemos una copia del arreglo para no modificar el original
    const equiposCopy = equipos.slice(); // O también puedes usar [...equipos]
    
    // Emparejar el 1ro con el último, 2do con el penúltimo, etc.
    while (equiposCopy.length > 1) {
        const local = equiposCopy.shift(); // Saca el primer equipo (mejor ubicado)
        const visitante = equiposCopy.pop(); // Saca el último equipo (peor ubicado)
        partidosProximaFase.push({ local, visitante, resultado: null });
    }
}


// Función para mostrar la tabla actualizada
function mostrarTablaActualizada(equiposAvanzan) {
    const contenedor = document.getElementById('updated-standings');
    contenedor.innerHTML = '';

    console.log('Equipos que avanzan:', equiposAvanzan);

    const tabla = document.createElement('table');
    const encabezado = document.createElement('tr');
    ['Posición', 'Equipo', 'Puntos'].forEach(texto => {
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

        const celdaPuntos = document.createElement('td');
        celdaPuntos.textContent = equipo.puntos;

        fila.appendChild(celdaPosicion);
        fila.appendChild(celdaEquipo);
        fila.appendChild(celdaPuntos);

        tabla.appendChild(fila);
    });

    contenedor.appendChild(tabla);
}

// Función para mostrar los partidos de la próxima fase
function mostrarProximaFase() {
    const contenedor = document.getElementById('next-phase-matches');
    contenedor.innerHTML = '';

    if (partidosProximaFase.length === 0) {
        contenedor.textContent = 'No hay partidos programados para la próxima fase aún.';
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

    partidosProximaFase.forEach((partido, index) => {
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
        if (!partido.resultado) {
            const inputLocal = document.createElement('input');
            inputLocal.type = 'number';
            inputLocal.min = 0;
            inputLocal.id = `local-next-${index}`;

            const inputVisitante = document.createElement('input');
            inputVisitante.type = 'number';
            inputVisitante.min = 0;
            inputVisitante.id = `visitante-next-${index}`;

            const botonGuardar = document.createElement('button');
            botonGuardar.textContent = 'Guardar';
            botonGuardar.onclick = () => guardarResultadoProximaFase(index);

            celdaIngresar.appendChild(inputLocal);
            celdaIngresar.appendChild(document.createTextNode(' - '));
            celdaIngresar.appendChild(inputVisitante);
            celdaIngresar.appendChild(botonGuardar);
        } else {
            celdaIngresar.textContent = 'Resultado guardado';
        }

        fila.appendChild(celdaLocal);
        fila.appendChild(celdaVisitante);
        fila.appendChild(celdaResultado);
        fila.appendChild(celdaIngresar);

        tabla.appendChild(fila);
    });

    contenedor.appendChild(tabla);
}

// Función para guardar el resultado de un partido de la próxima fase
function guardarResultadoProximaFase(index) {
    const marcadorLocal = document.getElementById(`local-next-${index}`).value;
    const marcadorVisitante = document.getElementById(`visitante-next-${index}`).value;

    if (marcadorLocal === '' || marcadorVisitante === '') {
        alert('Por favor, ingrese ambos marcadores.');
        return;
    }

    partidosProximaFase[index].resultado = {
        local: parseInt(marcadorLocal),
        visitante: parseInt(marcadorVisitante)
    };

    // Si deseas, puedes implementar la actualización para fases posteriores
    // actualizarTablaYProximaFase(); // Si hay más fases
    mostrarProximaFase(); // Actualizamos la vista
}

// Lista de partidos de la final por el primer ascenso
let partidoFinalAscenso = null;

// Función para inicializar el partido por el primer ascenso
function inicializarPartidoFinalAscenso() {
    // Partido entre los primeros de cada zona
    const equipoLocal = equiposZonaA[0]; // San Martin (T)
    const equipoVisitante = equiposZonaB[0]; // Aldosivi

    partidoFinalAscenso = {
        local: equipoLocal,
        visitante: equipoVisitante,
        resultado: null
    };
}

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
    if (!partido.resultado) {
        const inputLocal = document.createElement('input');
        inputLocal.type = 'number';
        inputLocal.min = 0;
        inputLocal.id = `local-final`;

        const inputVisitante = document.createElement('input');
        inputVisitante.type = 'number';
        inputVisitante.min = 0;
        inputVisitante.id = `visitante-final`;

        const botonGuardar = document.createElement('button');
        botonGuardar.textContent = 'Guardar';
        botonGuardar.onclick = () => guardarResultadoFinalAscenso();

        celdaIngresar.appendChild(inputLocal);
        celdaIngresar.appendChild(document.createTextNode(' - '));
        celdaIngresar.appendChild(inputVisitante);
        celdaIngresar.appendChild(botonGuardar);
    } else {
        celdaIngresar.textContent = 'Resultado guardado';
    }

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


// Inicializar todo al cargar la página
inicializarPartidosPrimeraFase();
inicializarPartidoFinalAscenso();
mostrarPartidoFinalAscenso();
actualizarTablaYProximaFase(); // Llamamos a esta función para mostrar la tabla y los partidos