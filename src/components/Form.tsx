import '../assets/Form.scss';
import { useState, useEffect } from 'react';

interface ToDo {
    title: string;
    description: string;
    status: {
        onhold: boolean;
        inprogress: boolean;
        completed: boolean;
    };
}

export default function Form({
    setTodos,
    currentTodo = {},
    isEditingTodo,
    setIsEditingTodo,
}: {
    setTodos: React.Dispatch<React.SetStateAction<any[]>>;
    currentTodo: object;
    isEditingTodo: boolean;
    setIsEditingTodo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [todo, setTodo] = useState<ToDo>({
        title: '',
        description: '',
        status: { onhold: false, inprogress: false, completed: false },
    });

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState({ onhold: true, inprogress: false, completed: false });

    useEffect(() => {
        setTodo({
            title,
            description,
            status,
        });
    }, [title, description, status]);

    useEffect(() => {
        if (Object.keys(currentTodo).length) {
            setTodo(currentTodo as ToDo);
        }
    });

    const handleAddTodo = async (e: any) => {
        e.preventDefault();

        // Validate formdata.

        // Send data to API.

        // If response is OK, update todos with response from API / current Todo.
        if (true) {
            setTodos((prevTodos) => [...prevTodos, todo]);
        }
        console.log(todo);
    };

    const handleEditTodo = async (e: any) => {
        e.preventDefault();
        console.log('edited');
        console.log(currentTodo);
    };

    const handleDeleteTodo = async (e: any) => {
        e.preventDefault();
        console.log('delete todo');
        console.log(currentTodo);
    };

    return (
        <form id="addTodoForm">
            <h4>{isEditingTodo ? 'Redigera todo' : 'Lägg till ny todo'}</h4>

            <fieldset>
                <label htmlFor="title">Titel</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </fieldset>
            <fieldset>
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    id="description"
                    rows={10}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </fieldset>
            <fieldset id="radioGroup">
                <div>
                    <label htmlFor="onhold">Ej påbörjad</label>
                    <input
                        type="radio"
                        name="status"
                        id="onhold"
                        value="onhold"
                        checked={status.onhold}
                        onChange={() =>
                            setStatus({ onhold: true, inprogress: false, completed: false })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="inprogress">Pågående</label>
                    <input
                        type="radio"
                        name="status"
                        id="inprogress"
                        value="inprogress"
                        checked={status.inprogress}
                        onChange={() =>
                            setStatus({ onhold: false, inprogress: true, completed: false })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="completed">Avklarad</label>
                    <input
                        type="radio"
                        name="status"
                        id="completed"
                        value="completed"
                        checked={status.completed}
                        onChange={() =>
                            setStatus({ onhold: false, inprogress: false, completed: true })
                        }
                    />
                </div>
            </fieldset>

            {!isEditingTodo && (
                <input
                    type="submit"
                    value="Lägg till"
                    onClick={(e) => {
                        handleAddTodo(e);
                    }}
                />
            )}

            {isEditingTodo && (
                <div className="edit-todo-buttons">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setIsEditingTodo(false);
                        }}
                    >
                        Stäng
                    </button>
                    <input
                        type="submit"
                        value="Ta bort"
                        onClick={(e) => {
                            handleDeleteTodo(e);
                        }}
                    />
                    <input
                        type="submit"
                        value="Uppdatera"
                        onClick={(e) => {
                            handleEditTodo(e);
                        }}
                    />
                </div>
            )}
        </form>
    );
}
