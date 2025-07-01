import express, {json} from 'express'
import cors from 'cors'
import { router } from './routes/repo.js'

const app = express()

//app.disable('x-powered-by') // deshabilita la cabecera x-powered-by
app.use(json())
app.use(cors())

app.use('/repo',router)

app.listen(process.env.PORT||3000, () => {
    console.log(`Server is running on port ${process.env.PORT||3000}`)
})