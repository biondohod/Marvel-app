import { useState } from "react";

import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [selectedChar, setselectedChar] = useState(null);

    const onUpdateSelectedChar = (id) => {
        setselectedChar(id);
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar/> 
            </ErrorBoundary>
            <section className="char__content">
            <h2 className="visually-hidden">Characters</h2>
            <ErrorBoundary>
                <CharList selectedChar={selectedChar} onUpdateSelectedChar={onUpdateSelectedChar}/> 
            </ErrorBoundary>
            <ErrorBoundary>
                <CharInfo selectedChar={selectedChar}/>
            </ErrorBoundary>
            </section>
            <img src={decoration} alt="vision" aria-hidden="true" className="bg-decoration" />
        </>
    )
};

export default MainPage;