import './Card.css'

type CardProps= {
    title: string;
    img : string;
    children: React.ReactNode;
}

const Card = ({title, img, children}: CardProps) => {
    return(
        <div className="card-item">
            {img && <img className="card-img" src={img} alt={title}/>}
            <div className="card-body">
                <h4 className="card-title">{title}</h4>
                <div className="card-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Card;
