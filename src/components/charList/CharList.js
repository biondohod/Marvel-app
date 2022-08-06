import { Component } from "react";


import MarvelService from "../../services/MarvelService";


import './charList.scss';

class CharList extends Component {
    state = {
        charList: []
    }
    componentDidMount() {
        this.onUpdateChars()
    }
    
    marvelService = new MarvelService();

    onCharsLoaded= (chars) =>{
        this.setState({
            charList: chars.map((char) => {
                const {thumbnail, name, id} = char;

                let styles = {};

                if (thumbnail.includes('image_not_available')) {
                    styles = {objectFit: 'fill'};
                }

                return (
                    <li key={id} className="char__item">
                        <img src={thumbnail} alt="name" style={styles}/>
                        <div className="char__name">{name}</div>
                    </li>
                )
            })
        });
    }

    onUpdateChars = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharsLoaded)
    }

    render() {
        const {charList} = this.state;
        return(
            <section className="char__list">
                <h3 className="visually-hidden">Characters List</h3>
                <ul className="char__grid">
                    {charList}
                </ul>
                <button className="button button__main button--long">
                    <div className="inner">Load more</div>
                </button>
            </section>
        )
    }   
}

export default CharList;