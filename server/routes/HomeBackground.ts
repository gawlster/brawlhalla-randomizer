import express, { Router, Request, Response } from 'express'

const router: Router = express.Router()

type SuccessResponse = {
    message: string
    i: number
    imgURL: string
}
type ErrorResponse = {
    message: string
}

router.get('/', async (req: Request, res: Response) => {
    const queries = req.query
    // validate the query
    if (queries.i && typeof queries.i == 'string' && queries.i >= '1' && queries.i <= '3') {
        const response: SuccessResponse = {
            message: `Responding with the home background number ${queries.i}`,
            i: Number(queries.i),
            imgURL: `images/backgrounds/home/background${queries.i}`,
        }
        res.status(200).send(response)
    } else {
        const response: ErrorResponse = {
            message: 'Invalid request, please specify an i query in the range [1, 3]',
        }

        res.status(400).send(response)
    }
})

export default router
