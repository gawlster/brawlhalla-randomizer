import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import './index.scss'
import homeBackgrounds from '../../imports/homeBackgrounds'
const baseURL = 'http://localhost:9000/'

const Home = () => {
    const [background, setBackground] = useState<string>()
    useEffect(() => {
        const i = Math.floor(Math.random() * 3) + 1
        setBackground(homeBackgrounds[`background${i}` as keyof typeof homeBackgrounds])
    }, [])

    return (
        <div id='Home'>
            <div className='content'>
                <div className='text-container'>
                    <div className='text'>
                        <h1>
                            Welcome to <span>Brawlhalla Randomizer</span>
                        </h1>
                        <h3>The better way to explore and choose your favourite Legend!</h3>
                    </div>
                </div>
                <div className='background'>
                    <img src={background} alt='' className='background-img' />
                </div>
            </div>
            <Navbar />
        </div>
    )
}

export default Home
