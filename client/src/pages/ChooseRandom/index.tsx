import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import './index.scss'
import characterThumbnails from '../../imports/characterThumbnails'
import Weapons from '../../imports/Weapons'
const BASE_URL = 'http://localhost:9000/'

type WeaponOverview = {
    name: string
    camelCase: string
    key: string
}
type WeaponRes = {
    name: string
    thumbnail: string
    'more-info': string
}

const ChooseRandom = () => {
    const [selectWeapon, setSelectWeapon] = useState<string>('any')
    const [weaponsList, setWeaponsList] = useState<WeaponOverview[]>()
    const [selectedRandomLegend, setSelectedRandomLegend] = useState<any>()
    const [headColor, setHeadColor] = useState<string>()
    const [buttonStyles, setButtonStyles] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        async function getWeaponsList() {
            const res = await fetch(`${BASE_URL}all-weapons`)
            const data: WeaponRes[] = await res.json()
            let fdata: WeaponOverview[] = []
            data.forEach((weapon, i) => {
                fdata.push({
                    name: weapon.name,
                    camelCase: weapon.name.replace(/\s/g, ''),
                    key: `${i}`,
                })
            })
            setWeaponsList(fdata)
        }
        getWeaponsList()
        async function getColor() {
            const color = await getRandomHeadColor()
            setHeadColor(color)
            setButtonStyles({
                color: color,
                background: 'rgb(245, 245, 245)',
            })
        }
        getColor()
    }, [])

    function getRandomNumber(i: number) {
        return Math.floor(Math.random() * i)
    }

    async function search(e: any) {
        e.preventDefault()
        setLoading(true)
        if (selectWeapon == 'any') {
            const resLegendsList = await fetch(`${BASE_URL}all-legends`)
            const dataLegendsList = await resLegendsList.json()
            const index = getRandomNumber(dataLegendsList.length)
            const chosenLegend = dataLegendsList[index]
            const resLegend = await fetch(
                `${BASE_URL}legend?legend=${chosenLegend.name.replace(/\s/g, '')}`
            )
            const dataLegend = await resLegend.json()
            setSelectedRandomLegend(dataLegend)
        } else {
            const resWeapon = await fetch(`${BASE_URL}weapon?weapon=${selectWeapon}`)
            const dataWeapon = await resWeapon.json()
            const eligibleLegends = dataWeapon.legends
            const index = getRandomNumber(eligibleLegends.length)
            const chosenLegend = eligibleLegends[index]
            const resLegend = await fetch(
                `${BASE_URL}legend?legend=${chosenLegend.name.replace(/\s/g, '')}`
            )
            const dataLegend = await resLegend.json()
            setSelectedRandomLegend(dataLegend)
        }
        setLoading(false)
    }

    function handleSelectChange(e: any) {
        setSelectWeapon(e.target.value)
    }

    function resetForm() {
        setSelectedRandomLegend(null)
    }

    async function getRandomHeadColor() {
        const r = Math.floor(Math.random() * 100) + 60
        const g = Math.floor(Math.random() * 100) + 60
        const b = Math.floor(Math.random() * 100) + 60
        return `rgb(${r}, ${g}, ${b})`
    }

    return (
        <div id='ChooseRandom'>
            <div className='content'>
                {selectedRandomLegend ? (
                    <div className='showing'>
                        {headColor && buttonStyles ? (
                            <div className='container'>
                                <h1>Our pick for you:</h1>
                                <Link
                                    className='link'
                                    style={{ textDecoration: 'none' }}
                                    to={`/legend-details/${selectedRandomLegend.camelCase}`}>
                                    <div className='legend-details'>
                                        <div className='images'>
                                            <div
                                                style={{ background: headColor }}
                                                className='legend'>
                                                <img
                                                    src={
                                                        characterThumbnails[
                                                            selectedRandomLegend.camelCase as keyof typeof characterThumbnails
                                                        ]
                                                    }
                                                    alt=''
                                                />
                                            </div>
                                            <div className='weapons'>
                                                {selectedRandomLegend.weapons.map(
                                                    (weapon: {
                                                        name: string
                                                        camelCase: string
                                                        signatures: any
                                                    }) => {
                                                        return (
                                                            <img
                                                                key={weapon.camelCase}
                                                                src={
                                                                    Weapons[
                                                                        weapon.camelCase as keyof typeof Weapons
                                                                    ]
                                                                }
                                                                alt=''
                                                            />
                                                        )
                                                    }
                                                )}
                                            </div>
                                        </div>
                                        <h3 style={{ color: headColor }} className='name'>
                                            {selectedRandomLegend.name}
                                        </h3>
                                        <h4 style={{ color: headColor }} className='desc'>
                                            {selectedRandomLegend.desc}
                                        </h4>
                                    </div>
                                </Link>
                                <div></div>
                                <div className='search-again'>
                                    <p
                                        className='default reset'
                                        style={{ color: 'black' }}
                                        onClick={() => {
                                            resetForm()
                                        }}>
                                        Search again
                                    </p>
                                    <p
                                        className='hover reset'
                                        style={{ color: headColor }}
                                        onClick={() => {
                                            resetForm()
                                        }}>
                                        Search again
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p style={{ fontSize: '3rem', fontWeight: '700' }}>Loading...</p>
                        )}
                    </div>
                ) : (
                    <div className='searching'>
                        {headColor && buttonStyles ? (
                            <form
                                onSubmit={(e) => {
                                    search(e)
                                }}>
                                <h1 className='sub'>Can't decide who to play?</h1>
                                <h1 style={{ color: headColor }} className='head'>
                                    Let us choose for you!
                                </h1>
                                <label
                                    onChange={(e) => {
                                        handleSelectChange(e)
                                    }}>
                                    <p>I want to play</p>
                                    <select id='weaponChoice'>
                                        <option value='any'>Any Weapon</option>
                                        {weaponsList &&
                                            weaponsList.map((weapon) => {
                                                return (
                                                    <option
                                                        key={weapon.key}
                                                        value={weapon.camelCase}>
                                                        {weapon.name}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </label>
                                <div className='button'>
                                    <button className='default' style={buttonStyles} type='submit'>
                                        {loading ? 'Loading...' : 'Search'}
                                    </button>
                                    <button
                                        className='hover'
                                        style={{
                                            color: buttonStyles.background,
                                            background: buttonStyles.color,
                                        }}
                                        type='submit'>
                                        {loading ? 'Loading...' : 'Search'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <p style={{ fontSize: '3rem', fontWeight: '700' }}>Loading...</p>
                        )}
                    </div>
                )}
            </div>
            <Navbar />
        </div>
    )
}

export default ChooseRandom
