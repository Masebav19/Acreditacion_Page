import { Router } from "express"
import { RepoController } from "../controllers/repo.js"
export const router = Router()

router.get('/',RepoController.getAll)
router.get('/:id',RepoController.getById)