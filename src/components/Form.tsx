import '../assets/Form.scss';
import { useState, useEffect } from 'react';
import { ToDo } from '../interfaces/ToDo';
import axios from 'axios';
import { getApiRoute } from '../utils/functions';
import { object, string, boolean } from 'yup';

export default function Form({
    setTodos,
    setCurrentTodo,
    currentTodo = {},
    isEditingTodo,
    setIsEditingTodo,
}: {
    setTodos: React.Dispatch<React.SetStateAction<any[]>>;
    setCurrentTodo: React.Dispatch<React.SetStateAction<any>>;
    currentTodo: any;
    isEditingTodo: boolean;
    setIsEditingTodo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [todo, setTodo] = useState<ToDo>({
        id: null,
        title: '',
        description: '',
        status: { onhold: false, inprogress: false, completed: false },
    });

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState({ onhold: true, inprogress: false, completed: false });

    const [editTodo, setEditTodo] = useState<ToDo>({
        id: currentTodo.id,
        title: currentTodo.title,
        description: currentTodo.description,
        status: currentTodo.status,
    });

    const [formErrors, setFormErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTodo({
            id: null,
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

    const todoSchema = object({
        title: string()
            .required('En ToDo måste ha en titel')
            .min(3, 'Titel måste vara minst 3 tecken'),
        description: string().max(200, 'Beskrivning får vara max 200 tecken'),
        status: object({
            onhold: boolean().required(),
            inprogress: boolean().required(),
            completed: boolean().required(),
        })
            .required()
            .test('one-true', 'En todo kan bara ha en status och måste ha en status', (status) => {
                if (!status) {
                    return false;
                }

                const trueCount = Object.values(status).filter(Boolean).length;

                return trueCount === 1;
            }),
    });

    const handleAddTodo = async (e: any) => {
        e.preventDefault();

        setIsLoading(true);

        const formData = {
            title: todo.title,
            description: todo.description,
            status: todo.status,
        };

        let validated = false;

        // Validate formdata.
        await todoSchema
            .validate(formData, { abortEarly: false })
            .then(() => {
                setFormErrors([]);
                validated = true;
            })
            .catch((err) => {
                setFormErrors(err.errors);
            });

        if (!validated) {
            setIsLoading(false);
            return;
        }

        // Send data to API.
        const createUrl = getApiRoute('/Create/');

        await axios
            .post(createUrl, formData)
            .then(function (response) {
                // If response is OK, update todos with response from API / current Todo.
                if (response.status === 200) {
                    setTodos((prevTodos) => [
                        ...prevTodos,
                        {
                            ...todo,
                            id: response.data[0].id,
                        },
                    ]);

                    setTitle('');
                    setDescription('');
                    setStatus({ onhold: true, inprogress: false, completed: false });
                    alert('ToDo lades till!');
                }
            })
            .catch(function (error) {
                console.log(error);
                alert('Något gick fel! Kunde inte lägga till ny ToDo');
            });

        setIsLoading(false);
    };

    const handleEditTodo = async (e: any) => {
        e.preventDefault();

        setIsLoading(true);

        const formData = {
            ...editTodo,
        };

        console.log(formData);

        let validated = false;

        // Validate formdata.
        await todoSchema
            .validate(formData, { abortEarly: false })
            .then(() => {
                setFormErrors([]);
                validated = true;
            })
            .catch((err) => {
                setFormErrors(err.errors);
            });

        if (!validated) {
            setIsLoading(false);
            return;
        }

        // Send data to API.
        const editUrl = getApiRoute('/Update/');

        await axios
            .post(editUrl, formData)
            .then(function (response) {
                // If response is OK, update todos with response from API / current Todo.
                if (response.status === 200) {
                    setTodos((prevTodos) => {
                        const updatedTodo = {
                            ...response.data[0],
                            status: JSON.parse(response.data[0].status),
                        };

                        return prevTodos.map((item) =>
                            item.id === updatedTodo.id ? { ...item, ...updatedTodo } : item
                        );
                    });

                    setTitle('');
                    setDescription('');
                    setStatus({ onhold: true, inprogress: false, completed: false });
                    setIsEditingTodo(false);
                    setCurrentTodo({});
                    alert('ToDo uppdaterades!');
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                alert('Något gick fel! Kunde inte uppdatera ToDo');
            });

        setIsLoading(false);
    };

    const handleDeleteTodo = async (e: any) => {
        e.preventDefault();

        setIsLoading(true);

        // Send data to API.
        const deleteUrl = getApiRoute('/Delete/');

        await axios
            .post(deleteUrl, { id: currentTodo.id })
            .then(function (response) {
                // If response is OK, update todos by removing the deleted item
                if (response.status === 200) {
                    setTodos((prevTodos) => {
                        return prevTodos.filter((item) => item.id !== currentTodo.id);
                    });

                    setTitle('');
                    setDescription('');
                    setStatus({ onhold: true, inprogress: false, completed: false });
                    setIsEditingTodo(false);
                    setCurrentTodo({});
                    alert('ToDo raderades!');
                }
            })
            .catch(function (error) {
                console.log(error);
                alert('Något gick fel! Kunde inte radera ToDo');
            });

        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <p>Laddar...</p>}
            {!isLoading && (
                <form id="addTodoForm">
                    <h4>{isEditingTodo ? 'Redigera todo' : 'Lägg till ny todo'}</h4>

                    <ul>
                        {formErrors.map((formError, index) => {
                            return (
                                <li key={index} style={{ color: 'red' }}>
                                    {formError}
                                </li>
                            );
                        })}
                    </ul>

                    <fieldset>
                        <label htmlFor="title">Titel</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={isEditingTodo ? editTodo.title : title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                editTodo.title = e.target.value;
                            }}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="description">Beskrivning</label>
                        <textarea
                            name="description"
                            id="description"
                            rows={10}
                            value={isEditingTodo ? editTodo.description : description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                editTodo.description = e.target.value;
                            }}
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
                                checked={isEditingTodo ? editTodo.status.onhold : status.onhold}
                                onChange={() => {
                                    setStatus({
                                        onhold: true,
                                        inprogress: false,
                                        completed: false,
                                    });

                                    if (isEditingTodo) {
                                        editTodo.status = {
                                            onhold: true,
                                            inprogress: false,
                                            completed: false,
                                        };
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="inprogress">Pågående</label>
                            <input
                                type="radio"
                                name="status"
                                id="inprogress"
                                value="inprogress"
                                checked={
                                    isEditingTodo ? editTodo.status.inprogress : status.inprogress
                                }
                                onChange={() => {
                                    setStatus({
                                        onhold: false,
                                        inprogress: true,
                                        completed: false,
                                    });

                                    if (isEditingTodo) {
                                        editTodo.status = {
                                            onhold: false,
                                            inprogress: true,
                                            completed: false,
                                        };
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="completed">Avklarad</label>
                            <input
                                type="radio"
                                name="status"
                                id="completed"
                                value="completed"
                                checked={
                                    isEditingTodo ? editTodo.status.completed : status.completed
                                }
                                onChange={() => {
                                    setStatus({
                                        onhold: false,
                                        inprogress: false,
                                        completed: true,
                                    });

                                    if (isEditingTodo) {
                                        editTodo.status = {
                                            onhold: false,
                                            inprogress: false,
                                            completed: true,
                                        };
                                    }
                                }}
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
            )}
        </>
    );
}
