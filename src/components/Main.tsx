import '../assets/Main.scss';
import Cards from './Cards';
import { useState } from 'react';

export default function Main({ title }: { title: string }) {
    return (
        <main className="site-content">
            <section>
                <h1>{title}</h1>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexDirection: 'row'}}>
                    <p>Lägg till ny ToDo eller hantera befintliga.</p>
                    <button>+</button>
                </div>

                <Cards />
            </section>
        </main>
    );
}
