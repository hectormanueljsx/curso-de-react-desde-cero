import { useEffect, useState } from 'react';

import './App.css';

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Evento pointermove
  useEffect(() => {
    const handleMove = event => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    };

    if (enabled) {
      window.addEventListener('pointermove', handleMove);
    }

    // Cleanup:
    // -> Cuando el componente se desmonta
    // -> Cuando cambian las dependencias, antes de ejecutar el efecto de nuevo
    return () => {
      window.removeEventListener('pointermove', handleMove);
    };
  }, [enabled]);

  // [] -> Solo se ejecuta una vez cuando se monta el componente
  // [enabled] -> Se ejecuta cuando cambia enabled y cuando se monta el componente
  // undefined -> Se ejecuta cada vez que se renderiza el componente

  // Cambiar clase del body
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled);

    return () => {
      document.body.classList.remove('no-cursor');
    };
  }, [enabled]);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />

      <button onClick={() => setEnabled(!enabled)}>{enabled ? 'Desactivar' : 'Activar'} seguir puntero</button>
    </>
  );
};

export const App = () => {
  return (
    <main>
      <FollowMouse />
    </main>
  );
};
