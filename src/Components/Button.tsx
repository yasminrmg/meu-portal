import './Button.css';

type ButtonProps = {
    text: string;
    buttonType: string;
    onClick?: () => void;

}

const Button =({text, buttonType, onClick}: ButtonProps) => {
    return(
        <button className={`Button ${buttonType}`} onClick={onClick} type="button">{text}</button>
    );
};

export default Button;