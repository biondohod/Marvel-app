/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';


class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidUpdate(prevProps) {
        if (this.props.selectedChar !== prevProps.selectedChar) {
            this.updateChar();
        }
    }

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false, 
            error: false,
        });
    }

    onCharLoading = () => {
        this.setState({
            loading: true,
            error: false
        });
    }

    onCharLoadedFailure = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const id = this.props.selectedChar;

        if (!id) {
            return;
        }

        this.onCharLoading();
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onCharLoadedFailure);
    }

    render() {
        const {char, loading, error} = this.state;

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
    }
};

class View extends Component {

    state = {
        comics: null,
        isHideButton: true
    }

    checkDescription(description) {
        if (description.length === 0) {
            return 'There is no information about this character yet'
        }
        if (description.length > 214) {
            return description.slice(0, 215) + '...';
        }
        return description;
    }

    renderComicsList(comicsList) {
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
            this.setState({
                comics,
                isHideButton: false
            });
        } else {
            this.setState({comics});
        }
    }

    showAllComics = (comicsList) => {
        let comics = comicsList.map((comic, i) => {
            return(
                <li className="char__comics__item" key={i}>
                    <a href={comic.url}>{comic.name}</a>
                </li>
            )
        });
        this.setState({
            comics,
            isHideButton: true
        });
    }

    componentDidMount() {
        const {comicsList} = this.props.char;
        this.renderComicsList(comicsList);
    }

    render() {
        const {name, description, thumbnail, homepage, wiki, comicsList} = this.props.char;
        const {comics, isHideButton} = this.state;

        let descr = this.checkDescription(description);
    
        let styles = {};
    
        if (thumbnail.includes('image_not_available')) {
            styles = {objectFit: 'fill'};
        }

        const btn = (
            <button href={wiki} className="button button__main button--long" onClick={() => this.showAllComics(comicsList)}>
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
    }
    
};

export default CharInfo;