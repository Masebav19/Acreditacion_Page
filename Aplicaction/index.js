import express from  "express"
import path from "node:path"
const app = express()

const DIRNAME = process.cwd()
app.use(express.static(path.join(DIRNAME,'main')));
app.use(express.static(path.join(DIRNAME,'acreditacion')));

app.get('/main',(req, res) =>{
    res.sendFile(path.join(DIRNAME,'main','index.html'))
})
app.get('/documentacion',(req, res) =>{
    res.sendFile(path.join(DIRNAME,'acreditacion','index.html'))
})


app.listen(process.env.PORT||1234,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT||1234}`)
})