import Card from './Card';
import '../assets/Cards.scss';
import { useState } from 'react';

export default function Cards() {
    const [statuses, setStatuses] = useState([]);

    return (
        <div className="site-content__cards">
            {/*<Card key={index} src={src} alt={alt} title={title} />;*/}
            <Card title="En todo" description="en beskrivning" status={{}} />
            <Card title="En todo" description="en beskrivning" status={{}} />
            <Card title="En todo" description="en beskrivning" status={{}} />
            <Card title="En todo" description="en beskrivning" status={{}} />
        </div>
    );
}
