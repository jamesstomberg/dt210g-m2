import Card from './Card';
import '../assets/Cards.scss';
import { useState } from 'react';

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
        <div className="site-content__cards">
            {todos.map((todo, index) => (
                <Card
                    key={index}
                    todo={todo}
                    setIsEditingTodo={setIsEditingTodo}
                    setCurrentTodo={setCurrentTodo}
                    setIsAddingTodo={setIsAddingTodo}
                />
            ))}
        </div>
    );
}
