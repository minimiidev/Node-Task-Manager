import { NextFunction, Request, Response } from "express"

import { TaskModel } from "../models/Task"
import asyncWrapper from "../middleware/async"
import { createCustomError } from "../errors/custom-error"

export class TaskController {
    constructor() { }

    getAllTasks = asyncWrapper(async (req: Request, res: Response) => {
        const tasks = await TaskModel.find({})
        if (!tasks) {
            return res.status(200).json({ message: "No tasks found", tasks: [] })
        }
        res.status(200).json({ tasks })
    })

    createTask = asyncWrapper(async (req: Request, res: Response) => {
        const task = await TaskModel.create(req.body)
        res.status(201).json({ task })
    })

    getTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const { id: taskID } = req.params
        const task = await TaskModel.findOne({ _id: taskID })
        if (!task) {
            return next(createCustomError(`No task with id : ${taskID}`, 404))
        }

        res.status(200).json({ task })
    })

    deleteTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const { id: taskID } = req.params
        const task = await TaskModel.findOneAndDelete({ _id: taskID })
        if (!task) {
            return next(createCustomError(`No task with id : ${taskID}`, 404))
        }
        res.status(200).json({ task })
    })

    updateTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const { id: taskID } = req.params

        const task = await TaskModel.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true,
        })

        if (!task) {
            return next(createCustomError(`No task with id : ${taskID}`, 404))
        }

        res.status(200).json({ task })
    })

}