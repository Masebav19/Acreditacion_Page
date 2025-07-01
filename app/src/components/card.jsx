import './card.css'

function DocIcon (){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" 
        fill="#000">
        <path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/>
        </svg>
    )
}

export default function Card ({item,setNavRepositorio}){
    const handlecLICK = () => {
        if(item.type === 'documents'){
            setNavRepositorio({...item});
        }else{
            window.open(item.path, "_blank");
        }
    }
    return (
        <>
            <div className="card">
                <span>
                    <img src={`../src/assets/${item.icon}`} alt={item.tittle} />
                    <h2>{item.tittle}</h2>
                </span>
                <p>{item.description}</p>
                <button onClick = {handlecLICK} className={`link ${item.type==='documents'? 'document' : ''}`}>
                    {item.type==='documents' && <DocIcon/>}
                    {item.type==='documents'? 'Documento' : 'Enlace'}
                    </button>
            </div>
        </>
    )
}