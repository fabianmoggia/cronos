import React from 'react';
import { FeedbackInfo, GameMode } from '../types';
import { toRoman, getCenturyFromYear } from '../utils/time';

interface FeedbackPanelProps {
  feedback: FeedbackInfo;
  gameMode: GameMode;
  onClose: () => void;
}

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ feedback, gameMode, onClose }) => {
  const { challenge, explanation, userAnswer, userAnswerValue, userAnswerEra } = feedback;

  const renderExplanation = () => {
    if (gameMode === GameMode.YearToCentury) {
      return (
        <div>
          <h3 className="text-xl font-bold font-cinzel text-accent-red">¿Cómo se calcula?</h3>
          <p className="mt-2 text-text-dark" style={{ whiteSpace: 'pre-wrap' }}>{explanation}</p>
           <p className="mt-4 text-gray-700">
            La respuesta correcta es <span className="font-bold text-accent-green">{feedback.correctAnswer}</span>.
          </p>
        </div>
      );
    } else { // CenturyToYear
       if (!userAnswerValue || !userAnswerEra) {
         return (
           <div>
             <h3 className="text-xl font-bold font-cinzel text-accent-red">Revisa tu respuesta</h3>
             <p className="mt-2 text-text-dark" style={{ whiteSpace: 'pre-wrap' }}>{explanation}</p>
           </div>
         );
       }
      const userAnswerNum = parseInt(userAnswerValue, 10);
      const correctCenturyForUserAnswer = toRoman(getCenturyFromYear(userAnswerNum, userAnswerEra));

      return (
        <div>
          <h3 className="text-xl font-bold font-cinzel text-accent-red">¡Casi! Veamos el rango correcto.</h3>
          <p className="mt-4 text-text-dark">{explanation}</p>
          <p className="mt-2 text-gray-700">
            El año que escribiste, <span className="font-bold text-accent-red">{userAnswer}</span>, pertenece al siglo <span className="font-bold text-accent-green">{correctCenturyForUserAnswer} {userAnswerEra}</span>.
          </p>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="parchment-pane w-full max-w-md text-center p-6 sm:p-8">
        <h2 className="text-3xl font-bold font-cinzel text-accent-red">¡Sigue intentando!</h2>
        <div className="my-6 text-left p-4 bg-black/5 rounded-lg border border-black/10">
          <p className="text-gray-700 mb-2">Desafío:</p>
          <p className="text-2xl font-bold font-cinzel text-bronze">
            {gameMode === GameMode.YearToCentury
              ? `Año ${challenge.year} ${challenge.era}`
              : `Siglo ${challenge.century && toRoman(challenge.century)} ${challenge.era}`}
          </p>
          <hr className="my-4 border-black/10"/>
          {renderExplanation()}
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Si tienes dudas, ¡usa el botón de ayuda (?) para repasar las reglas!
        </p>
        <button
          onClick={onClose}
          className="bronze-button w-full"
        >
          ¡Entendido!
        </button>
      </div>
    </div>
  );
};

export default FeedbackPanel;