import { Outlet, Link } from 'react-router-dom'
import { Fragment, useContext } from 'react'

import { CartContext } from '../../context/cart.context'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/user/user.selector'

import { signOutUser } from '../../utils/firebase/firebase.utils'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component'

import { NavigationContainer, Logo, NavLinksContainer, NavLink, Logout } from './navigation.style'

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser)
    const { isCartOpen } = useContext(CartContext)
    const signOutHandler = async () => {
        await signOutUser();
    }
    return (
        <Fragment>
            <NavigationContainer>
                <Link to="/">
                    <Logo className='logo' />
                </Link>
                <NavLinksContainer>
                    <NavLink className="nav-link" to='/shop'>
                        Shop
                    </NavLink>
                    {
                        currentUser ? (
                            <Logout onClick={signOutHandler} className='nav-link logout'>
                                Logout
                            </Logout>
                        ) : (
                            <NavLink  className="nav-link" to='/auth'>
                                Login
                            </NavLink>
                        )
                    }

                    <CartIcon />

                </NavLinksContainer>
                {isCartOpen && <CartDropDown />}

            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}


export default Navigation