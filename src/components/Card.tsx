export default function Card({
    title,
    description,
    status,
}: {
    title: string;
    description: string;
    status: object;
}) {
    return (
        <div className="site-content__card">
            <div className="site-content__card-title-container">
                <div className="site-content__card-delete-button-container">
                    <button className="site-content__card-button">X</button>
                </div>
                <h2>{title}</h2>
            </div>
            <div className="site-content__card-inner-container">
                <p>{description}</p>
            </div>
            <div>
                <h3>Status</h3>

                <div className="site-content__card-buttons-container">
                    <button className="site-content__card-button site-content__card-button--onhold site-content__card-button--inactive">
                        P
                    </button>
                    <button className="site-content__card-button site-content__card-button--inprogress site-content__card-button--inactive">
                        S
                    </button>
                    <button className="site-content__card-button site-content__card-button--completed site-content__card-button--inactive">
                        C
                    </button>
                </div>
            </div>
        </div>
    );
}
