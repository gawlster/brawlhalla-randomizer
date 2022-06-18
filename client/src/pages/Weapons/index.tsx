import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import './index.scss'
import weaponThumbnails from '../../imports/weaponThumbnails'
const BASE_URL = process.env.BASE_URL

type ApiRes = {
    name: string
    thumbnail: string
    'more-info': string
}
type WeaponOverview = {
    name: string
    camelCase: string
    key: string
}

const Weapons = () => {
    const [weapons, setWeapons] = useState<WeaponOverview[]>()

    useEffect(() => {
        async function getData() {
            const res = await fetch(`${BASE_URL}all-weapons`)
            const data: ApiRes[] = await res.json()
            let fdata: WeaponOverview[] = []
            data.forEach((weapon, i) => {
                fdata.push({
                    name: weapon.name,
                    camelCase: weapon.name.replace(/\s/g, ''),
                    key: `${i}`,
                })
            })
            setWeapons(fdata)
        }
        getData()
    })

    return (
        <div id='Weapons'>
            <div className='content'>
                <h1>Explore the Weapons</h1>
                <div className='container'>
                    {weapons &&
                        weapons.map((weapon) => {
                            return (
                                <Link
                                    style={{ textDecoration: 'none' }}
                                    className='link'
                                    to={`/weapon-details/${weapon.camelCase}`}
                                    key={weapon.key}>
                                    <div className='weapon'>
                                        <div className='image'>
                                            <img
                                                className='thumbnail'
                                                src={
                                                    weaponThumbnails[
                                                        weapon.camelCase as keyof typeof weaponThumbnails
                                                    ]
                                                }
                                                alt=''
                                            />
                                        </div>
                                        <div className='onhover'>
                                            <div className='overlay'></div>
                                            <div className='name'>{weapon.name}</div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                </div>
            </div>
            <Navbar />
        </div>
    )
}

export default Weapons
