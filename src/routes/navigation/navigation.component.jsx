import { Outlet, Link } from 'react-router-dom'
import { Fragment, useContext } from 'react'

import { UserContext } from '../../context/user.context'
import { CartContext } from '../../context/cart.context'

import { signOutUser } from '../../utils/firebase/firebase.utils'

import { ReactComponent as CrwnLogo } from '../../assets/CrwnLogo.svg'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component'

import './navigation.style.scss'

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext)
    // console.log(currentUser)


    const signOutHandler = async () => {
        await signOutUser();
    }
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
                            <Link onClick={signOutHandler} className='nav-link logout' to='/'>
                                Logout
                            </Link>
                        ) : (
                            <Link className="nav-link" to='/auth'>
                                Login
                            </Link>
                        )
                    }

                    <CartIcon />

                </div>
                {isCartOpen && <CartDropDown />}

            </nav>
            <Outlet />
        </Fragment>
    )
}


export default Navigation