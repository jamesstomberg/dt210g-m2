import '../assets/Main.scss';
import Cards from './Cards';
import Form from './Form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToDo } from '../interfaces/ToDo';
import { getApiRoute } from '../utils/functions';

export default function Main({ title }: { title: string }) {
    const [todos, setTodos] = useState<ToDo[]>([]);

    const getTodos = async () => {
        const getUrl = getApiRoute('/Read/');

        axios
            .get(getUrl)
            .then(function (response) {
                setTodos((prevTodos) => [
                    ...prevTodos,
                    ...response.data.map((todo: ToDo) => {
                        return {
                            id: todo.id,
                            title: todo.title,
                            description: todo.description,
                            status:
                                typeof todo.status === 'string'
                                    ? JSON.parse(todo.status)
                                    : todo.status,
                        };
                    }),
                ]);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    };

    useEffect(() => {
        getTodos();
    }, []);

    const [isAddingTodo, setIsAddingTodo] = useState(false);
    const [isEditingTodo, setIsEditingTodo] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({});

    return (
        <main className="site-content">
            <section>
                <h1>{title}</h1>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '0.5rem',
                        flexDirection: 'row',
                    }}
                >
                    <p>Lägg till ny ToDo eller hantera befintliga.</p>
                    <button
                        onClick={() => {
                            setIsAddingTodo(!isAddingTodo);
                            setIsEditingTodo(false);
                        }}
                    >
                        {isAddingTodo ? '-' : '+'}
                    </button>
                </div>

                <div>
                    <p>Status: P = Ej påbörjad, S = Pågående, C = Avklarad</p>
                </div>

                {isAddingTodo && (
                    <div style={{ maxWidth: '500px' }}>
                        <Form setTodos={setTodos} isEditingTodo={isEditingTodo} />
                    </div>
                )}

                {isEditingTodo && (
                    <div style={{ maxWidth: '500px' }}>
                        <Form
                            setTodos={setTodos}
                            currentTodo={currentTodo}
                            setCurrentTodo={setCurrentTodo}
                            isEditingTodo={isEditingTodo}
                            setIsEditingTodo={setIsEditingTodo}
                        />
                    </div>
                )}

                <Cards
                    todos={todos}
                    setIsEditingTodo={setIsEditingTodo}
                    setCurrentTodo={setCurrentTodo}
                    setIsAddingTodo={setIsAddingTodo}
                />
            </section>
        </main>
    );
}
