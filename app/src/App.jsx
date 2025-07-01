
import './App.css'
import Card from './components/card'
import FolderContent from './components/folderContent';
import { useEffect, useRef, useState } from 'react'
function App() {
const [Repositorio, setRepositorio] = useState([]);
const [NavRepositorio, setNavRepositorio] = useState({});
const NavWindow = useRef(undefined)

useEffect(()=>{
  fetch('http://192.168.1.41:3000/repo').then(Response=> Response.json()).then(data=> setRepositorio(data))
},[])

  return (
    <>
      <header>
      </header>
      <span id="Header-span">
        <img src="../src/assets/Carrera_logo2.jpg" alt="Logo DACI" />
        <span>
          <h1>Documentación Académica</h1>
          <h4>Acceso a documentos y recursos académicos para la evaluación y seguimiento de programas educativos</h4>
        </span>
        
      </span>
      <main>
        {Repositorio.map((item,index) =>{
          return(
              <Card 
                key={index}
                item= {item}
                setNavRepositorio = {setNavRepositorio}
              />
          )
        })

        }
      </main>
      {NavRepositorio?.tittle && <nav className='NavWindow' ref={NavWindow}>
          <div className='Nav-Header'>
            <img src="../src/assets/Carrera_logo.jpg" alt="Logo DACI" className='Nav-Logo'/>
            <img src="../src/assets/close.svg" alt="Close" className ="Nav-Close" onClick={()=> setNavRepositorio({})}/>
          </div>
          <FolderContent
              item={NavRepositorio}
              NavWindow={NavWindow}
          />
      </nav>}
      <footer>
        <span>
          <h3>Información Importante</h3>
          <small>Todos los documentos y enlaces están sujetos a políticas de acceso y protección de datos. Para obtener acceso completo, contacte con la administración académica correspondiente.</small>
        </span>
      </footer>
    </>
  )
}

export default App
