import { useEffect, useState } from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    const [open, setOpen] = useState<boolean>(false)

    const handleClick = () => {
        if (open) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }

    return (
        <div id='Navbar'>
            {open ? (
                <div className='open'>
                    <div className='icon'>
                        <FontAwesomeIcon
                            className='icon'
                            size='2x'
                            icon={faXmark}
                            onClick={handleClick}
                        />
                    </div>
                    <nav>
                        <Link
                            className={window.location.pathname == '/' ? 'link active' : 'link'}
                            to='/'>
                            Home
                        </Link>
                        <Link
                            className={
                                window.location.pathname == '/legends' ||
                                window.location.pathname.includes('legend-details')
                                    ? 'link active'
                                    : 'link'
                            }
                            to='/legends'>
                            Legends
                        </Link>
                        <Link
                            className={
                                window.location.pathname == '/weapons' ||
                                window.location.pathname.includes('weapon-details')
                                    ? 'link active'
                                    : 'link'
                            }
                            to='/weapons'>
                            Weapons
                        </Link>
                        <Link
                            className={
                                window.location.pathname == '/choose-legend'
                                    ? 'link active'
                                    : 'link'
                            }
                            to='/choose-legend'>
                            Choose Random
                        </Link>
                    </nav>
                </div>
            ) : (
                <div className='closed'>
                    <div className='icondiv'>
                        <FontAwesomeIcon
                            className='icon'
                            size='2x'
                            icon={faBars}
                            onClick={handleClick}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar
