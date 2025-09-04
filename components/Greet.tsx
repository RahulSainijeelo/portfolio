'use client'

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

interface RotatingCubesProps {
  isBackground?: boolean
  colorSpeed?: number
  className?: string
  style?: React.CSSProperties
  onPortalComplete?: () => void
}

export interface RotatingCubesRef {
  startPortalTransition: () => void
}

const Greet = forwardRef<RotatingCubesRef, RotatingCubesProps>(({ 
  isBackground = false, 
  colorSpeed = 0.001,
  className = '',
  style = {},
  onPortalComplete
}, ref) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    scene?: THREE.Scene
    camera?: THREE.PerspectiveCamera
    renderer?: THREE.WebGLRenderer
    controls?: OrbitControls
    geometry?: THREE.BoxGeometry
    material?: THREE.MeshPhongMaterial
    items: THREE.Mesh[]
    animationId?: number
    colorTime: number
    isPortalActive: boolean
    portalProgress: number
    originalPositions: THREE.Vector3[]
  }>({ 
    items: [], 
    colorTime: 0, 
    isPortalActive: false, 
    portalProgress: 0,
    originalPositions: []
  })

  const options = {
    radius: 200,
    width: 150,
    height: 10,
    depth: 150,
    count: 50,
    twistAngle: 540,
    camerDamping: true,
  }

  // Base colors that will be animated
  const baseColors = [
    [0.97, 0.70, 0.72], // #F7B2B7
    [0.97, 0.44, 0.49], // #F7717D
    [0.87, 0.39, 0.60], // #DE639A
    [0.50, 0.16, 0.51], // #7F2982
    [1.00, 0.00, 1.00], // #FF00FF
    [1.00, 1.00, 1.00]  // #FFFFFF
  ]

  useImperativeHandle(ref, () => ({
    startPortalTransition: () => {
      sceneRef.current.isPortalActive = true
      sceneRef.current.portalProgress = 0
    }
  }))

  useEffect(() => {
    if (!mountRef.current) return

    const current = mountRef.current

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45, 
      window.innerWidth / window.innerHeight, 
      1, 
      2000
    )
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: isBackground
    })
    
    if (isBackground) {
      renderer.setClearColor(0x000000, 0)
    }
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.075
    controls.screenSpacePanning = true
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.2

    camera.position.set(0, 0, -1000)
    camera.lookAt(0, 0, 0)

    // Lighting
    const light = new THREE.AmbientLight(0x404040)
    scene.add(light)
    const hemlight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
    scene.add(hemlight)

    // Store references
    sceneRef.current.scene = scene
    sceneRef.current.camera = camera
    sceneRef.current.renderer = renderer
    sceneRef.current.controls = controls

    const createGeometry = () => {
      const geometry = new THREE.BoxGeometry(options.width, options.height, options.depth)
      
      const colors = []
      
      for (let i = 0; i < 6; i++) {
        const baseColor = baseColors[i]
        for (let j = 0; j < 6; j++) {
          colors.push(baseColor[0], baseColor[1], baseColor[2])
        }
      }
      
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
      sceneRef.current.geometry = geometry
      return geometry
    }

    const createCubes = () => {
      sceneRef.current.items = []
      sceneRef.current.originalPositions = []
      const count = options.count
      const rad = options.radius
      const geometry = sceneRef.current.geometry!
      
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        vertexColors: true,
        transparent: isBackground,
        opacity: isBackground ? 0.8 : 1.0
      })
      sceneRef.current.material = material

      for (let i = 0; i < count; i++) {
        const cube = new THREE.Mesh(geometry, material)
        
        const originalX = rad * Math.cos(2 * Math.PI / (count / i))
        const originalY = rad * Math.sin(2 * Math.PI / (count / i))
        
        cube.position.x = originalX
        cube.position.y = originalY
        cube.rotateZ(2 * Math.PI / (count / i))
        cube.rotateY(THREE.MathUtils.degToRad(options.twistAngle) / (count / i))
        
        // Store original positions
        sceneRef.current.originalPositions.push(new THREE.Vector3(originalX, originalY, 0))
        
        scene.add(cube)
        sceneRef.current.items.push(cube)
      }
    }

    const updateColors = () => {
      if (!sceneRef.current.geometry) return
      
      sceneRef.current.colorTime += colorSpeed
      const colorAttribute = sceneRef.current.geometry.getAttribute('color')
      
      for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
        const baseColor = baseColors[faceIndex]
        
        const r = baseColor[0] * (0.5 + 0.5 * Math.sin(sceneRef.current.colorTime + faceIndex * 0.5))
        const g = baseColor[1] * (0.5 + 0.5 * Math.sin(sceneRef.current.colorTime + faceIndex * 0.7 + 2))
        const b = baseColor[2] * (0.5 + 0.5 * Math.sin(sceneRef.current.colorTime + faceIndex * 0.9 + 4))
        
        for (let vertexIndex = 0; vertexIndex < 6; vertexIndex++) {
          const index = faceIndex * 6 + vertexIndex
          colorAttribute.setXYZ(index, r, g, b)
        }
      }
      
      colorAttribute.needsUpdate = true
    }

    const updatePortalEffect = () => {
      if (!sceneRef.current.isPortalActive) return
      
      // Increase portal progress
      sceneRef.current.portalProgress += 0.008 // Adjust speed as needed
      
      if (sceneRef.current.portalProgress >= 1) {
        sceneRef.current.portalProgress = 1
        if (onPortalComplete) {
          onPortalComplete()
        }
        return
      }
      
      // Easing function for smooth animation
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)
      const progress = easeOutQuart(sceneRef.current.portalProgress)
      
      sceneRef.current.items.forEach((cube, index) => {
        const originalPos = sceneRef.current.originalPositions[index]
        
        // Calculate distance from center
        const distance = Math.sqrt(originalPos.x * originalPos.x + originalPos.y * originalPos.y)
        
        // Scale factor increases with progress
        const scaleFactor = 1 + (progress * 3) // Cubes move 3x further out
        
        // Update positions
        cube.position.x = originalPos.x * scaleFactor
        cube.position.y = originalPos.y * scaleFactor
        
        // Add some z-axis movement for depth effect
        cube.position.z = progress * 200 * (index % 2 === 0 ? 1 : -1)
        
        // Scale down cubes as they move out (creates portal effect)
        const scaleDown = 1 - (progress * 0.7)
        cube.scale.set(scaleDown, scaleDown, scaleDown)
        
        // Increase rotation speed during portal effect
        const rotationMultiplier = 1 + (progress * 5)
        cube.rotateY((Math.PI / 2 / 250) * rotationMultiplier)
        
        // Fade out cubes at the end
        if (progress > 0.7) {
          const fadeProgress = (progress - 0.7) / 0.3
          cube.material.opacity = (isBackground ? 0.8 : 1.0) * (1 - fadeProgress)
        }
      })
      
      // Zoom camera forward for portal effect
      const targetZ = -1000 + (progress * 800)
      camera.position.z = targetZ
      
      // Increase auto-rotation speed
      if (controls) {
        controls.autoRotateSpeed = 0.2 + (progress * 2)
      }
    }

    const updateItems = () => {
      if (sceneRef.current.isPortalActive) {
        updatePortalEffect()
      } else {
        sceneRef.current.items.forEach(item => {
          item.rotateY(Math.PI / 2 / 250)
        })
      }
      
      updateColors()
      controls.update()
    }

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    const animate = () => {
      sceneRef.current.animationId = requestAnimationFrame(animate)
      updateItems()
      renderer.render(scene, camera)
    }

    // Initialize
    createGeometry()
    createCubes()
    
    window.addEventListener("resize", onWindowResize, false)
    animate()

    // Cleanup function
    return () => {
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId)
      }
      
      window.removeEventListener("resize", onWindowResize)
      
      sceneRef.current.items.forEach(item => {
        scene.remove(item)
      })
      
      if (current && sceneRef.current.renderer) {
        current.removeChild(sceneRef.current.renderer.domElement)
        sceneRef.current.renderer.dispose()
      }
      
      if (sceneRef.current.geometry) {
        sceneRef.current.geometry.dispose()
      }
      
      if (sceneRef.current.material) {
        sceneRef.current.material.dispose()
      }
    }
  }, [isBackground, colorSpeed, onPortalComplete])

  const containerStyle: React.CSSProperties = {
    width: '100%', 
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    ...(isBackground && {
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: -1,
      pointerEvents: 'auto'
    }),
    ...style
  }

  return (
    <div 
      ref={mountRef} 
      className={className}
      style={containerStyle}
    />
  )
})

Greet.displayName = 'RotatingCubes'

export default Greet
