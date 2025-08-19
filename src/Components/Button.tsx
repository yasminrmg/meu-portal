import './Button.css';

type ButtonProps = {
    text: string;
    buttonType: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

const Button =({text, buttonType, onClick, type = 'button'}: ButtonProps) => {
    return(
        <button className={`Button ${buttonType}`} onClick={onClick} type={type}>{text}</button>
    );
};

export default Button;