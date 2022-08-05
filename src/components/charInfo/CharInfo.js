/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from 'react';

import './charInfo.scss';

import thor from '../../resources/img/thor.jpeg';

class CharInfo extends Component {
    render() {
        return(
            <section className="char__info">
                <h3 className="visually-hidden">Selected character info</h3>
                <div className="char__basics">
                    <img src={thor} alt="Thor." className="char__image" />
                    <div>
                        <div className="char__name--info">Thor</div>
                        <div className="char__btns">
                            <a href="#" className="button button__main">
                                <div className="inner">Homepage</div>
                            </a>
                            <a href="#" className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, 
                    and the brother of Helblindi and Býleistr. By the jötunn Angrboða, 
                    Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. 
                    By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, 
                    Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. 
                    In addition, Loki is referred to as the father of Váli in the Prose Edda.
                </div>
                <div className="char__comics">
                    <span>Comics: </span> 
                    <ul className="char__comics__list">
                    <li className="char__comics__item">
                        All-Winners Squad: Band of Heroes (2011) #3
                    </li>
                    <li className="char__comics__item">
                        Alpha Flight (1983) #50
                    </li>
                    <li className="char__comics__item">
                        Amazing Spider-Man (1999) #503
                    </li>
                    <li className="char__comics__item">
                        Amazing Spider-Man (1999) #504
                    </li>
                    <li className="char__comics__item">
                        AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                    </li>
                    <li className="char__comics__item">
                        Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
                    </li>
                    <li className="char__comics__item">
                        Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
                    </li>
                    <li className="char__comics__item">
                        Vengeance (2011) #4
                    </li>
                    <li className="char__comics__item">
                        Avengers (1963) #1
                    </li>
                    <li className="char__comics__item">
                        Avengers (1996) #1
                    </li>
                </ul>
                </div>
            </section>
        );
    }
};

export default CharInfo;