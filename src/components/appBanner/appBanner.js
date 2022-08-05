import { Component } from "react";

import './appBanner.scss';

import avengers from '../../resources/img/Avengers.png';
import avengersLogo from '../../resources/img/Avengers_logo.png'

class AppBanner extends Component {
    render() {
        return(
            <aside className="app__banner">
                <img src={avengers} aria-hidden="true"/>
                <div className="app__banner__text">
                New comics every week!<br/>Stay tuned!
                </div>
                <img src={avengersLogo} aria-hidden="true"/>
            </aside>
        );
    }
};

export default AppBanner;