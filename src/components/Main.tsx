import '../assets/Main.scss';
import Cards from './Cards';
import { useState } from 'react';

export default function Main({ title }: { title: string }) {
    const [clickedDog, setClickedDog] = useState('');

    return (
        <main className="site-content">
            <section>
                <h1>{title}</h1>

                {clickedDog && <p>Du har klickat på: {clickedDog}</p>}

                <Cards setClickedDog={setClickedDog} />
            </section>
        </main>
    );
}
