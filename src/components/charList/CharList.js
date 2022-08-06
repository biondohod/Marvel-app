import { Component } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    }

    componentDidMount() {
        this.onUpdateChars()
    }
    
    marvelService = new MarvelService();

    onCharsLoaded= (charList) =>{
        this.setState({
            charList,
            loading: false, 
            error: false
        });
    }

    onCharsLoadedFailure = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    onUpdateChars = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onCharsLoadedFailure);
    }

    renderCharList() {
        const {charList} = this.state;

        const chars = charList.map(char => {
            const {thumbnail, name, id} = char;

            let styles = {};

            if (thumbnail.includes('image_not_available')) {
                styles = {objectFit: 'fill'};
            }
            return (
                <li key={id} className="char__item" onClick={() => this.props.onUpdateSelectedChar(id)}>
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

    render() {
        const {loading, error} = this.state;
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const charList = !(loading || error) ? this.renderCharList() : null;
        
        return(
            <section className="char__list">
                <h3 className="visually-hidden">Characters List</h3>
                {spinner}
                {errorMessage}
                {charList}
                <button className="button button__main button--long">
                    <div className="inner">Load more</div>
                </button>
            </section>
        )
    }   
}

export default CharList;