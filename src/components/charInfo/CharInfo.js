import PropTypes from 'prop-types'; 
import { useEffect, useState } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

const CharInfo = (props) => {
    const {loading, error, getCharacter} = useMarvelService();

    const [char, setChar] = useState(null);

    const {selectedChar} = props;

    useEffect(() => {
        updateChar();
    }, [selectedChar]);


    const updateChar = () => {
        const id = selectedChar;

        if (!id) {
            return;
        }

        getCharacter(id)
            .then(setChar)
    }

    const character = !(loading || error || !char) ? <View char={char}/> : null;
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const skeleton = !(loading || error || char) ? <Skeleton/> : null;

    return(
        <section className="char__info">
            {character}
            {spinner}
            {errorMessage}
            {skeleton}
        </section>
    );
};

const View = (props) => {
    const [comics, setComics] = useState(null);
    const [isHideButton, setIsHideButton] = useState(true);

    useEffect(() => {
        const {comicsList} = props.char;
        renderComicsList(comicsList);
    }, []);

    const checkDescription = (description) => {
        if (description.length === 0) {
            return 'There is no information about this character yet'
        }
        if (description.length > 214) {
            return description.slice(0, 215) + '...';
        }
        return description;
    }

    const renderComicsList = (comicsList) => {
        let moreThan10 = false;
        let comics = comicsList.map((comic, i) => {
            let style = {};
            if (i > 9) {
                style = {display: 'none'};
                moreThan10 = true;
            }
            return(
                <li className="char__comics__item" key={i} style={style}>
                    <a href={comic.url}>{comic.name}</a>
                </li>
            )
        });
    
        if (comics.length === 0) {
            comics = 'This character has not appeared in any comics.';
        }

        if (moreThan10) {
            setComics(comics);
            setIsHideButton(false);
        } else {
            setComics(comics);
        }
    }

    const showAllComics = (comicsList) => {
        let comics = comicsList.map((comic, i) => {
            return(
                <li className="char__comics__item" key={i}>
                    <a href={comic.url}>{comic.name}</a>
                </li>
            )
        });
        setComics(comics);
        setIsHideButton(true);
    }

        const {name, description, thumbnail, homepage, wiki, comicsList} = props.char;

        let descr = checkDescription(description);
    
        let styles = {};
    
        if (thumbnail.includes('image_not_available')) {
            styles = {objectFit: 'fill'};
        }

        const btn = (
            <button href={wiki} className="button button__main button--long" onClick={() => showAllComics(comicsList)}>
                <div className="inner">Show more comics</div>
            </button>
        );

    return (
        <>
            <h3 className="visually-hidden">Selected character info</h3>
            <div className="char__basics">
                <img src={thumbnail} alt={name} className="char__image" style={styles}/>
                <div>
                    <div className="char__name--info">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {descr}
            </div>
            <div className="char__comics">
                <span>Comics: </span> 
                <ul className="char__comics__list">
                    {comics}
                    {!isHideButton ? btn : null}
                </ul>
            </div>
        </>
    )
    
};

CharInfo.propTypes = {
    selectedChar: PropTypes.number
}

export default CharInfo;