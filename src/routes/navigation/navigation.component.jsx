import { Outlet, Link } from 'react-router-dom'
import { Fragment } from 'react'

import { ReactComponent as CrwnLogo } from '../../assets/CrwnLogo.svg'
import './navigation.style.scss'

const Navigation = () => {
    return (
        <Fragment>
            <nav className='navigation'>
                <Link className='logo-container' to="/">
                    <CrwnLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className="nav-link" to='/shop'>
                        Shop
                    </Link>
                    <Link className="nav-link" to='/sign-in'>
                        Login
                    </Link>
                </div>
            </nav>
            <Outlet />
        </Fragment>
    )
}


export default Navigation