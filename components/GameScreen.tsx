import React, { useState, useEffect, useCallback } from 'react';
import { GameMode, Challenge, FeedbackInfo, Era } from '../types';
import { generateRandomYear, generateRandomCentury, getCenturyFromYear, toRoman, getYearRangeForCentury, isYearInCentury } from '../utils/time';
import FeedbackPanel from './FeedbackPanel';
import HelpModal from './HelpModal';
import { CheckIcon, BookOpenIcon } from './icons';

const GameScreen: React.FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.YearToCentury);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<FeedbackInfo | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  
  const [showCorrectFeedback, setShowCorrectFeedback] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [formatWarning, setFormatWarning] = useState<string | null>(null);

  const generateNewChallenge = useCallback(() => {
    setUserAnswer('');
    setFeedback(null);
    setIsAnimating(true);
    setTimeout(() => {
      if (gameMode === GameMode.YearToCentury) {
        setChallenge(generateRandomYear());
      } else {
        setChallenge(generateRandomCentury());
      }
      setIsAnimating(false);
    }, 300);
  }, [gameMode]);

  useEffect(() => {
    generateNewChallenge();
  }, [gameMode, generateNewChallenge]);
  
  const handleAnswerSubmission = () => {
    const userAnswerClean = userAnswer.trim();
    if (!challenge || userAnswerClean === '') return;

    let detectedEra: Era = 'd.C.';
    let valueStr = userAnswerClean;

    const acRegex = /\s+a\.?c\.?$/i;
    if (acRegex.test(userAnswerClean)) {
        detectedEra = 'a.C.';
        valueStr = userAnswerClean.replace(acRegex, '').trim();
    } else {
        const dcRegex = /\s+d\.?c\.?$/i;
        if (dcRegex.test(userAnswerClean)) {
            valueStr = userAnswerClean.replace(dcRegex, '').trim();
        }
    }
    
    if (valueStr === '') {
        setFeedback({
            isCorrect: false, correctAnswer: '', userAnswer: userAnswerClean, challenge,
            explanation: 'Formato incorrecto. Debes proporcionar un valor (año o siglo).'
        });
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        return;
    }

    let isCorrect = false;
    let correctAnswerDisplay = '';
    let explanation = '';

    if (gameMode === GameMode.YearToCentury && challenge.year) {
      if (!isNaN(parseInt(valueStr, 10)) && isFinite(Number(valueStr))) {
          setFormatWarning("¡Atención! Recuerda que los siglos se escriben con números romanos (I, V, X...).");
          return;
      }

      const correctCenturyNum = getCenturyFromYear(challenge.year, challenge.era);
      const correctCenturyRoman = toRoman(correctCenturyNum);
      correctAnswerDisplay = `${correctCenturyRoman} ${challenge.era}`;
      const userRomanValue = valueStr.toUpperCase();

      const isCenturyValueCorrect = userRomanValue === correctCenturyRoman;
      const isEraCorrect = detectedEra === challenge.era;
      isCorrect = isCenturyValueCorrect && isEraCorrect;
      
      if (!isCorrect) {
          if (isCenturyValueCorrect && !isEraCorrect) {
              explanation = `¡Casi lo tienes! El siglo ${correctCenturyRoman} es correcto, pero la era no. El año ${challenge.year} ${challenge.era} está en la era ${challenge.era}.`;
          } else {
              explanation = `Para el año ${challenge.year} ${challenge.era}, la respuesta correcta es el Siglo ${correctAnswerDisplay}.`;
              if (challenge.era === 'd.C.') {
                  if (challenge.year % 100 === 0) {
                      explanation += `\n\nRegla d.C.: Cuando un año termina en '00', el siglo corresponde a los primeros dígitos.`;
                  } else {
                      explanation += `\n\nRegla d.C.: Como no termina en '00', se toman los primeros dígitos (${Math.floor(challenge.year / 100)}) y se le suma 1.`;
                  }
              } else { // a.C.
                  explanation += `\n\nRegla a.C.: Se divide el año entre 100 y se redondea hacia arriba. (Ej: 450 a.C. / 100 = 4.5 -> Siglo V a.C.).`;
              }
          }
      }

    } else if (gameMode === GameMode.CenturyToYear && challenge.century) {
      const yearNum = parseInt(valueStr, 10);
      if(isNaN(yearNum) || yearNum === 0) {
        setFeedback({
            isCorrect: false, correctAnswer: '', userAnswer: userAnswerClean, challenge,
            explanation: 'La respuesta debe ser un año válido en formato numérico.'
        });
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        return;
      }
      
      const range = getYearRangeForCentury(challenge.century, challenge.era);
      isCorrect = detectedEra === challenge.era && isYearInCentury(yearNum, challenge.century, challenge.era);
      
      if (challenge.era === 'd.C.') {
        explanation = `El Siglo ${toRoman(challenge.century)} d.C. abarca todos los años desde ${range.start} d.C. hasta ${range.end} d.C.`;
      } else { // a.C.
        explanation = `Recuerda, los años a.C. cuentan hacia atrás. El Siglo ${toRoman(challenge.century)} a.C. va desde el año ${range.start} a.C. hasta el ${range.end} a.C.`;
      }
    }
    
    if (isCorrect) {
      setScore(s => s + 10);
      setStreak(s => s + 1);
      setShowCorrectFeedback(true);
      setTimeout(() => {
        setShowCorrectFeedback(false);
        generateNewChallenge();
      }, 1200);
    } else {
      setStreak(0);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setFeedback({
        isCorrect: false,
        correctAnswer: correctAnswerDisplay,
        userAnswer: userAnswerClean,
        userAnswerValue: valueStr,
        userAnswerEra: detectedEra,
        challenge,
        explanation
      });
    }
  };

  return (
    <div className="min-h-screen text-text-dark p-4 sm:p-6 md:p-8 flex flex-col items-center animate-fade-in">
      
      {showHelpModal && <HelpModal onClose={() => setShowHelpModal(false)} />}
      {feedback && <FeedbackPanel feedback={feedback} gameMode={gameMode} onClose={() => setFeedback(null)} />}
      {formatWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="parchment-pane w-full max-w-md text-center p-6 border-accent-red">
            <h2 className="text-2xl font-bold font-cinzel text-accent-red">¡Atención!</h2>
            <p className="my-6 text-text-dark">{formatWarning}</p>
            <button 
              onClick={() => setFormatWarning(null)} 
              className="bronze-button w-full"
            >
              Volver a intentar
            </button>
          </div>
        </div>
      )}
      {showCorrectFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
           <div className="text-center animate-stamp-in">
                <div className="relative">
                    <svg className="w-64 h-64 text-accent-green" viewBox="0 0 100 100">
                        <path d="M50,2.5A47.5,47.5 0 1 1 2.5,50 47.5,47.5 0 0 1 50,2.5" fill="none" stroke="currentColor" strokeWidth="3" />
                        <path d="M32.5,52.5l10,10l25,-25" stroke="currentColor" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h2 className="absolute inset-0 flex items-center justify-center text-xl font-bold font-cinzel text-accent-green -mt-2">¡Correcto!</h2>
                </div>
            </div>
        </div>
      )}
      
      <header className="w-full max-w-4xl flex justify-between items-center gap-4 mb-6">
          <div className="flex-1 flex gap-4">
              <div className="bronze-plaque flex-1">
                  <p className="text-sm font-semibold uppercase tracking-widest">Puntos</p>
                  <p className="font-cinzel text-2xl font-bold">{score}</p>
              </div>
              <div className="bronze-plaque flex-1">
                  <p className="text-sm font-semibold uppercase tracking-widest">Racha</p>
                  <p className="font-cinzel text-2xl font-bold">{streak} 🔥</p>
              </div>
          </div>
          <button 
            onClick={() => setShowHelpModal(true)} 
            aria-label="Mostrar ayuda" 
            className="bronze-button !rounded-full !w-14 !h-14 flex-shrink-0 flex items-center justify-center">
            <BookOpenIcon className="w-8 h-8" />
          </button>
      </header>
      
      <main className="w-full max-w-4xl parchment-pane p-6 md:p-8 flex-grow flex flex-col">
        <div className="flex items-center justify-center gap-2 mb-8">
            <button onClick={() => setGameMode(GameMode.YearToCentury)} className={`mode-button ${gameMode === GameMode.YearToCentury ? 'active' : ''}`}>Año ➡️ Siglo</button>
            <button onClick={() => setGameMode(GameMode.CenturyToYear)} className={`mode-button ${gameMode === GameMode.CenturyToYear ? 'active' : ''}`}>Siglo ➡️ Año</button>
        </div>

        <div className={`flex-grow flex flex-col items-center justify-center text-center transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-gray-600 text-lg">Convierte:</p>
          <div className="my-4 font-cinzel text-5xl md:text-7xl font-bold text-bronze tracking-wider">
            {gameMode === GameMode.YearToCentury ? `Año ${challenge?.year}` : `Siglo ${challenge?.century && toRoman(challenge.century)}`}
            <span className="text-text-dark ml-4 text-4xl md:text-6xl">{challenge?.era}</span>
          </div>
        </div>

        <div className={`mt-auto flex flex-col items-center ${isShaking ? 'animate-shake' : ''}`}>
            <div className="w-full max-w-sm">
                <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmission()}
                    placeholder={gameMode === GameMode.YearToCentury ? 'Siglo (ej. V a.C.)' : 'Año (ej. 476 a.C.)'}
                    className="font-lora text-3xl w-full bg-transparent border-b-2 border-text-dark/50 focus:border-bronze rounded-none p-3 text-text-dark text-center focus:outline-none transition-colors"
                    aria-label="Escribe tu respuesta. La era d.C. es opcional, a.C. es requerida."
                    disabled={showCorrectFeedback}
                />
            </div>
            <button onClick={handleAnswerSubmission} disabled={userAnswer.trim() === '' || showCorrectFeedback} className="bronze-button mt-8 w-full max-w-xs text-xl">
              {gameMode === GameMode.YearToCentury ? 'Comprobar' : 'Verificar Año'} <CheckIcon className="w-6 h-6 ml-2" />
            </button>
        </div>
      </main>
    </div>
  );
};
export default GameScreen;