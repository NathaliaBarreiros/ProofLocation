pragma circom 2.1.6;

include "../node_modules/circomlib/circuits/comparators.circom";
include "../node_modules/circomlib/circuits/mux1.circom";
include "../node_modules/circomlib/circuits/gates.circom";
include "../node_modules/circomlib/circuits/bitify.circom";

// Función para verificar si un punto está dentro de un polígono
template RayCasting(MAX_VERTICES) {
    // Entradas
    signal input n; // Número actual de vértices
    signal input point[2]; // Coordenadas x, y del punto a verificar
    signal input polygon[MAX_VERTICES][2]; // Coordenadas de los vértices del polígono
    
    // Salida
    signal output isInside;
    
    // Variables intermedias & componentes
    component lessThanOrEqual[MAX_VERTICES];
    component lessThan[MAX_VERTICES];
    component isLess[MAX_VERTICES];
    component and1[MAX_VERTICES];
    component and2[MAX_VERTICES];
    component mux[MAX_VERTICES];
    component processEdge[MAX_VERTICES];
    signal crossings[MAX_VERTICES+1];
    
    // Inicialización
    crossings[0] <== 0;
    
    // Instanciación de componentes fuera del bucle
    for (var i = 0; i < MAX_VERTICES; i++) {
        lessThanOrEqual[i] = LessEqThan(252);
        lessThan[i] = LessThan(252);
        isLess[i] = LessThan(252);
        and1[i] = AND();
        and2[i] = AND();
        mux[i] = Mux1();
        processEdge[i] = LessThan(252);
    }
    
    // Bucle principal para procesar cada arista del polígono
    for (var i = 0; i < MAX_VERTICES; i++) {
        var j = (i + 1) % MAX_VERTICES;
        
        // Decidimos si procesar esta arista o no
        processEdge[i].in[0] <== i;
        processEdge[i].in[1] <== n;
        
        // Comprobamos si y está entre y1 e y2
        lessThanOrEqual[i].in[0] <== polygon[i][1];
        lessThanOrEqual[i].in[1] <== point[1];
        
        lessThan[i].in[0] <== point[1];
        lessThan[i].in[1] <== polygon[j][1];
        
        // Calculamos si hay intersección
        var deltaX = polygon[j][0] - polygon[i][0];
        var deltaY = polygon[j][1] - polygon[i][1];
        var numerator = (point[0] - polygon[i][0]) * deltaY;
        var denominator = deltaX * (point[1] - polygon[i][1]);
        
        isLess[i].in[0] <== numerator;
        isLess[i].in[1] <== denominator;
        
        and1[i].a <== lessThanOrEqual[i].out;
        and1[i].b <== lessThan[i].out;
        and2[i].a <== and1[i].out;
        and2[i].b <== isLess[i].out;
        
        mux[i].c[0] <== crossings[i];
        mux[i].c[1] <== crossings[i] + 1;
        mux[i].s <== and2[i].out * processEdge[i].out;
        
        crossings[i+1] <== mux[i].out;
    }
    
    // Convertir el número de cruces a bits
    component num2Bits = Num2Bits(252);
    num2Bits.in <== crossings[MAX_VERTICES];
    
    // El punto está dentro si el número de cruces es impar
    isInside <== num2Bits.out[0];
}

template Main(MAX_VERTICES) {
    // Entradas
    signal input n;
    signal input point[2];
    signal input polygon[MAX_VERTICES][2];
    
    // Salida
    signal output isInside;

    // Salida intermedia para el cálculo
    // signal intermediateIsInside;

    // Instanciar RayCasting
    component rayCasting = RayCasting(MAX_VERTICES);
    rayCasting.n <== n;
    rayCasting.point <== point;
    rayCasting.polygon <== polygon;
    isInside <== rayCasting.isInside;

    // // Asignación computacional
    // intermediateIsInside <== rayCasting.isInside;

    // // Verificación
    // isInside === intermediateIsInside;
}

// Componente principal que instancia RayCasting
// component main {public [n, polygon, isInside]} = Main(12);
component main {public [n, polygon]} = Main(12);