import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import './App.css';

function App() {
    return (
        <>
            <Header title="ToDo API" />
            <Main title="Vad vill du göra idag?" />
            <Footer />
        </>
    );
}

export default App;
