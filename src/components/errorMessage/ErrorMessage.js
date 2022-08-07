import error from './error.gif';
import './errorMessage.scss';

const ErrorMessage = () => {
    return (
        <div className="error">
            <img src={error} alt="error." className='error__img'/>
            <p className="error__text">
                <span>Oops!</span> Something went wrong, please try again and if this does not solve the problem, try again later
            </p>
        </div>
    )
};

export default ErrorMessage;