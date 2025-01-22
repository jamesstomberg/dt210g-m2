import Card from './Card';
import '../assets/Cards.scss';

export default function Cards({
    todos,
    setIsEditingTodo,
    setCurrentTodo,
    setIsAddingTodo,
}: {
    todos: any[];
    setIsEditingTodo: any;
    setCurrentTodo: any;
    setIsAddingTodo: any;
}) {
    return (
        <>
            <h2>ToDo:s</h2>

            <div className="site-content__cards">
                {todos.map((todo, index) => {
                    return (
                        <Card
                            key={index}
                            todo={todo}
                            setIsEditingTodo={setIsEditingTodo}
                            setCurrentTodo={setCurrentTodo}
                            setIsAddingTodo={setIsAddingTodo}
                        />
                    );
                })}
            </div>
        </>
    );
}
