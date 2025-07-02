import './contentCard.css'
const regex = /\.\w+$/ 

export default function ContentCard({ element,directories,setDirectories, setOpenViewr,NavWindow }) {
    async function handleClick(e){
        e.preventDefault()
        const directoryCopy = {...directories}
            if(directoryCopy?.folderPath)
                directoryCopy.folderPath += `/${element}`
            else
                directoryCopy.folderPath = element
        if(!regex.test(element)){
            setDirectories(directoryCopy);      
        }else{
            if(window.innerWidth > 840 || directoryCopy?.folderPath.endsWith('.mp4')){
            NavWindow.current.scrollTop = 0
            setOpenViewr(true);
            setDirectories(directoryCopy); 
            }else{
                window.open(`http://192.168.1.41:3000/repo/${directoryCopy.id}${directoryCopy?.folderPath ? `?Path=${directoryCopy.folderPath}` : ''}`, '_blank');
            } 
        }
    }
    return(
        <span className="FileAndfolder InfoContainer">
                {regex.test(element)&&
                <FileIcon/>
                }
                {!regex.test(element)&&
                <FolderIcon/>
                }
            <p onClick={handleClick}>{element}</p>
        </span>
    )
}

const FolderIcon = () =>{
    return(
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
         viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg"><g id="Folder_On">
        <path d="M19.435,19.94H4.565a2.5,2.5,0,0,1-2.5-2.5V6.56a2.5,2.5,0,0,1,2.5-2.5h5.27A2.5,2.5,0,0,1,12.292,6.1l.042.222a.5.5,0,0,0,.491.408h6.61a2.5,2.5,0,0,1,2.5,2.5v8.21A2.5,2.5,0,0,1,19.435,19.94ZM4.565,5.06a1.5,1.5,0,0,0-1.5,1.5V17.44a1.5,1.5,0,0,0,1.5,1.5h14.87a1.5,1.5,0,0,0,1.5-1.5V9.23a1.5,1.5,0,0,0-1.5-1.5h-6.61a1.5,1.5,0,0,1-1.474-1.225l-.042-.221A1.5,1.5,0,0,0,9.835,5.06Z"
        >
        </path></g></svg>
    )
}

const FileIcon = () =>{
    return(
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" 
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"><g id="File_On">
        <path d="M19.485,7.35l-4.97-4.86a1.466,1.466,0,0,0-1.05-.43h-6.9a2.5,2.5,0,0,0-2.5,2.5V19.44a2.507,2.507,0,0,0,2.5,2.5h10.87a2.507,2.507,0,0,0,2.5-2.5V8.42A1.49,1.49,0,0,0,19.485,7.35Zm-1.27.15h-2.34a1.5,1.5,0,0,1-1.5-1.5V3.75Zm.72,11.94a1.5,1.5,0,0,1-1.5,1.5H6.565a1.5,1.5,0,0,1-1.5-1.5V4.56a1.5,1.5,0,0,1,1.5-1.5h6.81V6a2.5,2.5,0,0,0,2.5,2.5h3.06Z"
        >
        </path></g></svg>
    )
}