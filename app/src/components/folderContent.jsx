import { useEffect, useRef, useState } from "react";
import ContentCard from "./contentCard";
import './folderContent.css';

const regex = /\.\w+$/ 

export default function FolderContent({ item, NavWindow }) {
    const [directories, setDirectories] = useState(item);
    const [filesAndFolders, setFilesAndFolders] = useState([]);
    const [OpenViewr, setOpenViewr] = useState(false);
    const ViewContent = useRef(undefined)
    useEffect(() => {
        if(!regex.test(directories?.folderPath)){
            fetch(`http://172.29.73.57:3000/repo/${directories.id}${directories?.folderPath ? `?Path=${directories.folderPath}` : ''}`).
            then(response => response.json()).
            then(data => setFilesAndFolders(data.ContentDir))
        }
    },[directories])
    function handleGoPath(index) {
        const directoriesCopy = {...directories}
        if(index === 0) {
            const NewDirectory = {id: directoriesCopy.id, tittle: directoriesCopy.tittle, description: directoriesCopy.description, 
                type: directoriesCopy.type}
                setDirectories(NewDirectory)
        } else {
            const pathArray = directoriesCopy.folderPath.split('/');
            directoriesCopy.folderPath = pathArray.slice(0, index).join('/');
            setDirectories(directoriesCopy)
        }
    }
    function handleCloseViewer(){
        const directoriesCopy = {...directories}
        const pathArray = directoriesCopy.folderPath.split('/');
        directoriesCopy.folderPath = pathArray.slice(0, pathArray.length-1).join('/')
        setDirectories(directoriesCopy)
        setOpenViewr(false)
    }
    console.log(ViewContent)
    return(
        <>
            <div id="ActualPathContainer">
                <small className="Folder Path" onClick={()=>handleGoPath(0)}>{item.tittle}</small>
                {directories?.folderPath &&
                    directories?.folderPath.split('/').map((element, index) => {
                        return(
                            <>
                                <small>→</small>
                                <small key={index} className="Folder Path" onClick={()=>handleGoPath(index+1)}>{element}</small>
                            </>
                        )
                    })
                }
            </div>
            {filesAndFolders.length > 0 && 
            <div id="FilesAnDFoldersContainer">
                <h3>Contenido de la carpeta</h3>
                {
                    filesAndFolders.map((element,index)=>{
                        return(
                            <ContentCard
                                key={index}
                                element={element}
                                directories={directories}
                                setDirectories= {setDirectories}
                                setOpenViewr = {setOpenViewr}
                                NavWindow={NavWindow}
                            />
                        )
                    })
                }
            </div>
            }

            {OpenViewr && 
                <div id="ViewerContainer">
                    <div id='Viewer-Header' >
                        <img src="../src/assets/Carrera_logo.jpg" alt="Logo DACI" id='Viewer-Logo'/>
                        <img src="../src/assets/close.svg" alt="Close" id ="Viewer-Close"onClick={handleCloseViewer}/>
                    </div>
                   <div id="PreView">
                        {!(directories?.folderPath.endsWith('.mp4')||directories?.folderPath.endsWith('.avi')||directories?.folderPath.endsWith('.mpg')) &&
                            <iframe 
                            src={`http://172.29.73.57:3000/repo/${directories.id}${directories?.folderPath ? `?Path=${directories.folderPath}` : ''}`}
                            title="Preview"
                            id="Preview"
                            allow="autoplay"
                        ></iframe>}
                        {(directories?.folderPath.endsWith('.mp4')||directories?.folderPath.endsWith('.avi')||directories?.folderPath.endsWith('.mpg')) &&
                            <video src={`http://172.29.73.57:3000/repo/${directories.id}${directories?.folderPath ? `?Path=${directories.folderPath}` : ''}`}
                            controls
                            autoPlay
                            ></video>
                        }
                   </div>
                </div>
            }
        </>
    )
}