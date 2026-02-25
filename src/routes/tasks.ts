import { Router } from "express"
import { TaskController } from "../controllers/tasks"


export class TaskRoutes {

    constructor() { }

    static get routes(): Router {

        const router = Router()
        const controller = new TaskController()

        router.route("/")
            .get(controller.getAllTasks)
            .post(controller.createTask)

        router.route("/:id")
            .get(controller.getTask)
            .patch(controller.updateTask)
            .delete(controller.deleteTask)

        return router
    }
}


