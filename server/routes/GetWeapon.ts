import express, { Router, Request, Response } from 'express'
import WeaponList from '../data/overviews/WeaponList.json'

const router: Router = express.Router()

type BadRequest = {
    message: string
    example: string
}
type WeaponInfo = {
    name: string
    camelCase: string
    attacks: {
        nlight: Attack
        slight: Attack
        dlight: Attack
        nair: Attack
        sair: Attack
        dair: Attack
        recovery: Attack
        gp: Attack
    }
    legends: Legend[]
}
type Attack = {
    'active-input': boolean
    desc: string
    gif: string
}
type Legend = {
    name: string
    thumbnail: string
}

router.get('/', async (req: Request, res: Response): Promise<any> => {
    const weapon = req.query.weapon
    if (weapon && typeof weapon == 'string' && WeaponList.weapons.includes(weapon)) {
        const weaponInfo: WeaponInfo = await import(`../data/weapons/${weapon}.json`)
        res.status(200).json(weaponInfo)
    } else {
        const badRequestObj: BadRequest = {
            message:
                'Sorry, invalid request. Please make sure to include a valid Weapon name in CamelCase within request queries under the name: weapon',
            example: 'BASE_URL/weapon?weapon=GrappleHammer',
        }
        res.status(400).send(badRequestObj)
    }
})

export default router
