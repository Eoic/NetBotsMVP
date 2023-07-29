'use client'

import React, { useLayoutEffect } from 'react';
import { ShapeRenderer, Rectangle } from '../utils/shapes';
import { useRef, useEffect, useState, useMemo } from 'react';

const CanvasBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shapeRenderer = useMemo(() => new ShapeRenderer(), []);
    const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);

    useEffect(() => {
        if (canvasRef.current === null || animationFrameId !== null || shapeRenderer == null) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        const parentWidth = canvas.parentElement!.clientWidth;
        const parentHeight = canvas.parentElement!.clientHeight;
        canvas.width = parentWidth;
        canvas.height = parentWidth / (parentWidth / parentHeight);

        if (context === null) {
            return;
        }

        shapeRenderer.addShape(
            new Rectangle(100, 100)
                .setColor('#FF0000')
                .setPosition(0, 0)
        );

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
        if (canvasRef.current === null || shapeRenderer == null) {
            return;
        }

        const updateCanvas = () => {
            const canvas = canvasRef.current;

            if (canvas === null) {
                return;
            }

            const parentWidth = canvas.parentElement!.clientWidth;
            const parentHeight = canvas.parentElement!.clientHeight;
            canvas.width = parentWidth;
            canvas.height = parentWidth / (parentWidth / parentHeight);
            const context = canvas.getContext('2d');

            if (context === null) {
                return;
            }

            shapeRenderer.render(context);
        }

        window.addEventListener('resize', updateCanvas);

        return () => window.removeEventListener('resize', updateCanvas);
    }, [shapeRenderer]);

    return (
        <canvas ref={canvasRef} className='canvas-background' />
    );
};

export { CanvasBackground };
export default CanvasBackground;
