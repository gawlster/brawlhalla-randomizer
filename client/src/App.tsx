import React from 'react'
import logo from './logo.svg'
import './App.scss'
import { Link } from 'react-router-dom'

function App() {
    return (
        <div className='App'>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/legends'>Legends</Link>
                <Link to='/weapons'>Weapons</Link>
                <Link to='/choose-legend'>Choose Random</Link>
            </nav>
        </div>
    )
}

export default App
