"use client"

import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { useEffect, useRef } from "react"

interface MagneticGridProps {
    width?: number;
    height?: number;
    className?: string;
}

export default function MagneticGrid({ 
    width = 500, 
    height = 500, 
    className = "" 
}: MagneticGridProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    
    const springMouseX = useSpring(mouseX, { stiffness: 150, damping: 25 })
    const springMouseY = useSpring(mouseY, { stiffness: 150, damping: 25 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                const x = e.clientX - rect.left - rect.width / 2
                const y = e.clientY - rect.top - rect.height / 2
                
                mouseX.set(x)
                mouseY.set(y)
            }
        }

        const handleMouseLeave = () => {
            mouseX.set(0)
            mouseY.set(0)
        }

        window.addEventListener('mousemove', handleMouseMove)
        containerRef.current?.addEventListener('mouseleave', handleMouseLeave)
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            containerRef.current?.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [mouseX, mouseY])

    const generateMagnets = () => {
        const magnets = []
        // Calculate grid size based on container dimensions
        const spacing = 40
        const gridCols = Math.floor(width / spacing)
        const gridRows = Math.floor(height / spacing)
        
        // Center the grid
        const offsetX = (width - (gridCols - 1) * spacing) / 2
        const offsetY = (height - (gridRows - 1) * spacing) / 2
        
        for (let row = 0; row < gridRows; row++) {
            for (let col = 0; col < gridCols; col++) {
                const x = col * spacing + offsetX
                const y = row * spacing + offsetY
                const key = `${row}-${col}`
                
                magnets.push(
                    <MagnetElement
                        key={key}
                        x={x}
                        y={y}
                        mouseX={springMouseX}
                        mouseY={springMouseY}
                        delay={col * 0.02 + row * 0.015}
                        row={row}
                        col={col}
                        containerWidth={width}
                        containerHeight={height}
                    />
                )
            }
        }
        return magnets
    }

    return (
        <div 
            ref={containerRef}
            className={`relative overflow-hidden cursor-none ${className}`}
            style={{ width: `${width}px`, height: `${height}px` }}
        >
            <svg 
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                className="absolute inset-0"
            >
                {generateMagnets()}
            </svg>
        </div>
    )
}

interface MagnetElementProps {
    x: number
    y: number
    mouseX: any
    mouseY: any
    delay: number
    row: number
    col: number
    containerWidth: number
    containerHeight: number
}

function MagnetElement({ 
    x, 
    y, 
    mouseX, 
    mouseY, 
    delay, 
    row, 
    col,
    containerWidth,
    containerHeight
}: MagnetElementProps) {
    // Calculate angle towards mouse (magnet orientation)
    const angle = useTransform(
        [mouseX, mouseY],
        ([mx, my]: any) => {
            const dx = mx - (x - containerWidth / 2)
            const dy = my - (y - containerHeight / 2)
            return Math.atan2(dy, dx) * (180 / Math.PI)
        }
    )

    // Distance-based effects
    const distance = useTransform(
        [mouseX, mouseY],
        ([mx, my]: any) => {
            const dx = mx - (x - containerWidth / 2)
            const dy = my - (y - containerHeight / 2)
            return Math.sqrt(dx * dx + dy * dy)
        }
    )

    const opacity = useTransform(distance, [0, 200], [1, 0.3])
    const scale = useTransform(distance, [0, 80], [1.5, 1])

    return (
        <motion.g
            style={{
                transformOrigin: `${x}px ${y}px`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                delay,
                duration: 0.8,
                ease: "easeOut"
            }}
        >
            {/* Simple black bar magnet */}
            <motion.rect
                x={x - 2.5} // Center the 5px width
                y={y - 15}  // Center the 30px height
                width="5"
                height="30"
                rx="2"
                fill="gold"
                stroke="#333333"
                strokeWidth="0.5"
                style={{
                    transformOrigin: `${x}px ${y}px`,
                    rotate: angle,
                    scale: scale,
                    opacity: opacity
                }}
            />

            {/* Optional hover glow effect */}
            <motion.rect
                x={x - 3}
                y={y - 16}
                width="6"
                height="32"
                rx="3"
                fill="#ffffff"
                opacity="0"
                style={{
                    transformOrigin: `${x}px ${y}px`,
                    rotate: angle,
                    scale: scale
                }}
                whileHover={{ opacity: 0.2 }}
            />
        </motion.g>
    )
}

// Full-width/height variant
export function FullScreenMagneticGrid({ className = "" }: { className?: string }) {
    return (
        <div className={`w-full h-full ${className}`}>
            <MagneticGrid 
                width={typeof window !== 'undefined' ? window.innerWidth : 1200}
                height={typeof window !== 'undefined' ? window.innerHeight : 800}
                className="w-full h-full"
            />
        </div>
    )
}