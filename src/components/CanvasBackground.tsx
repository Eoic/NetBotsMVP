'use client'

import React, { useLayoutEffect } from 'react';
import { ShapeRenderer, Rectangle, Circle, Triangle } from '../utils/shapes';
import { useRef, useEffect, useState, useMemo } from 'react';

const CanvasBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shapeRenderer = useMemo(() => new ShapeRenderer(), []);
    const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);

    const resizeCanvas = () => {
        if (canvasRef.current === null)
            return;

        const canvas = canvasRef.current;
        canvas.height = canvas.parentElement!.clientHeight;
        canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
    }

    useEffect(() => {
        if (canvasRef.current === null || animationFrameId !== null || shapeRenderer == null)
            return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        resizeCanvas();

        if (context === null)
            return;

        shapeRenderer.generateShapesRandomly(
            {
                [Rectangle.name]: { 
                    count: 10,
                    size: { min: 10, max: 75 },
                    colors: ['#36335C', '#433F71']
                },
                [Circle.name]: { 
                    count: 5,
                    size: { min: 10, max: 50 },
                    colors: ['#36335C', '#433F71']
                },
                [Triangle.name]: {
                    count: 5,
                    size: { min: 50, max: 100 },
                    colors: ['#36335C', '#433F71']
                }
            }
        )

        const renderShapes = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            shapeRenderer.render(context);
        }

        setAnimationFrameId(requestAnimationFrame(renderShapes));

        return () => {
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
            }
        }
    }, [animationFrameId, shapeRenderer]);

    useLayoutEffect(() => {
        if (canvasRef.current === null || shapeRenderer == null)
            return;

        const updateCanvas = () => {
            const canvas = canvasRef.current;

            if (canvas === null)
                return;

            const context = canvas.getContext('2d');
            resizeCanvas();

            if (context === null)
                return;

            shapeRenderer.render(context);
        }

        window.addEventListener('resize', updateCanvas);

        return () => { 
            window.removeEventListener('resize', updateCanvas);
        }
    }, [shapeRenderer]);

    return (
        <canvas ref={canvasRef} className='canvas-background' />
    );
};

export { CanvasBackground };
export default CanvasBackground;
