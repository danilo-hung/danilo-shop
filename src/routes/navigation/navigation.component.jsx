import { Outlet, Link } from 'react-router-dom'
import { Fragment, useContext } from 'react'

import { UserContext } from '../../context/user.context'

import { ReactComponent as CrwnLogo } from '../../assets/CrwnLogo.svg'
import './navigation.style.scss'

const Navigation = () => {
    const {currentUser} = useContext(UserContext)
    console.log(currentUser)
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
                    <Link className="nav-link" to='/auth'>
                        Login
                    </Link>
                </div>
            </nav>
            <Outlet />
        </Fragment>
    )
}


export default Navigation