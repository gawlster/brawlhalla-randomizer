import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import { useParams } from 'react-router'
import Navbar from '../../components/Navbar'
import Skins from '../../imports/Skins'
import Crossovers from '../../imports/Crossovers'
import Weapons from '../../imports/Weapons'

const BASE_URL = process.env.BASE_URL

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
    function getRandomNameColor() {
        const r = Math.floor(Math.random() * 200)
        const g = Math.floor(Math.random() * 200)
        const b = Math.floor(Math.random() * 200)
        return `rgb(${r}, ${g}, ${b})`
    }
    return (
        <div id='LegendDetails'>
            <div className='content'>
                <div className='details'>
                    <div className='charhead'>
                        <h1 className='name' style={{ color: getRandomNameColor() }}>
                            {legendData.name}
                        </h1>
                        <h2 className='description'>{legendData.desc}</h2>
                    </div>
                    <div className='lore'>
                        {legendData &&
                            legendData.lore &&
                            legendData.lore.map((fragment, i) => {
                                return <p key={i}>{fragment}</p>
                            })}
                    </div>
                </div>

                <div className='weapons'>
                    <h2 className='weapon-header'>
                        {legendData.name ? `${legendData.name}'s ` : ''}Weapons
                    </h2>
                    <div className='data'>
                        {legendData &&
                            images &&
                            images.weapons &&
                            images.weapons.map((weapon: string, i: number) => {
                                return (
                                    <div key={i} className={`weapon weapon${i}`}>
                                        <Link
                                            style={{ textDecoration: 'none' }}
                                            to={`/weapon-details/${legendData.weapons[
                                                i
                                            ].name.replace(/\s/g, '')}`}>
                                            <img className='thumbnail' src={weapon} alt='' />
                                            <h3 className='weapon-name'>
                                                {legendData.weapons[i].name}
                                            </h3>
                                        </Link>
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div className='skins'>
                    <h2 className='skin-header'>
                        {legendData.name ? `${legendData.name}'s ` : ''}Skins
                    </h2>
                    <div className='data'>
                        {legendData &&
                            images &&
                            images.skins &&
                            images.skins.map((skin: { name: string; img: string }, i: number) => {
                                return (
                                    <div key={i} className={`skin skin${i}`}>
                                        <img className='thumbnail' src={skin.img} alt='' />
                                        <h3 className='skin-name'>{skin.name}</h3>
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div className='crossovers'>
                    {legendData && legendData.crossovers && legendData.crossovers.length > 0 && (
                        <h2 className='crossover-header'>
                            {legendData.name ? `${legendData.name}'s ` : ''}
                            Crossovers
                        </h2>
                    )}
                    <div className='data'>
                        {legendData &&
                            images &&
                            images.crossovers &&
                            images.crossovers.map(
                                (crossover: { name: string; img: string }, i: number) => {
                                    return (
                                        <div key={i} className={`crossover crosssover${i}`}>
                                            <img className='thumbnail' src={crossover.img} alt='' />
                                            <h3 className='crossover-name'>{crossover.name}</h3>
                                        </div>
                                    )
                                }
                            )}
                    </div>
                </div>
            </div>
            <Navbar />
        </div>
    )
}

export default LegendDetails
