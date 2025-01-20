import Card from './Card';
import '../assets/Cards.scss';

export default function Cards() {
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
