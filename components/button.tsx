import React, { useState, useCallback } from 'react';

interface ButtonsProps {
    onStart: () => void;
    onEnd: () => void;
    onGetNotes: () => void;
    onShowName: () => void;
}

function Buttons({ onStart, onEnd, onGetNotes, onShowName }: ButtonsProps) {
    const [isStartEnabled, setIsStartEnabled] = useState(true);
    const [isEndEnabled, setIsEndEnabled] = useState(false);

    const handleStart = useCallback(() => {
        setIsStartEnabled(false);
        onStart();
    }, [onStart]);

    const handleEnd = useCallback(() => {
        setIsEndEnabled(false);
        onEnd();
    }, [onEnd]);

    const handleGetNotes = useCallback(() => {
        onGetNotes();
    }, [onGetNotes]);

    const handleShowName = useCallback(() => {
        onShowName();
    }, [onShowName]);

  return (
    <div>
      <button
        disabled={!isStartEnabled}
        onClick={handleStart}
      >
        Start
      </button>
      <button
        disabled={isEndEnabled}
        onClick={handleEnd}
      >
        End
      </button>
      <button onClick={handleGetNotes}>
        Get Notes
      </button>
      <button onClick={handleShowName}>
        Show Name
      </button>
    </div>
  );
}

export default Buttons;
