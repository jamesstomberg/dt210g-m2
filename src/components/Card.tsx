import SvgLogo from './SvgLogo';
import editLogo from '../assets/images/pen-to-square-solid.svg';

export default function Card({
    todo,
    setIsEditingTodo,
    setCurrentTodo,
    setIsAddingTodo,
}: {
    todo: any;
    setIsEditingTodo: any;
    setCurrentTodo: any;
    setIsAddingTodo: any;
}) {
    return (
        <div className="site-content__card">
            <div className="site-content__card-title-container">
                <div className="site-content__card-top-button-container">
                    <button
                        className="site-content__card-button site-content__card-button--edit"
                        onClick={() => {
                            setIsEditingTodo(true);
                            setIsAddingTodo(false);
                            setCurrentTodo(todo);
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth',
                            });
                        }}
                    >
                        <SvgLogo src={editLogo} className="edit-logo" alt="Edit Logo" />
                    </button>
                </div>
                <h3>{todo.title}</h3>
            </div>
            <div className="site-content__card-inner-container">
                <p>{todo.description}</p>
            </div>
            <div>
                <h4>Status</h4>

                <div className="site-content__card-buttons-container">
                    <button
                        className={`site-content__card-button site-content__card-button--onhold ${
                            !todo.status.onhold ? 'site-content__card-button--inactive' : ''
                        }`}
                    >
                        P
                    </button>
                    <button
                        className={`site-content__card-button site-content__card-button--inprogress ${
                            !todo.status.inprogress ? 'site-content__card-button--inactive' : ''
                        }`}
                    >
                        S
                    </button>
                    <button
                        className={`site-content__card-button site-content__card-button--completed ${
                            !todo.status.completed ? 'site-content__card-button--inactive' : ''
                        }`}
                    >
                        C
                    </button>
                </div>
            </div>
        </div>
    );
}
