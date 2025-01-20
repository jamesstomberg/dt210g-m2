export default function Card({ title, description, status } : {title: string, description: string, status: object}) {
    return (
        <div
            className="site-content__card"
        >
            <div className="site-content__card-inner-container">
                <p>
                    {description}
                </p>
            </div>
            <p>{title}</p>
        </div>
    );
}
