import { useState } from "react";
import './App.css'


function App() {
    const palabraOculta=['computador','maouse', 'celular', 'cuaderno','lapiz']
    
  const funcionPalabraRandom = () =>{
    const random = Math.floor(Math.random()* palabraOculta.length)
    return palabraOculta[random];
  }
  const palabraEnGuiones = (palabra)=>{
    console.log(palabra)
    return palabra.split('').map(()=>'___').join(' ');
    }
  const [palabra,setPlabara] = useState(funcionPalabraRandom()) 
  const [palabraGiones, setPlabaraGuiones] = useState(palabraEnGuiones(palabra));
  const [adivinaLetras, setAdivinaLetras] = useState([]);
  const [mensaje,setMensaje]= useState('')
  const [intentos,setIntento] = useState(10);
  const[punataje,setPuntaje] = useState(0)

    const letraAdivina = (e) =>{
      const letras = e.target.value.toLowerCase()
      e.target.value = '';

      if (adivinaLetras.includes(letras)) {
        setMensaje('CORRECTOOO!')
      }else{
        setAdivinaLetras('No coincide la letra')
      }
      setAdivinaLetras([...adivinaLetras, letras])

      if (palabra.includes(letras)) {
        const actualizar = palabra.split('').map((char)=>
          adivinaLetras.includes(char) || char === letras ? char: '__'
        ).join(' ')

        setPlabaraGuiones(actualizar);


        if (!actualizar.includes('__')) {
          setMensaje('GANOOO!, Felicidades')
         setPuntaje(+1)
        }

      }else{
        setIntento(intentos -1)
        setMensaje('Perdiste 1 intento :(');

        if (intentos -1 === 0) {
          setMensaje('Perdiste, la palabra era: ' + palabra);
        }
      }

    }


    const juegoAhorcado =()=>{
      const palabaraNew = funcionPalabraRandom();
      setPlabara(palabaraNew);
      setPlabaraGuiones(palabraEnGuiones(palabaraNew))
      setAdivinaLetras([])
      setIntento(10);
      setMensaje('')
    }

   
  return (
    <>
    <div className='Principal'>
    <div className='Presentacion' >
        <p  className='textAhorcado'>Ahorcado </p>
        <img className='imagenLogo' src='../public/rope.png'/>
      </div>
      <div className="contenedorJuego">
        <p className="empeizaJuego">EMPIEZA EN JUEGO</p>
      <div className="intentos">
      <p className="textAhorcado">Adivina la palabra</p>
      <div className="numeroIntentos">
        <p className="textAhorcado">Numero de intentos que tienes</p>
        <p className="intentosVer">{intentos}</p>
      </div>
      </div>
      <p className="mensaje">{mensaje}</p>
     
      <p className="palabraEnGuiones">{palabraGiones}</p>

      <p className="textAhorcado">Ingresa tus letras!!</p>
      <input 
      type="text"
      maxLength='1'
      className="ColocadorDeLetras"
      onKeyPress={letraAdivina}
      disabled={intentos === 0 || !palabraGiones.includes('__')}
      />
      {/* <button onClick={letraAdivina}>Compara letras</button> */}

      <button className="BotonCambiarPalabra" onClick={juegoAhorcado}>Click para ver tu palabra random</button>

     
    </div>
    <div className="PrincipalPuntaje">
      <p className="puntajes">Puntaje</p>
      <div className="numeroIntentos">
        <p className="textAhorcado">Numero de puntos que tienes</p>
        <p className="intentosVer">{punataje}</p>
      </div>
     </div>
    </div>

      
          </>
  )
}

export default App
