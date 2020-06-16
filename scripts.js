function calculaTiempo(){
        borrarFilas()
        var e = document.getElementById("portal");
        var portal = e.options[e.selectedIndex].value;
        e = document.getElementById("piso");
        var piso = e.options[e.selectedIndex].value;

        // 4 5 y 6 12 vecinos por portal
        // 2 y el 7 tienen atico A pero no atico B

        var propietarios = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],        // portal 1
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],        // portal 2
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],        // portal 3
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],    // portal 4
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],    // portal 5
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],        // portal 6
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],        // portal 7
            [1, 2, 3, 4, 5, 6, 7, 8, 11, 12],           // portal 8  VER ÑAPA ABAJO
            [1, 2, 3, 4, 5, 6, 7, 8, 11, 12],           // portal 9  VER ÑAPA ABAJO
            [1, 2, 3, 4, 5, 6, 7, 8, 11, 12],           // portal 10 VER ÑAPA ABAJO
            [1, 2, 3, 4, 5, 6, 7, 8, 11, 12]            // portal 11 VER ÑAPA ABAJO
        ];
        // TODO: se debe hacer una conversión del option de entrada a la matriz de propietarios  (conversión a hacer)
        // Hacemos una pequeña ÑAPA, para adaptarlo a los índices de la matriz de propietarios
        if (portal >= 8 && portal <= 11) {
            if (piso == 11) {
                piso = 9;
            }
            if (piso == 12) {
                piso = 10;
            }
        }
        // datos de 2020
        var añoActual = 2020
        var portalPresidente = 10;
        var portalVicePresidente = 1;
        var mesCargo = 'enero del '

        var vocales = [
        11,    // portal 1  AticoA (vicepresidente) -
        5,     // portal 2  3A -
        11,    // portal 3  AticoA -
        12,    // portal 4  AticoB -
        9,     // portal 5  5A -
        1,     // portal 6  1A -
        9,     // portal 7  5A -
        8,     // portal 8  4B -               ÑAPA TODO
        10,    // portal 9  AticoB -           ÑAPA TODO
        1,     // portal 10 1A (presidente) -  ÑAPA TODO
        8      // portal 11 4B                 ÑAPA TODO
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
              tr += "<td>"+mesCargo+filas[i].año+"</td>";
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