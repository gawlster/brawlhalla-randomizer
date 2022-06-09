import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import './index.scss'
import images from '../../images'

const BASE_URL = 'http://localhost:9000/'

type APIRes = {
    name: string
    thumbnail: string
    'more-info': string
}
type LegendOverview = {
    name: string
    thumbnail: any
    'more-info': string
}

const Legends = () => {
    const [legends, setLegends] = useState<LegendOverview[]>([])

    useEffect(() => {
        async function getLegends() {
            const response = await fetch(`${BASE_URL}all-legends`)
            const data: APIRes[] = await response.json()
            let fdata: LegendOverview[] = []
            data.forEach(async (legend) => {
                fdata.push({
                    ...legend,
                    thumbnail: images[legend.name.replace(/\s/g, '') as keyof typeof images],
                })
            })
            setLegends(fdata)
        }
        getLegends()
    }, [])

    function getRandomImageStyle() {
        const r = Math.floor(Math.random() * 200) + 20
        const g = Math.floor(Math.random() * 200) + 20
        const b = Math.floor(Math.random() * 200) + 20
        return { background: `rgb(${r}, ${g}, ${b})` }
    }

    return (
        <div id='Legends'>
            <div className='content'>
                <h1>Meet the Legends</h1>
                <div className='container'>
                    {legends &&
                        legends.map((legend, i) => {
                            return (
                                <div
                                    className='legend'
                                    key={i}
                                    onClick={(e: any) => {
                                        alert(`clicked on ${legend.name}`)
                                    }}>
                                    <div className='image' style={getRandomImageStyle()}>
                                        <img className='thumbnail' src={legend.thumbnail} alt='' />
                                    </div>
                                    <div className='onhover'>
                                        <div className='overlay'></div>
                                        <div className='name'>
                                            <p>{legend.name}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
            <Navbar />
        </div>
    )
}

export default Legends
