/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';

class RandomChar extends Component {
    state = {
        char: {
            name: null,
            description: null,
            thumbnail: null,
            homepage: null,
            wiki: null
        },
        loading: true,
        error: false
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.UpdateChar();
    }

    onCharLoaded = (char) => {
        this.setState({
            error: false,
            char, 
            loading: false, 
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

    UpdateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharLoading();
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onCharLoadedFailure);
    }
    

    render() {
        const {char, loading, error} = this.state;

        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const randomChar = !(loading || error) ? <DynamicBlock char={char}/> : null;
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

const DynamicBlock = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;

    let descr = description;

    if (descr.length === 0) {
        descr = 'There is no information about this character yet'
    }
    if (descr.length > 214) {
        descr = descr.slice(0, 215) + '...';
    }

    let styles = {};

    if (thumbnail.includes('image_not_available')) {
        styles = {objectFit: 'fill'};
    }

    return (
        <div className="randomchar__block">
        <img src={thumbnail} alt="Random charater." className="randomchar__image" style={styles}/>
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