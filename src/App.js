import React, { useState,  useEffect } from "react";
import Axios from 'axios';
import "./App.css";
import Logo from './imagenes/logo.png'
import flecha from './imagenes/cambiar-flechas.png'




function App() {


var today = new Date( );
var now = today.toLocaleString();

//---------------------------------------------------------------------------
const params = { "fiats": [ "Bs" ], "coins":[ "USD"]  };

const [list, setList] = useState();
const [valor, setValor] = useState(0);
const [calculo, setCalculo] = useState(0);
const [boton, setBoton] = useState(false);

//---------------------------------------------------------------------------
useEffect(() => {
Axios.post('https://petroapp-price.petro.gob.ve/price', params )
  
        .then(response => {
        setList(response.data); 
        })


        .catch(err => {
        console.error(err);
        })

    },[setList])

 //-------------------------------------------------------------------------  
 




let calcular = () => {
 
if(boton === true){
setCalculo(valor/list.data.USD.BS)
}else if(boton === false){
    setCalculo(valor*list.data.USD.BS)
}


};

//---------------------------------------------------------------------------



let tipo = () => {

  setCalculo(0) 

if (boton === true){
  setBoton(false)
}else if(boton === false)
setBoton(true)


};



//--------------------------------------------------------------------------

  return (

    <div className="App">

 <div className="contenedor">




      <div className="contenedorlogo" >
      <img src={Logo} className="logo" alt="no found" />
      </div>
      


              <div className="informacion">
                        PRECIO DEL DOLAR  BCV :{list? (<div>{list.data.USD.BS} Bs</div>)
                                                : (<div>cargando</div>) 
                                                  }


                      <div>precio del dolar al {now}</div>
              </div>
      
    
                <div className="contenedorInput">

                  <input   onChange={(e) => {
                          e.preventDefault();
                          setValor(e.target.value);
                        }} 
                        
                        type="text"  class="form-control" id="exampleFormControlInput1" placeholder="ingrese monto"/>
                            

                </div>
     


            <div className="tipodecambio"> 

                  <div className="contenedor1">
                  {boton? (<div> Bs</div>)
                        : (<div>dolar</div>) 
                      }
                  </div>

                        <div className="button1">
                            <button onClick={tipo} type="button" class="btn btn-primary" > <img className="flechas" src={flecha} alt="no found" /> </button>      
                        </div>

                    <div className="contenedor2">
                    {boton? (<div> Dolar</div>)
                        : (<div>Bs</div>) 
                      }
                    </div>

            </div>



                  <div className="button2">
                        <button  onClick={calcular}  type="button" class="btn btn-success">Calcular</button>
                  </div>
       
      
   
            <div className="resultado">
              {calculo.toFixed(2)} {boton? (<div> $</div>)
                        : (<div>Bs</div>) 
                      }
            </div>
        </div>
    </div>
   
  );
}

export default App;

