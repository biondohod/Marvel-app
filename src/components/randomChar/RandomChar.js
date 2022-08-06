/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';

import thor from '../../resources/img/thor.jpeg';

class RandomChar extends Component {

    state = {
        char: {
            name: 'Thor',
            description: "As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made,the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...",
            thumbnail: thor,
            homepage: null,
            wiki: null
        },
        loading: false,
        error: false
    }
    
    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({
            error: false,
            char, 
            loading: false, 
        });
    }

    onCharLoadedFailure = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    UpdateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.setState({
            loading: true,
            error: false
        });
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onCharLoadedFailure);
    }
    

    render() {
        const {char, loading, error} = this.state;

        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const randomChar = !(loading || error) ? DynamicBlock(char) : null;
        return(
            <section className="randomchar">
                <h2 className="visually-hidden">Random Character</h2>
                {errorMessage}
                {spinner}
                {randomChar}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!
                        <br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title randomchar__title--second">
                        Or choose another one
                    </p>
                    <button onClick={this.UpdateChar} className="button button__main">
                        <div className="inner">Try It</div>
                    </button>
                </div>
            </section>
        );
    }
};

const DynamicBlock = (char) => {
    const {name, description, thumbnail, homepage, wiki} = char;

    let descr = description;

    if (descr.length === 0) {
        descr = 'There is no information about this character yet'
    }
    if (descr.length > 214) {
        descr = descr.slice(0, 215) + '...';
    }

    return (
        <div className="randomchar__block">
        <img src={thumbnail} alt="Random charater." className="randomchar__image" />
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {descr}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">Homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
            </div>
        </div>
    );
}

export default RandomChar;