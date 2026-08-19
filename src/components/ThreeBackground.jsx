import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 85;
    camera.position.y = 10;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // 1. Grid of undulating data particles (The Data Lakehouse Mesh)
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const initialY = new Float32Array(particleCount);

    const cyan = new THREE.Color('#06b6d4');
    const indigo = new THREE.Color('#6366f1');
    const emerald = new THREE.Color('#10b981');

    let idx = 0;
    const gridDim = 38;
    for (let x = -gridDim; x < gridDim; x += 2) {
      for (let z = -gridDim; z < gridDim; z += 2) {
        if (idx < particleCount) {
          const posX = x * 3.2;
          const posZ = z * 3.2 - 20;
          const posY = Math.sin(x * 0.2) * Math.cos(z * 0.2) * 4 - 25;

          positions[idx * 3] = posX;
          positions[idx * 3 + 1] = posY;
          positions[idx * 3 + 2] = posZ;
          initialY[idx] = posY;

          // Color gradient across the grid
          const mixedColor = new THREE.Color();
          const dist = Math.sqrt(x * x + z * z) / gridDim;
          if (dist < 0.4) {
            mixedColor.copy(cyan);
          } else if (dist < 0.75) {
            mixedColor.lerpColors(cyan, indigo, (dist - 0.4) / 0.35);
          } else {
            mixedColor.lerpColors(indigo, emerald, (dist - 0.75) / 0.25);
          }

          colors[idx * 3] = mixedColor.r;
          colors[idx * 3 + 1] = mixedColor.g;
          colors[idx * 3 + 2] = mixedColor.b;

          idx++;
        }
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 2. Floating 3D Geometric Compute & Storage Nodes
    const nodesGroup = new THREE.Group();
    const nodeGeometries = [
      new THREE.IcosahedronGeometry(2.2, 0),
      new THREE.OctahedronGeometry(2.5, 0),
      new THREE.DodecahedronGeometry(2.0, 0),
      new THREE.BoxGeometry(2.6, 2.6, 2.6)
    ];

    const nodeMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.7 }),
      new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.6 }),
      new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.65 }),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.5 })
    ];

    const nodes = [];
    const nodeCount = 14;

    for (let i = 0; i < nodeCount; i++) {
      const geo = nodeGeometries[i % nodeGeometries.length];
      const mat = nodeMaterials[i % nodeMaterials.length];
      const mesh = new THREE.Mesh(geo, mat);

      mesh.position.x = (Math.random() - 0.5) * 110;
      mesh.position.y = (Math.random() - 0.5) * 60 + 5;
      mesh.position.z = (Math.random() - 0.5) * 60;

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;

      const rotSpeed = {
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015
      };

      const floatSpeed = 0.001 + Math.random() * 0.002;
      const floatOffset = Math.random() * Math.PI * 2;

      nodes.push({ mesh, rotSpeed, floatSpeed, floatOffset, basePosY: mesh.position.y });
      nodesGroup.add(mesh);
    }
    scene.add(nodesGroup);

    // 3. Dynamic Connecting Data Stream Lines between close nodes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(nodeCount * nodeCount * 6);
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(lineGeo, lineMaterial);
    scene.add(linesMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.035;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.035;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 0.6;
      camera.position.y = 10 - targetY * 0.6;
      camera.lookAt(0, 0, -10);

      // Animate particle mesh waves
      const posArr = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const px = posArr[i * 3];
        const pz = posArr[i * 3 + 2];
        posArr[i * 3 + 1] =
          initialY[i] +
          Math.sin(elapsedTime * 1.5 + px * 0.08) * 3 +
          Math.cos(elapsedTime * 1.2 + pz * 0.08) * 2;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = elapsedTime * 0.015;

      // Animate 3D Compute Nodes
      nodes.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
        item.mesh.position.y = item.basePosY + Math.sin(elapsedTime * 1.5 + item.floatOffset) * 2.5;
      });

      // Update lines between nearby nodes
      let lineIdx = 0;
      const linePos = lineGeo.attributes.position.array;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = nodes[i].mesh.position.distanceTo(nodes[j].mesh.position);
          if (dist < 42) {
            linePos[lineIdx++] = nodes[i].mesh.position.x;
            linePos[lineIdx++] = nodes[i].mesh.position.y;
            linePos[lineIdx++] = nodes[i].mesh.position.z;

            linePos[lineIdx++] = nodes[j].mesh.position.x;
            linePos[lineIdx++] = nodes[j].mesh.position.y;
            linePos[lineIdx++] = nodes[j].mesh.position.z;
          }
        }
      }
      lineGeo.setDrawRange(0, lineIdx / 3);
      lineGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      lineGeo.dispose();
      lineMaterial.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
      aria-hidden="true"
    />
  );
}
