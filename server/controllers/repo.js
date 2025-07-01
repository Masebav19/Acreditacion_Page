import { Respository } from "../models/repo.js";
import fs from 'fs/promises'
const regex = /\.\w+$/ 

export class RepoController {
    static async getAll(req, res){
        const respositoryInfo = await Respository.getAll();
        res.json(respositoryInfo)
    }
    static async getById(req, res){
        const { id } = req.params;
        const { Path } = req.query;
        if (Path){
            const repositories = await Respository.getAll();
            const repo = repositories.find(element => element.id === Number(id));
            if (repo){
                if(regex.test(Path)){
                    res.sendFile(`${repo.path}/${Path}`)
                }else{
                    const filesAndFolders = await fs.readdir(`${repo.path}/${Path}`)
                    res.json({ContentDir: filesAndFolders})
                }

            }else{
                res.json({error: {message: `Repository not found`}})
            }
        }else{
            const repositories = await Respository.getAll();
            const repo = repositories.find(element => element.id === Number(id));
            if (repo){
                const filesAndFolders = await fs.readdir(repo.path)
                res.json({ContentDir: filesAndFolders})

            }else{
                res.json({error: {message: `Repository not found`}})
            }
        }
    }

}