import React, { useEffect, useRef, useState } from 'react';

const TechSphere = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Configurar canvas con tamaño fijo
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Configuración de la esfera más grande y responsiva
    const getResponsiveRadius = () => {
      const minDimension = Math.min(canvas.width, canvas.height);
      return Math.max(minDimension * 0.28, 300); // Mínimo 300px, máximo 28% de la pantalla
    };

    const sphereConfig = {
      baseRadius: getResponsiveRadius(),
      x: 0,
      y: 0,
      rotationSpeed: 0.008, // Más suave
      pulseSpeed: 0.01, // Más suave
      ringCount: 5,
      dotCount: 16,
      coreRadius: getResponsiveRadius() * 0.33
    };

    // Variables de animación
    let time = 0;
    let rotationAngle = 0;
    let pulsePhase = 0;

    // Función para calcular distancia del mouse al centro de la esfera
    const getMouseDistance = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      return Math.sqrt((mousePos.x - centerX) ** 2 + (mousePos.y - centerY) ** 2);
    };

    // Función para dibujar la esfera tecnológica
    const drawTechSphere = () => {
      // Actualizar tamaño responsivo
      sphereConfig.baseRadius = getResponsiveRadius();
      sphereConfig.coreRadius = sphereConfig.baseRadius * 0.33;
      
      // Centrar la esfera
      sphereConfig.x = canvas.width / 2;
      sphereConfig.y = canvas.height / 2;

      // Efectos de interactividad - solo click
      const currentRadius = sphereConfig.baseRadius + Math.sin(pulsePhase) * 5; // Pulso más suave
      const pulse = 1 + Math.sin(pulsePhase) * 0.15; // Pulso más sutil
      const clickEffect = isClicked ? 1.3 : 1;

      // Colores más suaves y menos intensos
      const baseIntensity = isClicked ? 0.9 : 0.5;
      const colors = {
        primary: `rgba(64, 156, 255, ${baseIntensity * 0.6})`,        // Azul más suave
        secondary: `rgba(100, 200, 255, ${baseIntensity * 0.4})`,     // Azul claro suave
        accent: `rgba(0, 191, 255, ${baseIntensity * 0.7})`,          // Azul cyan suave
        core: `rgba(255, 255, 255, ${baseIntensity * 0.6})`,          // Blanco suave
        ring: `rgba(30, 144, 255, ${baseIntensity * 0.3})`,           // Azul dodger suave
        particle: `rgba(255, 165, 0, ${baseIntensity * 0.6})`,        // Naranja suave
        flash: `rgba(255, 255, 255, ${baseIntensity})`,               // Blanco para destellos
        click: `rgba(147, 112, 219, ${isClicked ? 0.8 : 0})`         // Púrpura para click
      };

      // 1. Anillos rotativos más suaves
      for (let i = 0; i < sphereConfig.ringCount; i++) {
        const ringRadius = currentRadius * (0.5 + i * 0.18);
        const ringRotation = rotationAngle * (1 + i * 0.2); // Rotación más suave
        const ringOpacity = (sphereConfig.ringCount - i) / sphereConfig.ringCount * 0.4; // Más sutil

        ctx.save();
        ctx.translate(sphereConfig.x, sphereConfig.y);
        ctx.rotate(ringRotation);

        // Anillo completo más sutil
        ctx.beginPath();
        ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = colors.ring;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.lineDashOffset = time * 1.5; // Más lento
        ctx.stroke();
        ctx.setLineDash([]);

        // Puntos más sutiles en el anillo
        for (let j = 0; j < sphereConfig.dotCount; j++) {
          const angle = (j / sphereConfig.dotCount) * Math.PI * 2;
          const dotX = Math.cos(angle) * ringRadius;
          const dotY = Math.sin(angle) * ringRadius;
          
          const dotPulse = Math.sin(time * 2 + j + i) * 0.2 + 0.8; // Pulso más suave
          const dotSize = 2 * dotPulse * clickEffect;
          
          ctx.beginPath();
          ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = colors.accent;
          ctx.fill();
        }

        ctx.restore();
      }

      // 2. Esfera principal con gradiente 3D más vibrante
      const sphereGradient = ctx.createRadialGradient(
        sphereConfig.x - currentRadius * 0.3, 
        sphereConfig.y - currentRadius * 0.3, 
        0,
        sphereConfig.x, 
        sphereConfig.y, 
        currentRadius
      );
      sphereGradient.addColorStop(0, colors.core);
      sphereGradient.addColorStop(0.2, colors.accent);
      sphereGradient.addColorStop(0.6, colors.secondary);
      sphereGradient.addColorStop(1, colors.primary);
      
      ctx.beginPath();
      ctx.arc(sphereConfig.x, sphereConfig.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGradient;
      ctx.fill();

      // 3. Patrón de red más sutil
      ctx.save();
      ctx.translate(sphereConfig.x, sphereConfig.y);
      ctx.rotate(rotationAngle * 0.3); // Rotación más lenta
      
      const gridSize = Math.max(currentRadius * 0.15, 25);
      const gridOpacity = 0.2; // Más sutil
      
      ctx.strokeStyle = `rgba(255, 255, 255, ${gridOpacity})`;
      ctx.lineWidth = 0.8;
      
      for (let i = -currentRadius; i <= currentRadius; i += gridSize) {
        const curve = Math.sqrt(Math.max(0, currentRadius * currentRadius - i * i));
        ctx.beginPath();
        ctx.moveTo(i, -curve);
        ctx.lineTo(i, curve);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(-curve, i);
        ctx.lineTo(curve, i);
        ctx.stroke();
      }
      
      ctx.restore();

      // 4. Núcleo brillante central más intenso
      const coreGradient = ctx.createRadialGradient(
        sphereConfig.x, sphereConfig.y, 0,
        sphereConfig.x, sphereConfig.y, sphereConfig.coreRadius * pulse
      );
      coreGradient.addColorStop(0, colors.flash);
      coreGradient.addColorStop(0.3, colors.accent);
      coreGradient.addColorStop(0.7, colors.secondary);
      coreGradient.addColorStop(1, 'transparent');
      
      ctx.beginPath();
      ctx.arc(sphereConfig.x, sphereConfig.y, sphereConfig.coreRadius * pulse, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.fill();

      // 5. Destellos más sutiles
      const flashIntensity = Math.sin(time * 3) * 0.5 + 0.5; // Más lento
      if (flashIntensity > 0.8) {
        const intensity = (flashIntensity - 0.8) * 2;
        const flashGradient = ctx.createRadialGradient(
          sphereConfig.x, sphereConfig.y, 0,
          sphereConfig.x, sphereConfig.y, currentRadius * 0.4
        );
        flashGradient.addColorStop(0, `rgba(255, 255, 255, ${intensity * 0.4})`); // Más suave
        flashGradient.addColorStop(0.5, `rgba(0, 191, 255, ${intensity * 0.2})`);
        flashGradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(sphereConfig.x, sphereConfig.y, currentRadius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = flashGradient;
        ctx.fill();
      }

      // Efecto de click - ondas púrpura suaves
      if (isClicked) {
        for (let i = 0; i < 3; i++) {
          const waveRadius = currentRadius * (1.1 + i * 0.2) + Math.sin(time * 8 + i) * 10;
          const waveOpacity = Math.sin(time * 6 + i) * 0.4 + 0.3;
          
          ctx.beginPath();
          ctx.arc(sphereConfig.x, sphereConfig.y, waveRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(147, 112, 219, ${waveOpacity * 0.6})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // 6. Partículas orbitales más suaves
      const orbitalCount = 6; // Menos partículas
      for (let i = 0; i < orbitalCount; i++) {
        const orbitalAngle = rotationAngle * 1.5 + (i / orbitalCount) * Math.PI * 2; // Más lento
        const orbitalRadius = currentRadius * (1.25 + Math.sin(time * 0.8 + i) * 0.1); // Más sutil
        const orbitalX = sphereConfig.x + Math.cos(orbitalAngle) * orbitalRadius;
        const orbitalY = sphereConfig.y + Math.sin(orbitalAngle) * orbitalRadius;
        
        const orbitalPulse = Math.sin(time * 1.5 + i) * 0.3 + 0.7; // Más suave
        const orbitalSize = Math.max(currentRadius * 0.025, 3) * clickEffect; // Más pequeño
        
        ctx.beginPath();
        ctx.arc(orbitalX, orbitalY, orbitalSize * orbitalPulse, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? colors.particle : colors.accent;
        ctx.fill();
        
        // Estela más sutil
        const trailLength = 8; // Más corta
        for (let j = 1; j <= trailLength; j++) {
          const trailAngle = orbitalAngle - (j * 0.1);
          const trailX = sphereConfig.x + Math.cos(trailAngle) * orbitalRadius;
          const trailY = sphereConfig.y + Math.sin(trailAngle) * orbitalRadius;
          const trailOpacity = (trailLength - j) / trailLength * 0.3 * orbitalPulse; // Más suave
          
          ctx.beginPath();
          ctx.arc(trailX, trailY, (orbitalSize * 0.5) * orbitalPulse, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100, 200, 255, ${trailOpacity})`;
          ctx.fill();
        }
      }
    };

    // Loop de animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Actualizar variables de tiempo
      time += 0.016;
      rotationAngle += sphereConfig.rotationSpeed;
      pulsePhase += sphereConfig.pulseSpeed;
      
      drawTechSphere();
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Event listeners para interactividad
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      
      // Detectar si el mouse está sobre la esfera
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const distance = Math.sqrt((e.clientX - rect.left - centerX) ** 2 + (e.clientY - rect.top - centerY) ** 2);
      setIsHovering(distance <= sphereConfig.baseRadius);
    };

    const handleClick = () => {
      // Click removido - no se necesita
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos, isHovering, isClicked]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: 0
      }}
    />
  );
};

export default TechSphere;