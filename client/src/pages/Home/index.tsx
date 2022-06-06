import { randomInt } from 'crypto'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import './index.scss'

const baseURL = 'http://localhost:9000/'

const Home = () => {
    const [background, setBackground] = useState<any>() //todo: change type here
    const [i, setI] = useState<number>(1)
    useEffect(() => {
        function getI() {
            setI(1)
        }
        async function getBackground(index: number) {
            const res = await fetch(`${baseURL}home-background?i=1`)
            console.log(res)
            setBackground(res.url)
        }
        getI()
        getBackground(i)
    }, [])

    return (
        <div id='Home'>
            <Navbar />
            <div>
                <img src={background} alt='' className='background' />
            </div>
        </div>
    )
}

export default Home
