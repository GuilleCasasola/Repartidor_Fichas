let cantidades= [];
    let cantPersonas  = 2;
    let tipoFichas  ;
    let cantFichas  ; 
    let monto ;
    let valoresFichas = []
    let maxValue;
    
    document.addEventListener("DOMContentLoaded", function() {
        for (let index = 1; index < 6; index++) {
            valoresFichas.push(document.getElementById("valorFicha"+index).value)
            cantidades.push(document.getElementById("ficha"+index).value)
        }
    });

    function calcular(){
        let total = 0;
        valoresFichas = [];
        cantidades=[];
        for (let index = 1; index < 6; index++) {
            valoresFichas.push(document.getElementById("valorFicha"+index).value)
            cantidades.push(document.getElementById("ficha"+index).value / parseInt(document.getElementById("cantPersonas").value))
            console.log(cantidades)
            let fichasPorPersona = Math.trunc(parseInt(document.getElementById("ficha"+index).value )  / parseInt(document.getElementById("cantPersonas").value)) ;
            total += parseInt(document.getElementById("valorFicha"+index).value) * fichasPorPersona
            
            document.getElementById("fpp"+index).innerHTML = fichasPorPersona;
        }
        document.getElementById("valorMonto").innerText = "Monto Fichas Equitativas: $" + total;
        maxValue= total
    }

    function repartirFichas(){
        calcular()
        let montoAJugar = document.getElementById("montoAJugar").value;
        if( montoAJugar > maxValue){
            document.getElementById("result").innerText = "Los valores de las fichas son bajos para alcanzar el monto a jugar con esa cantidad de personas";
        }else{
            document.getElementById("result").innerText = ""
            console.log(cantidades)
            let maxPorcentaje = [1,1,1,1,1]
            let result = [];
            let montoCalculated = [0,0,0,0,0];
            let fichasCalculated = [0,0,0,0,0];
            let suma = 0
            
            while(suma < montoAJugar && (cantidades.reduce((partialSum, a) => partialSum + a, 0) > 0)){
                console.log(cantidades.reduce((partialSum, a) => partialSum + a, 0) )
                valoresFichas.forEach((element,index) => {
                    suma = montoCalculated.reduce((partialSum, a) => partialSum + a, 0);
                    if((suma+parseInt(element))<=montoAJugar && cantidades[index]>0){
                        
                        montoCalculated[index]+= parseInt(element);
                        fichasCalculated[index]++;
                    }
                    cantidades[index]--;
                });
            }
            fichasCalculated.forEach((element,index) => {
                document.getElementById("valorMonto").innerText = "Monto repartido $" + suma;
                document.getElementById("fpp"+(index+1)).innerText=element;
            });
        }
    }
