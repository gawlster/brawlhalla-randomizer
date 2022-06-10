import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import { useParams } from 'react-router'
import Navbar from '../../components/Navbar'

const BASE_URL = 'http://localhost:9000/'

type LegendData = {
    'link-info': string
    name: string
    desc: string
    lore: string[]
    thumbnail: string
    weapons: WeaponData[]
    skins: SkinData[]
    crossovers: SkinData[]
}
type WeaponData = {
    name: string
    thumbnail: string
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
    gif: string
}
type SkinData = {
    name: string
    thumbnail: string
}

const defaultLegendData = {
    'link-info': '',
    name: '',
    desc: '',
    lore: [''],
    thumbnail: '',
    weapons: [
        {
            name: '',
            thumbnail: '',
            signatures: {
                nsig: {
                    'active-input': false,
                    desc: '',
                    gif: '',
                },
                ssig: {
                    'active-input': false,
                    desc: '',
                    gif: '',
                },
                dsig: {
                    'active-input': false,
                    desc: '',
                    gif: '',
                },
            },
        },
    ],
    skins: [
        {
            name: '',
            thumbnail: '',
        },
    ],
    crossovers: [
        {
            name: '',
            thumbnail: '',
        },
    ],
}

const LegendDetails = () => {
    const [legendData, setLegendData] = useState<LegendData>(defaultLegendData)

    let { legendName } = useParams()

    useEffect(() => {
        async function getData() {
            const res = await fetch(`${BASE_URL}legend?legend=${legendName}`)
            const data = await res.json()
            const fdata = {
                ...data,
                lore: formatLore(data.default.lore),
            }
            setLegendData(fdata)
        }
        getData()
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
                    legendData.weapons &&
                    legendData.weapons.map((weapon, i) => {
                        return (
                            <div key={i} className='weapon'>
                                <Link to={`/weapon-details/${weapon.name.replace(/\s/g, '')}`}>
                                    <img className='thumbnail' src={weapon.thumbnail} alt='' />
                                    <h3 className='weapon-name'>{weapon.name}</h3>
                                </Link>
                            </div>
                        )
                    })}

                <h2 className='skin-header'>
                    {legendData.name ? `${legendData.name}'s ` : ''}Skins
                </h2>
                {legendData &&
                    legendData.skins &&
                    legendData.skins.map((skin, i) => {
                        return (
                            <div key={i} className='skin'>
                                <img className='thumbnail' src={skin.thumbnail} alt='' />
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
                    legendData.crossovers &&
                    legendData.crossovers.map((crossover, i) => {
                        return (
                            <div key={i} className='crossover'>
                                <img className='thumbnail' src={crossover.thumbnail} alt='' />
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
