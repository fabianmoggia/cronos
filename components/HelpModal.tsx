import React from 'react';

interface HelpModalProps {
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="parchment-pane w-full max-w-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold font-cinzel text-bronze text-center mb-6">La Regla de Oro</h2>
        
        <div className="space-y-4 text-text-dark font-lora">
          <p>Imaginen que los siglos son como "cajas" gigantes donde guardamos 100 años. La primera caja guarda los años del 1 al 100, la segunda los años del 101 al 200, y así sucesivamente.</p>
          <p>Para saber a qué siglo pertenece un año, solo debemos seguir una regla muy simple. La clave está en observar los dos últimos números del año.</p>

          <h3 className="text-xl font-bold font-cinzel text-bronze pt-4">Para los años Después de Cristo (d.C.)</h3>
          <p>Estos son los años que contamos desde el año 1, como el año en que vivimos ahora.</p>
          
          <div className="bg-black/5 p-4 rounded-lg border border-black/10">
            <strong className="text-text-dark/90">Si el año termina en "00":</strong> ¡Es el caso más fácil! El siglo es simplemente el número (o los números) que están antes de los dos ceros.
            <p className="mt-2 text-gray-700 pl-4 border-l-2 border-bronze"><em>Ejemplo: El año <span className="text-bronze">1700</span>. Termina en "00", así que miramos el número de adelante: 17. Por lo tanto, el año 1700 es el <span className="text-accent-green">siglo XVII</span>.</em></p>
          </div>

          <div className="bg-black/5 p-4 rounded-lg border border-black/10">
            <strong className="text-text-dark/90">Si el año NO termina en "00":</strong> Aquí viene el único truco. Tomamos el número (o los números) que están delante de los dos últimos dígitos y le <span className="text-bronze font-bold">sumamos 1</span>.
            <p className="mt-2 text-gray-700 pl-4 border-l-2 border-bronze"><em>Ejemplo: El año <span className="text-bronze">1995</span>. Tomamos el 19 y le sumamos 1 (19 + 1 = 20). Así que el año 1995 pertenece al <span className="text-accent-green">siglo XX</span>.</em></p>
            <p className="mt-2 text-gray-700 pl-4 border-l-2 border-bronze"><em>Otro ejemplo: El año <span className="text-bronze">401</span>. Tomamos el 4 y le sumamos 1 (4 + 1 = 5). Pertenece al <span className="text-accent-green">siglo V</span>.</em></p>
             <p className="mt-2 text-gray-700 pl-4 border-l-2 border-bronze"><em>Un último ejemplo: El año <span className="text-bronze">2024</span>. Tomamos el 20 y le sumamos 1 (20 + 1 = 21). ¡Vivimos en el <span className="text-accent-green">siglo XXI</span>!</em></p>
          </div>

          <h3 className="text-xl font-bold font-cinzel text-bronze pt-4">Para los años Antes de Cristo (a.C.)</h3>
          <p>Aquí contamos hacia atrás desde el año 1. Es como una cuenta regresiva hacia el pasado. ¡Pero no se preocupen, la regla es exactamente la misma!</p>

          <div className="bg-black/5 p-4 rounded-lg border border-black/10">
             <strong className="text-text-dark/90">Si el año termina en "00" (a.C.):</strong> Igual que antes, el siglo es el número que está delante.
            <p className="mt-2 text-gray-700 pl-4 border-l-2 border-accent-red"><em>Ejemplo: El año <span className="text-bronze">300 a.C.</span> es el <span className="text-accent-green">siglo III a.C.</span></em></p>
          </div>
          
           <div className="bg-black/5 p-4 rounded-lg border border-black/10">
             <strong className="text-text-dark/90">Si el año NO termina en "00" (a.C.):</strong> También tomamos los primeros números y le <span className="text-bronze font-bold">sumamos 1</span>.
            <p className="mt-2 text-gray-700 pl-4 border-l-2 border-accent-red"><em>Ejemplo: El año <span className="text-bronze">525 a.C.</span> Tomamos el 5 y le sumamos 1 (5 + 1 = 6). Pertenece al <span className="text-accent-green">siglo VI a.C.</span></em></p>
            <p className="mt-2 text-gray-700 pl-4 border-l-2 border-accent-red"><em>Otro ejemplo: El año <span className="text-bronze">2015 a.C.</span> Tomamos el 20 y le sumamos 1 (20 + 1 = 21). Pertenece al <span className="text-accent-green">siglo XXI a.C.</span></em></p>
          </div>

          <p className="!mt-6 text-bronze bg-bronze/10 p-3 rounded-md border border-bronze/20"><strong>¡Un truco para no confundirse!</strong> Piensen que para los años a.C., los números de los años son más grandes cuanto más lejos estamos en el pasado, pero el número del siglo también crece. El siglo V a.C. ocurrió antes que el siglo IV a.C.</p>
          
        </div>

        <button
          onClick={onClose}
          className="bronze-button w-full mt-8"
        >
          ¡A Seguir Practicando!
        </button>
      </div>
    </div>
  );
};

export default HelpModal;