import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types'; 

import useMarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {
    const {baseOffset, loading, error, getAllCharacters} = useMarvelService();

    const btnLoadMore = useRef(null);

    const [charList, setCharList] = useState([]);
    const [offset, setOffset] = useState(baseOffset);
    const [newCharListLoading, setNewCharListLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);

    useEffect(() => {
        onUpdateChars();
        window.addEventListener('scroll', onUpdateCharsByScroll);
        
        return () => {
            window.removeEventListener('scroll', onUpdateCharsByScroll);
        }
    }, []);

    const onUpdateCharsByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            btnLoadMore.current.click();
        }
    }
    

    const onCharsLoaded= (newCharList) =>{
        if (newCharList.length < 9) {
            setCharEnded(true);
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewCharListLoading(false);
        setOffset(offset => offset + 9);
    }


    const onUpdateChars = (offset) => {
        setNewCharListLoading(true);
        getAllCharacters(offset)
            .then(onCharsLoaded);
    }

    const onKeyPressed = (evt) => {
        if (evt.key === ' ' || evt.key === "Enter") {
            evt.preventDefault();
            evt.target.click();
            evt.target.blur();
        }
    }

    const renderCharList = () => {
        const {onUpdateSelectedChar, selectedChar} = props;
        const chars = charList.map(char => {
            const {thumbnail, name, id} = char;

            let styles = {};

            if (thumbnail.includes('image_not_available') || thumbnail.includes('4c002e0305708')) {
                styles = {objectFit: 'fill'};
            }
            
            let classNames = 'char__item';

            if (id === selectedChar) {
                classNames += ' char__item--selected';
            }
            return (
                <li key={id} className={classNames} onClick={() => onUpdateSelectedChar(id)} tabIndex={0} onKeyDown={onKeyPressed}>
                    <img src={thumbnail} alt="name" style={styles}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                    {chars}
                </ul>
        );
    }


    const spinner = loading && !charList.length? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const renderedCharList = renderCharList();

    let btn = null;

    if (!charEnded && !error) {
        btn = (<button 
                ref={btnLoadMore}
                className="button button__main button--long" 
                disabled={newCharListLoading}
                onClick={() => onUpdateChars(offset)}>
                <div className="inner">{newCharListLoading ? 'Loading...' : 'Load more'}</div>
                </button>)
    }
    
    return(
        <section className="char__list">
            <h3 className="visually-hidden">Characters List</h3>
            {spinner}
            {errorMessage}
            {renderedCharList}
            {btn}
        </section>
    )

}

CharList.propTypes = {
    onUpdateSelectedChar: PropTypes.func
}
export default CharList;