import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import './index.scss'

const baseURL = 'http://localhost:9000/'

const Home = () => {
    const [background, setBackground] = useState<any>() //todo: change type here
    const [i, setI] = useState<number>(1)
    useEffect(() => {
        function getI() {
            setI(Math.floor(Math.random() * 3) + 1)
        }
        async function getBackground(index: number) {
            const res = await fetch(`${baseURL}home-background?i=${i}`)
            setBackground(res.url)
        }
        getI()
        console.log(i)
        getBackground(i)
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
