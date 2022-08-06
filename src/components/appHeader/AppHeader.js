/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from 'react';

import './appHeader.scss';

class AppHeader extends Component {
    
    render() {
        return( 
            <header className='app__header'>
                <h1 className="app__title">
                    <a href="#">
                    <span>Marvel</span> information portal
                    </a>
                </h1>
                <nav className="app__menu">
                    <ul className='app__menu__list'>
                        <li className='app__menu__item'>
                            <a href="#">Characters</a>
                        </li>
                        /
                        <li className='app__menu__item'>
                            <a href="#">Comics</a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default AppHeader;