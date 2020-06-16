function calculaTiempo(){
        borrarFilas()
        var e = document.getElementById("portal");
        var portal = e.options[e.selectedIndex].value;
        e = document.getElementById("piso");
        var piso = e.options[e.selectedIndex].value;

        // 4 5 y 6 12 vecinos por portal
        // 2 y el 7 tienen atico A pero no atico B

        var propietarios = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            [1, 2, 3, 4, 5, 6, 7, 8, 11, 12],
            [1, 2, 3, 4, 5, 6, 7, 8, 11, 12],
            [1, 2, 3, 4, 5, 6, 7, 8, 11, 12],
            [1, 2, 3, 4, 5, 6, 7, 8, 11, 12]
        ];
        // datos de 2020
        var añoActual = 2020
        var portalPresidente = 10;
        var portalVicePresidente = 1;

        // TODO: se debe hacer una conversión del option de entrada a la matriz de propietarios
        var vocales = [
        11,    // portal 1
        5,     // portal 2
        7,     // portal 3  (desconocido, de momento)
        7,     // portal 4  (desconocido, de momento)
        9,     // portal 5
        7,     // portal 6  (desconocido, de momento)
        7,     // portal 7  (desconocido, de momento)
        7,     // portal 8  (desconocido, de momento)
        3,     // portal 9  (desconocido, de momento)
        1,     // portal 10 (desconocido, de momento)
        3      // portal 11  (desconocido, de momento)
        ]
        var filas = []
        for (var i = añoActual; i < 2140; i++) {
            if (vocales[portal-1] == propietarios[portal-1][piso-1]) {
                if (portalPresidente == (portal)) {
                    filas.push({"año": i, "rango": "president@"});
                }
                else if (portalVicePresidente == (portal)) {
                    filas.push({"año": i, "rango": "vicepresident@"});
                }
                else {
                    filas.push({"año": i, "rango": "vocal"});
                }
            }
            // Actualizamos +1 a los portales de presi y vicepresi
            portalPresidente = (portalPresidente % 11) + 1;
            portalVicePresidente = (portalVicePresidente % 11) + 1;
            for (var p = 0; p < vocales.length; p++) {
                var vocalActual = vocales[p];
                if (propietarios[p].length > vocalActual) {
                    // actualizamos el vocal
                    vocales[p] = propietarios[p][vocalActual];
                }
                else {
                    // volvemos a empezar por el principio
                    vocales[p] = propietarios[p][0];
                }
            }

        }
        console.log(filas)
        var t = "";
        for (var i = 0; i < filas.length; i++){
              var tr = "<tr class='toRemove'>";
              tr += "<td>"+filas[i].año+"</td>";
              tr += "<td>"+filas[i].rango+"</td>";
              tr += "</tr>";
              t += tr;
        }
        document.getElementById("puestos").insertAdjacentHTML( 'beforeend', t )
}
function borrarFilas() {
    const elements = document.getElementsByClassName("toRemove");

    while (elements.length > 0) elements[0].remove();
}