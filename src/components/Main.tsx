import '../assets/Main.scss';
import Cards from './Cards';
import Form from './Form';
import { useState } from 'react';

export default function Main({ title }: { title: string }) {
    const [todos, setTodos] = useState([
        {
            title: 'todo 1',
            description: 'en beskrivning',
            status: {
                onhold: true,
                inprogress: false,
                completed: false,
            },
        },
        {
            title: 'todo 2',
            description: 'en beskrivning',
            status: {
                onhold: true,
                inprogress: false,
                completed: false,
            },
        },
    ]);

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
                        <Form setTodos={setTodos} currentTodo={currentTodo} isEditingTodo={isEditingTodo} />
                    </div>
                )}

                <Cards todos={todos} setIsEditingTodo={setIsEditingTodo} setCurrentTodo={setCurrentTodo} />
            </section>
        </main>
    );
}
