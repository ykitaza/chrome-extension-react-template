import { useState, useEffect, useRef } from 'react';
import { DialogProps } from '../types/common';

interface DialogComponentProps extends DialogProps {
    scale?: number;
}

export const Dialog = ({
    text,
    speed = 50,
    style,
    onComplete,
    scale = 1
}: DialogComponentProps) => {
    const [displayText, setDisplayText] = useState('');
    const textTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        let currentIndex = 0;
        setDisplayText('');

        const animateText = () => {
            if (currentIndex < text.length) {
                setDisplayText(text.slice(0, currentIndex + 1));
                currentIndex++;
                textTimeoutRef.current = window.setTimeout(animateText, speed);
            } else {
                onComplete?.();
            }
        };

        animateText();

        return () => {
            if (textTimeoutRef.current !== null) {
                window.clearTimeout(textTimeoutRef.current);
            }
            setDisplayText('');
        };
    }, [text, speed, onComplete]);

    return (
        <div style={{
            position: 'absolute',
            top: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            padding: '20px 30px',
            borderRadius: '25px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
            maxWidth: '400px',
            minWidth: '300px',
            minHeight: '60px',
            textAlign: 'center',
            fontSize: `${100 * scale}px`,
            fontWeight: 600,
            color: '#000',
            zIndex: 100,
            ...style,
        }}>
            <span style={{
                display: 'block',
                minHeight: '1.2em',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.4,
                userSelect: 'none',
                padding: '5px 0',
            }}>
                {displayText}
            </span>
            <div style={{
                position: 'absolute',
                bottom: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderTop: '15px solid white',
                filter: 'drop-shadow(0 4px 2px rgba(0,0,0,0.1))',
                zIndex: 99,
            }} />
        </div>
    );
}; 