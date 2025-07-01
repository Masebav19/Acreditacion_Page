import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const repository = require('../repository/repositorio.json')

export class Respository{
    static async getAll(){
        return repository
    }
}