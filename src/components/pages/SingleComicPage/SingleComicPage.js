import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import './SingleComicPage.scss';
import Page404 from '../404/404';


const SingleComicPage = () => {
    const {loading, error, getComic} = useMarvelService();

    const [comic, setComic] = useState(null);
    const [is404, setIs404] = useState(null);

    const { comicId } = useParams();


    useEffect(() => {
        updateComic();
    }, []);


    const updateComic = () => {
        getComic(comicId)
                    .then(result => {
                        const {res, errorCode} = result;
                        if (errorCode === 404) {
                            setIs404(true);
                        } else if (!errorCode) {
                            setComic(res);
                            setIs404(false);
                        } else {
                            setIs404(false);
                        }
                    });
    }

    const comicItem = !(loading || error || !comic) ? <View comic={comic}/> : null;
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error && !is404 ? <ErrorMessage/> : null;
    const page404 = error && is404 ? <Page404/> : null;

    return (
        <>
            {spinner}
            {errorMessage}
            {page404}
            {comicItem}
        </>
    );
};

const View = (props) => {
    const {title, description, pageCount, thumbnail, language, price, url} = props.comic;

    return (
        <section className="single-comic">
            <h2 className="visually-hidden">Information about the comic</h2>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
                <a href={url} className="button button__main">
                        <div className="inner">Marvel Comic Page</div>
                </a>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </section>
    )
}

export default SingleComicPage;