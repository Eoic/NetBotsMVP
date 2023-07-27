'use client'

import React from 'react';
import { useRef, useEffect, useState } from 'react';

const CanvasBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);

    useEffect(() => {
        if (canvasRef.current === null || animationFrameId !== null) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (context === null) {
            return;
        }

        let x = 50;
        let y = 50;

        const renderShapes = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();

            context.moveTo(x, y);
            context.quadraticCurveTo(x, 0, x + 50, 0);
            context.quadraticCurveTo(x + 100, 0, x + 100, 50);
            context.quadraticCurveTo(x + 100, 100, x + 50, 100);
            context.quadraticCurveTo(x, 100, x, 50);
            context.stroke();

            x += 5;
            
            if (x > canvas.width) {
              x = -100;
            }

            const frameId = requestAnimationFrame(renderShapes);
            setAnimationFrameId(frameId);
        }

        renderShapes();

        return () => {
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
            }
        }
    }, [animationFrameId]);

    return (
        <canvas ref={canvasRef} className='canvas-background' />
    );
};

export { CanvasBackground };
export default CanvasBackground;
