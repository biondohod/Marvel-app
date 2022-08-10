/* eslint-disable jsx-a11y/anchor-is-valid */
import './comicsList.scss';

import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

const ComicsList = () => {
    return(
        <section className="comics__list">
            <h2 className="visually-hidden">Comics list</h2>
            <ul className="comics__grid">
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item__img"/>
                        <div className="comics__item__name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item__price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item__img"/>
                        <div className="comics__item__name">X-Men: Days of Future Past</div>
                        <div className="comics__item__price">Not available</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item__img"/>
                        <div className="comics__item__name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item__price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item__img"/>
                        <div className="comics__item__name">X-Men: Days of Future Past</div>
                        <div className="comics__item__price">Not available</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item__img"/>
                        <div className="comics__item__name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item__price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item__img"/>
                        <div className="comics__item__name">X-Men: Days of Future Past</div>
                        <div className="comics__item__price">Not available</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item__img"/>
                        <div className="comics__item__name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item__price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item__img"/>
                        <div className="comics__item__name">X-Men: Days of Future Past</div>
                        <div className="comics__item__price">Not available</div>
                    </a>
                </li>
            </ul>
            <button className="button button__main button--long">
                <div className="inner">load more</div>
            </button>
        </section>
    );
};

export default ComicsList;