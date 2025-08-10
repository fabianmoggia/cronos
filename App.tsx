import React, { useState } from 'react';
import GameScreen from './components/GameScreen';
import { HistoryIcon } from './components/icons';

// HomeScreen is defined outside App to prevent re-creation on re-renders.
const HomeScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden animate-fade-in">
            <div className="relative mb-8">
                <HistoryIcon className="w-32 h-32 text-bronze opacity-80" />
            </div>
             <h1 className="font-cinzel text-5xl md:text-7xl font-bold tracking-wider uppercase mb-4">
                <span className="text-parchment">Cro</span>
                <span className="text-bronze">nos</span>
            </h1>
            <p className="text-lg md:text-xl text-parchment/80 max-w-2xl mb-12 font-lora">
                Domina el arte de viajar en el tiempo convirtiendo años a siglos y viceversa.
            </p>
            <button
                onClick={onStart}
                className="bronze-button text-2xl px-12"
            >
                ¡Comenzar Aventura!
            </button>
             <div className="absolute bottom-4 text-center text-parchment/40 text-sm animate-fade-in [animation-delay:0.6s]">
                <p>Una herramienta de aprendizaje para exploradores del tiempo.</p>
            </div>
        </div>
    );
};

enum AppState {
    Home,
    Playing
}

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>(AppState.Home);

    const startGame = () => {
        setAppState(AppState.Playing);
    };

    switch (appState) {
        case AppState.Playing:
            return <GameScreen />;
        case AppState.Home:
        default:
            return <HomeScreen onStart={startGame} />;
    }
};

export default App;