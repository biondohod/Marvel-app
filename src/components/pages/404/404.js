import { Link } from 'react-router-dom';

import './404.scss';
import img from './404.jpg';

const Page404 = () => {
    const goToPrevPage = () => {
        window.history.back();
    }

    return (
        <div className="page404">
            <div className="page404__text__wrapper">
                <p className="page404__title">
                    4<span>0</span>4
                </p>
                <p className="page404__text">
                    Page <span>not found</span>. <br/>
                    Сheck the spelling of the address or return to the main page
                </p>
                <div className="page404__btns">
                    <Link to='/'>
                        <button className="button button__main">
                            <div className="inner">Back to main page</div>
                        </button>
                    </Link>
                    <button onClick={goToPrevPage} className="button button__secondary">
                            <div className="inner">Back to previous page</div>
                    </button>
                </div>
            </div>
            <img className="page404__img heartBeat" src={img} alt={'404.'} />
        </div>
    )
};

export default Page404;