import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const GlitchShader: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uActive: { value: 0 },
      uTexture: { value: null },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform float uActive;
      
      void main() {
        vec2 uv = vUv;
        if (uActive > 0.5) {
          float strength = 0.05 * sin(uTime * 30.0);
          if (mod(uTime * 10.0 + uv.y * 10.0, 1.0) > 0.9) {
            uv.x += strength;
          }
        }
        
        vec3 color = vec3(0.1, 0.95, 1.0); // Quantum Blue base
        if (uActive > 0.5) {
          color.r = 0.44; // EvoX Purple adjustment
          color.b = 1.0;
        }
        
        gl_FragColor = vec4(color, 0.2 + uActive * 0.4);
      }
    `,
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh 
      onPointerEnter={() => { if (materialRef.current) materialRef.current.uniforms.uActive.value = 1.0; }}
      onPointerLeave={() => { if (materialRef.current) materialRef.current.uniforms.uActive.value = 0.0; }}
    >
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        args={[shaderArgs]}
        transparent
      />
    </mesh>
  );
};
