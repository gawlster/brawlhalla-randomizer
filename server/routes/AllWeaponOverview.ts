import express, { Router, Request, Response } from 'express'

import Weapons from '../data/overviews/Weapons.json'

const router: Router = express.Router()

type ErrorResponse = {
    message: string
}

router.get('/', async (req: Request, res: Response) => {
    try {
        res.status(200).json(Weapons)
    } catch (err) {
        const ErrorObj: ErrorResponse = {
            message: 'Internal server error. Please try again or contact support',
        }
        res.status(500).json(ErrorObj)
    }
})

export default router
