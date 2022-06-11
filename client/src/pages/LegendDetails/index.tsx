import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import { useParams } from 'react-router'
import Navbar from '../../components/Navbar'
import Skins from '../../imports/Skins'
import Crossovers from '../../imports/Crossovers'
import Weapons from '../../imports/Weapons'

const BASE_URL = 'http://localhost:9000/'

type LegendData = {
    name: string
    camelCase: string
    desc: string
    lore: string[]
    weapons: WeaponData[]
    skins: SkinData[]
    crossovers: SkinData[]
}
type WeaponData = {
    name: string
    camelCase: string
    signatures: Sigs
}
type Sigs = {
    nsig: Sig
    ssig: Sig
    dsig: Sig
}
type Sig = {
    'active-input': boolean
    desc: string
    camelCase: string
}
type SkinData = {
    name: string
    camelCase: string
}

const defaultLegendData = {
    name: '',
    camelCase: '',
    desc: '',
    lore: [''],
    weapons: [
        {
            name: '',
            camelCase: '',
            signatures: {
                nsig: {
                    'active-input': false,
                    desc: '',
                    camelCase: '',
                },
                ssig: {
                    'active-input': false,
                    desc: '',
                    camelCase: '',
                },
                dsig: {
                    'active-input': false,
                    desc: '',
                    camelCase: '',
                },
            },
        },
    ],
    skins: [
        {
            name: '',
            camelCase: '',
        },
    ],
    crossovers: [
        {
            name: '',
            camelCase: '',
        },
    ],
}

const LegendDetails = () => {
    const [legendData, setLegendData] = useState<LegendData>(defaultLegendData)
    const [images, setImages] = useState<any>({})

    let { legendName } = useParams()

    useEffect(() => {
        let weapons: any[] = []
        async function getData() {
            const res = await fetch(`${BASE_URL}legend?legend=${legendName}`)
            const data = await res.json()
            const fdata = {
                ...data,
                lore: formatLore(data.default.lore),
            }
            fdata.weapons.forEach((weapon: any) => {
                weapons.push(Weapons[weapon.camelCase as keyof typeof Weapons])
            })
            setLegendData(fdata)
        }
        getData()
        console.log(weapons)
        setImages({
            weapons: weapons,
            skins: Skins[legendName as keyof typeof Skins],
            crossovers: Crossovers[legendName as keyof typeof Crossovers],
        })
    }, [])

    function formatLore(lore: string): string[] {
        const newLore = lore.split(' | ')
        return newLore
    }
    return (
        <div id='LegendDetails'>
            <div className='content'>
                <h1 className='name'>{legendData.name}</h1>
                <h2 className='description'>{legendData.desc}</h2>
                {legendData &&
                    legendData.lore &&
                    legendData.lore.map((fragment, i) => {
                        return (
                            <p key={i} style={{ marginTop: '30px' }}>
                                {fragment}
                            </p>
                        )
                    })}

                <h2 className='weapon-header'>
                    {legendData.name ? `${legendData.name}'s ` : ''}Weapons
                </h2>
                {legendData &&
                    images &&
                    images.weapons &&
                    images.weapons.map((weapon: { name: string; img: string }, i: number) => {
                        console.log(weapon)
                        return (
                            <div key={i} className='weapon'>
                                <Link to={`/weapon-details/${weapon.name.replace(/\s/g, '')}`}>
                                    <img className='thumbnail' src={weapon.img} alt='' />
                                    <h3 className='weapon-name'>{weapon.name}</h3>
                                </Link>
                            </div>
                        )
                    })}
                <h2 className='skin-header'>
                    {legendData.name ? `${legendData.name}'s ` : ''}Skins
                </h2>
                {legendData &&
                    images &&
                    images.skins &&
                    images.skins.map((skin: { name: string; img: string }, i: number) => {
                        return (
                            <div key={i} className='skin'>
                                <img className='thumbnail' src={skin.img} alt='' />
                                <h3 className='skin-name'>{skin.name}</h3>
                            </div>
                        )
                    })}

                {legendData && legendData.crossovers && legendData.crossovers.length > 0 && (
                    <h2 className='crossover-header'>
                        {legendData.name ? `${legendData.name}'s ` : ''}
                        Crosssovers
                    </h2>
                )}
                {legendData &&
                    images &&
                    images.crossovers &&
                    images.crossovers.map((crossover: { name: string; img: string }, i: number) => {
                        return (
                            <div key={i} className='crossover'>
                                <img className='thumbnail' src={crossover.img} alt='' />
                                <h3 className='crossover-name'>{crossover.name}</h3>
                            </div>
                        )
                    })}
            </div>
            <Navbar />
        </div>
    )
}

export default LegendDetails
