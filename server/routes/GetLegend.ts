import express, { Router, Request, Response } from 'express'
import legendsList from '../data/overviews/LegendList.json'

const router: Router = express.Router()

type BadRequest400 = {
    message: string
    example: string
}
type Attack = {
    'active-input': boolean
    desc: string
    gif: string
}
type Weapon = {
    name: string
    thumbnail: string
    signatures: {
        nsig: Attack
        ssig: Attack
        dsig: Attack
    }
}
type Skin = {
    name: string
    thumbnail: string
}
type LegendInfo = {
    'link-info': string
    name: string
    desc: string
    lore: string
    thumbnail: string
    weapons: Weapon[]
    skins: Skin[]
    crossovers: Skin[]
}

router.get('/', async (req: Request, res: Response): Promise<any> => {
    if (
        req.query.legend &&
        typeof req.query.legend == 'string' &&
        legendsList.legends.includes(req.query.legend)
    ) {
        const legendInfo: LegendInfo = await import(`../data/characters/${req.query.legend}.json`)
        res.json(legendInfo)
    } else {
        const badRequest: BadRequest400 = {
            message:
                'Sorry, invalid request. Please make sure to include a valid Legend name in CamelCase within request queries under the name: legend',
            example: 'BASE_URL/legend?legend=QueenNai',
        }
        res.status(400).send(badRequest)
    }
})

export default router
