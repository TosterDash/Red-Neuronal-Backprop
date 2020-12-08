$(document).ready(function(){
    var vEntrada = [Math.random()*100,Math.random()*100];
    var vSalida = [0,0];
    var vECorrecta = [1,1];
    var vSCorrecta = [0,0];
    var h1 = [0,0];
    var w1 = [[Math.random(),Math.random()],
                [Math.random(),Math.random()]];
    var w2 = [[Math.random(),Math.random()],
                [Math.random(),Math.random()]];
    var sesgo1 = [0.5,0.5];
    var sesgo2 = [0.5,0.5];
    var tazaAprendizaje = 0.5;

    class puntoEntrada{
        constructor(x,y){
            this.x = x;
            this.y = y;
            
        }
    } 

    function salidaCorrecta(){
        console.log("salidaCorrecta");
        var suma = 0;
        //X-H1
        for(var i = 0; i<h1.length; i++){
            suma = sesgo1[i];
            for(var j = 0; j<vECorrecta.length; j++){
                suma += w1[i][j]*vECorrecta[j];
                h1[i] = activacion(suma);
            }
        }
        //h1-Y
        suma = 0;
        for(var i = 0; i<vSCorrecta.length; i++){
            suma = sesgo2[i];
            for(var j = 0; j<h1.length; j++){
                suma += w2[i][j]*h1[j];
                vSCorrecta[i] = activacion(suma);
            }
        }

    }

    function clasificacion(){
        console.log("Clasificacion");
        var suma = 0;
        //X-H1
        for(var i = 0; i<h1.length; i++){
            suma = sesgo1[i];
            for(var j = 0; j<vEntrada.length; j++){
                suma += w1[i][j]*vEntrada[j];
                h1[i] = activacion(suma);
            }
        }
        //h1-Y
        suma = 0;
        for(var i = 0; i<vSalida.length; i++){
            suma = sesgo2[i];
            for(var j = 0; j<h1.length; j++){
                suma += w2[i][j]*h1[j];
                vSalida[i] = activacion(suma);
            }
        }

    }

    function df(x){
        derivada = activacion(x)*(1-(activacion(x)));
        return derivada;
    }

    function entrenamiento(){
        console.log("--------------------------------------------------------");
        console.log("Entrenamiento");
        var dy=0;
        var dy = [], dh = [];
        var error;
        var SError;

        for(var i = 0; i < vSalida.length; i++){
            //Valor esperado - valor obtenido
            error = vSCorrecta[i] - vSalida[i];
            //error = (vEntrada[1]<2*vEntrada[0] ? 1 : -1)-vSalida[i]
            //dy += error*df(vSalida[i]);
            dy[i] = error*df(vSalida[i]);
            console.log("dy-Y: "+dy[i]);
            SError += error*error;
        }
        //2 for
        var dh1;



        for(var i = 0; i < h1.length; i++){
            error = 0;
            for(var j = 0; j < vSalida.length; j++){
                error = dy[j]*w2[i][j];
                //dh1 += w2[i][j]*dy*df(h1[i]);
                dh[j] = error*df(h1[i])
            }
        }

        for(var i = 0; i<sesgo2.length; i++){
            sesgo2[i] = sesgo2[i] + tazaAprendizaje * dy[i];
        }

        for(var i = 0; i<sesgo1.length; i ++){
            sesgo1[i] = sesgo1[i] + tazaAprendizaje * dh[i];
        }
        
       var pesow1=0;

        for(var i = 0; i < vSalida.length; i++){
            for(var j = 0; j < h1.length; j++){
                w2[i][j] += tazaAprendizaje * h1[j] * dy[j];
                console.log("W2-Peso: ");
                console.log(w2[i][j]);
                pesow1++;
            }
            pesow1++;
        }

        var pesow2=0;

        for(var i = 0; i < h1.length; i++){
            for(var j = 0; j < vEntrada.length; j++){
                w1[i][j] += tazaAprendizaje * vEntrada[j] * dh[j];
                console.log("W1-Peso: ");
                console.log(w1[i][j]);
                pesow2++;
            }
            pesow2++;
        }
        
        console.log("Error: "+error)
    }



    function activacion(suma){
        suma = 1/(1+Math.pow(Math.E, -suma));
        return suma;
    }

    

    


    $("#refresh").on('click',function(){
        
            //vEntrada[i] = new puntoEntrada(Math.random()*100,Math.random()*100);
        
        salidaCorrecta()
        clasificacion();
        entrenamiento();
    
      


    });

    


})