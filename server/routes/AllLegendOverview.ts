import express, { Router, Request, Response } from 'express'
import path from 'path'

import Legends from '../data/overviews/Legends.json'

const router: Router = express.Router()

type Legend = {
    name: string
    thumbnail: string
    'more-info': string
}
type ErrorResponse = {
    message: string
}

router.get('/', async (req: Request, res: Response): Promise<any> => {
    try {
        res.status(200).json(Legends)
    } catch (err) {
        const ErrorObj: ErrorResponse = {
            message: 'Internal server error. Please try again or contact support',
        }
        res.status(500).json(ErrorObj)
    }
})

export default router
