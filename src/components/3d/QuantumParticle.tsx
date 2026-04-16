import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Sparkles, Trail } from '@react-three/drei';

export const QuantumParticle: React.FC = () => {
  const particleRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Custom shader for the shimmering/glitch effect
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#00F2FF') },
    },
    vertexShader: `
      varying vec2 vUv;
      uniform float uTime;
      void main() {
        vUv = uv;
        vec3 pos = position;
        pos.x += sin(pos.y * 10.0 + uTime * 5.0) * 0.02;
        pos.y += cos(pos.x * 10.0 + uTime * 5.0) * 0.02;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform vec3 uColor;
      void main() {
        float glow = sin(uTime * 10.0) * 0.5 + 0.5;
        vec3 color = uColor + vec3(glow * 0.2);
        gl_FragColor = vec4(color, 0.8);
      }
    `,
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    
    // Smooth orbit or controlled movement based on scroll/time
    if (particleRef.current) {
      const time = state.clock.elapsedTime;
      particleRef.current.position.y = Math.sin(time * 0.5) * 0.5 + 2;
      particleRef.current.position.x = Math.cos(time * 0.5) * 2;
      particleRef.current.position.z = Math.sin(time * 0.5) * 2;
    }
  });

  return (
    <group>
      <Trail
        width={1}
        length={5}
        color={new THREE.Color('#7000FF')}
        attenuation={(t) => t * t}
      >
        <mesh ref={particleRef}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <shaderMaterial
            ref={materialRef}
            args={[shaderArgs]}
            transparent
          />
        </mesh>
      </Trail>

      <Sparkles 
        count={50} 
        scale={4} 
        size={2} 
        speed={0.5} 
        color="#00F2FF" 
      />
    </group>
  );
};
