import Card from './Card';
import '../assets/Cards.scss';
import { useState } from 'react';

export default function Cards({ todos, setIsEditingTodo, setCurrentTodo }: { todos: any[], setIsEditingTodo: any, setCurrentTodo: any }) {
    return (
        <div className="site-content__cards">
            {todos.map((todo, index) => (
                <Card
                    key={index}
                    todo={todo}
                    setIsEditingTodo={setIsEditingTodo}
                    setCurrentTodo={setCurrentTodo}
                />
            ))}
        </div>
    );
}
