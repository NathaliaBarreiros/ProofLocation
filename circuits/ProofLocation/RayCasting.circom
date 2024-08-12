pragma circom 2.1.6;

include "../node_modules/circomlib/circuits/comparators.circom";
include "../node_modules/circomlib/circuits/mux1.circom";
include "../node_modules/circomlib/circuits/gates.circom";
include "../node_modules/circomlib/circuits/bitify.circom";

// Función para verificar si un punto está dentro de un polígono
template RayCasting(n) {
    // n es el número de vértices del polígono
    
    // Entradas
    signal input point[2]; // Coordenadas x, y del punto a verificar
    signal input polygon[n][2]; // Coordenadas de los vértices del polígono
    
    // Salida
    signal output isInside;
    
    // Variables intermedias
    component lessThanOrEqual[n];
    component lessThan[n];
    component isLess[n];
    component and1[n];
    component and2[n];
    component mux[n];
    signal crossings[n+1];
    
    // Inicialización
    crossings[0] <== 0;
    
    // Declaración de componentes fuera del bucle
    for (var i = 0; i < n; i++) {
        lessThanOrEqual[i] = LessEqThan(252);
        lessThan[i] = LessThan(252);
        isLess[i] = LessThan(252);
        and1[i] = AND();
        and2[i] = AND();
        mux[i] = Mux1();
    }
    
    // Bucle principal
    for (var i = 0; i < n; i++) {
        var j = (i + 1) % n;
        
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
        
        // Usando AND para evitar multiplicación no cuadrática
        and1[i].a <== lessThanOrEqual[i].out;
        and1[i].b <== lessThan[i].out;
        and2[i].a <== and1[i].out;
        and2[i].b <== isLess[i].out;
        
        mux[i].c[0] <== crossings[i];
        mux[i].c[1] <== crossings[i] + 1;
        mux[i].s <== and2[i].out;
        
        crossings[i+1] <== mux[i].out;
    }
    
    // Convertir el número de cruces a bits
    component num2Bits = Num2Bits(252);
    num2Bits.in <== crossings[n];
    
    // El punto está dentro si el número de cruces es impar (bit menos significativo es 1)
    isInside <== num2Bits.out[0];
}

// Componente principal
component main {public [polygon]} = RayCasting(5);