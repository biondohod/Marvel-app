/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink, Link } from 'react-router-dom';

import './appHeader.scss';

const AppHeader = () => {
    return( 
        <header className='app__header'>
            <h1 className="app__title">
                <Link to='/'>
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul className='app__menu__list'>
                    <li className='app__menu__item'>
                        <NavLink 
                            end to='/' 
                            style={({isActive}) => ({color: isActive ? '#9F0013': ''})}>Characters</NavLink>
                    </li>
                    /
                    <li className='app__menu__item'>
                        <NavLink 
                            to='/comics'
                            style={({isActive}) => ({color: isActive ? '#9F0013': ''})}>Comics</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;