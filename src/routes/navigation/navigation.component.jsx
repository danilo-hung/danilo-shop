import { Outlet, Link } from 'react-router-dom'
import { Fragment, useContext } from 'react'

import { UserContext } from '../../context/user.context'

import { signOutUser } from '../../utils/firebase/firebase.utils'

import { ReactComponent as CrwnLogo } from '../../assets/CrwnLogo.svg'
import './navigation.style.scss'

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const signOutHandler = async () => {
       await signOutUser();
       setCurrentUser(null)
    }
    // console.log(currentUser)
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
                    {
                        currentUser ? (
                            <Link onClick={signOutHandler} className='nav-link' to='/'>
                                Logout
                            </Link>
                        ) : (
                            <Link className="nav-link" to='/auth'>
                                Login
                            </Link>
                        )
                    }

                </div>
            </nav>
            <Outlet />
        </Fragment>
    )
}


export default Navigation