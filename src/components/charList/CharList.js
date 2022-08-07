import { Component } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    marvelService = new MarvelService();

    state = {
        charList: [],
        loading: true,
        error: false,
        offset: this.marvelService._baseOffset,
        newCharListLoading: false,
        charEnded: false,
        showUpButton: false
    }

    componentDidMount() {
        this.onUpdateChars();
        window.addEventListener('scroll', this.onUpdateCharsByScroll);
    }

    componentWillUnmount() {
        window.removerEventListener('scroll', this.onUpdateCharsByScroll);
    }

    onUpdateCharsByScroll = () => {
        const {offset} = this.state;
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            this.onUpdateChars(offset);
        }
    }
    

    onCharsLoaded= (newCharList) =>{
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false, 
            newCharListLoading: false,
            offset: offset + 9,
            error: false,
            charEnded: ended
        }));
    }

    onCharsLoadedFailure = () => {
        this.setState({
            error: true,
            loading: false,
            newCharListLoading: false
        })
    }

    onCharLoading = () => {
        this.setState({
            newCharListLoading: true
        })
    }

    onUpdateChars = (offset) => {
        this.onCharLoading();
        this.marvelService
            .getAllCharacters(offset)
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
        const {loading, error, offset, newCharListLoading ,charEnded} = this.state;
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const charList = !(loading || error) ? this.renderCharList() : null;

        let btn = null;

        if (!charEnded) {
            btn = (<button 
                    className="button button__main button--long" 
                    disabled={newCharListLoading}
                    onClick={() => this.onUpdateChars(offset)}>
                    <div className="inner">{newCharListLoading ? 'Loading...' : 'Load more'}</div>
                   </button>)
        }
        
        return(
            <section className="char__list">
                <h3 className="visually-hidden">Characters List</h3>
                {spinner}
                {errorMessage}
                {charList}
                {btn}
            </section>
        )
    }   
}

export default CharList;