import './Card.css'

type CardProps= {
    title: string;
    img? : string;
    children: React.ReactNode;
}

const Card = ({title, img, children}: CardProps) => {
    return(
        <div className="card-item">
            {img && <div className='card-img-container'>
                {img && <img className="card-img" src={img} alt={title}/>}
            </div>}
            <div className="card-body">
                <h4 className="card-title">{title}</h4>
                    {children}
            </div>
        </div>
    );
};

export default Card;
