/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState, useRef } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = (props) => {
    const { getAllComics, loading, error, baseOffset } = useMarvelService();

    const btnLoadMore = useRef(null);

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(baseOffset);
    const [newComicsListLoading, setNewComicsListLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    useEffect(() => {
        onUpdateChars(offset);
        getAllComics();

        window.addEventListener('scroll', onUpdateComicsByScroll);
        
        return () => {
            window.removeEventListener('scroll', onUpdateComicsByScroll);
        }
    }, []);

    const onUpdateComicsByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            btnLoadMore.current.click();
        }
    }

    const onComicsLoaded= (newComicsList) =>{
        if (newComicsList.length < 8) {
            setComicsEnded(true);
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewComicsListLoading(false);
        setOffset(offset => offset + 9);
    };

    const onUpdateChars = (offset) => {
        setNewComicsListLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded);
    }

    const renderComicsList = () => {
        const comics = comicsList.map(comics => {
            const {id, price, thumbnail, title} = comics;

            return (
                <>
                    <li key={id} className="comics__item">
                        <a href="#">
                            <img src={thumbnail} alt={title}  className="comics__item__img"/>
                            <div className="comics__item__name">{title}</div>
                            <div className="comics__item__price">{price}</div>
                        </a>
                    </li>
                </>
            )
        });

        return (
            <ul className="comics__grid">
                {comics}
            </ul>
        );
    };

    const spinner = loading && !comicsList.length? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const renderedComicsList = renderComicsList();

    let btn = null;

    if (!comicsEnded && !error) {
        btn = (<button 
                ref={btnLoadMore}
                className="button button__main button--long" 
                disabled={newComicsListLoading}
                onClick={() => onUpdateChars(offset)}>
                <div className="inner">{newComicsListLoading ? 'Loading...' : 'Load more'}</div>
                </button>)
    }

    return(
        <section className="comics__list">
            <h2 className="visually-hidden">Comics list</h2>
            {spinner}
            {errorMessage}
            {renderedComicsList}
            {btn}
        </section>
    );
};

export default ComicsList;