import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import Navbar from '../../components/Navbar'
import './index.scss'
import WeaponImages from '../../imports/Weapons'
import lightGIFS from '../../imports/lightGifs'
import characterThumbnails from '../../imports/characterThumbnails'
const BASE_URL = 'http://localhost:9000/'

type WeaponData = {
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
const defaultWeaponData: WeaponData = {
    name: '',
    camelCase: '',
    attacks: {
        nlight: {
            'active-input': false,
            desc: '',
            gif: '',
        },
        slight: {
            'active-input': false,
            desc: '',
            gif: '',
        },
        dlight: {
            'active-input': false,
            desc: '',
            gif: '',
        },
        nair: {
            'active-input': false,
            desc: '',
            gif: '',
        },
        sair: {
            'active-input': false,
            desc: '',
            gif: '',
        },
        dair: {
            'active-input': false,
            desc: '',
            gif: '',
        },
        recovery: {
            'active-input': false,
            desc: '',
            gif: '',
        },
        gp: {
            'active-input': false,
            desc: '',
            gif: '',
        },
    },
    legends: [
        {
            name: '',
            thumbnail: '',
        },
    ],
}

type WeaponGIFS = {
    nlight: string
    slight: string
    dlight: string
    nair: string
    sair: string
    dair: string
    recovery: string
    gp: string
}
const defaultWeaponGIFS = {
    nlight: '',
    slight: '',
    dlight: '',
    nair: '',
    sair: '',
    dair: '',
    recovery: '',
    gp: '',
}

type AttackPropType = {
    weaponGIFS: WeaponGIFS
    weaponData: WeaponData
    attack: string
}

const AttackComp = (props: AttackPropType) => {
    const [fAttack, setFAttack] = useState<string>('')

    useEffect(() => {
        if (props.attack == 'gp') {
            setFAttack('GP')
        } else if (props.attack == 'recovery') {
            setFAttack('Recovery')
        } else {
            let newString =
                props.attack.charAt(0).toUpperCase() +
                '-' +
                props.attack.charAt(1).toUpperCase() +
                props.attack.slice(2)
            setFAttack(newString)
        }
    })

    return (
        <div className={`attack ${props.attack}`}>
            <h4 className='title'>{fAttack}</h4>
            <div className='data'>
                <div className='images'>
                    <div className='hidden'>
                        <p className='text-touch'>Click to see {fAttack}</p>
                        <p className='text-no-touch'>Hover to see {fAttack}</p>
                    </div>
                    <img
                        className='gif'
                        src={props.weaponGIFS[props.attack as keyof typeof props.weaponGIFS]}
                        alt=''
                    />
                </div>
                <p className='description'>
                    {
                        props.weaponData.attacks[
                            props.attack as keyof typeof props.weaponData.attacks
                        ].desc
                    }
                </p>
            </div>
        </div>
    )
}

const WeaponDetails = () => {
    const { weaponName } = useParams()

    const [weaponData, setWeaponData] = useState<WeaponData>(defaultWeaponData)
    const [weaponImage, setWeaponImage] = useState<string>('')
    const [weaponGIFS, setWeaponGIFS] = useState<WeaponGIFS>(defaultWeaponGIFS)

    useEffect(() => {
        async function getData() {
            const response = await fetch(`${BASE_URL}weapon?weapon=${weaponName}`)
            const data = await response.json()
            setWeaponData(data.default)
            const image = WeaponImages[weaponName as keyof typeof WeaponImages]
            setWeaponImage(image)
            const attacks = lightGIFS[weaponName as keyof typeof lightGIFS]
            setWeaponGIFS(attacks)
        }
        getData()
    }, [])

    function getRandomTitleColor() {
        const r = Math.floor(Math.random() * 200)
        const g = Math.floor(Math.random() * 200)
        const b = Math.floor(Math.random() * 200)
        return `rgb(${r}, ${g}, ${b})`
    }

    return (
        <div id='WeaponDetails'>
            <div className='content'>
                <div className='headers'>
                    <h1 className='name' style={{ color: getRandomTitleColor() }}>
                        {weaponData.name}
                    </h1>
                    <img className='thumbnail' src={weaponImage} alt='' />
                </div>
                <div className='attacks'>
                    <h3 className='attack-header'>{weaponData.name} Attacks</h3>
                    <div className='attacks-data'>
                        <AttackComp
                            weaponGIFS={weaponGIFS}
                            weaponData={weaponData}
                            attack={'nlight'}
                        />
                        <AttackComp
                            weaponGIFS={weaponGIFS}
                            weaponData={weaponData}
                            attack={'slight'}
                        />
                        <AttackComp
                            weaponGIFS={weaponGIFS}
                            weaponData={weaponData}
                            attack={'dlight'}
                        />
                        <AttackComp
                            weaponGIFS={weaponGIFS}
                            weaponData={weaponData}
                            attack={'nair'}
                        />
                        <AttackComp
                            weaponGIFS={weaponGIFS}
                            weaponData={weaponData}
                            attack={'sair'}
                        />
                        <AttackComp
                            weaponGIFS={weaponGIFS}
                            weaponData={weaponData}
                            attack={'dair'}
                        />
                        <AttackComp
                            weaponGIFS={weaponGIFS}
                            weaponData={weaponData}
                            attack={'recovery'}
                        />
                        <AttackComp weaponGIFS={weaponGIFS} weaponData={weaponData} attack={'gp'} />
                    </div>
                </div>
                <div className='legends'>
                    <h3 className='header'>
                        Legends
                        {weaponData && weaponData.name !== '' ? ` that use ${weaponData.name}` : ''}
                        :
                    </h3>
                    <div className='data'>
                        {weaponData &&
                            weaponData.legends &&
                            weaponData.legends.map((legend, i) => {
                                return (
                                    <div key={i} className='legend'>
                                        <Link
                                            style={{ textDecoration: 'none' }}
                                            to={`/legend-details/${legend.name.replace(
                                                /\s/g,
                                                ''
                                            )}`}>
                                            <img
                                                className='thumbnail'
                                                src={
                                                    characterThumbnails[
                                                        legend.name.replace(
                                                            /\s/g,
                                                            ''
                                                        ) as keyof typeof characterThumbnails
                                                    ]
                                                }
                                                alt=''
                                            />
                                            <p className='name'>{legend.name}</p>
                                        </Link>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
            <Navbar />
        </div>
    )
}

export default WeaponDetails
