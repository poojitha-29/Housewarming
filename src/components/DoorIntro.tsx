import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { EVENT_CONFIG } from "../config/event";
import { Sparkles, ArrowRight } from "lucide-react";

// ─── Luxury Polished Architectural Door Panel ────────────────────────────────
function LuxuryDoorPanel({
  isLeft,
  openProgress,
}: {
  isLeft: boolean;
  openProgress: number;
}) {
  const meshRef = useRef<THREE.Group>(null!);
  const hingeX = isLeft ? -1.15 : 1.15;
  const targetAngle = isLeft ? -openProgress * Math.PI * 0.68 : openProgress * Math.PI * 0.68;

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetAngle,
      0.038
    );
  });

  // Rich warm Teakwood with gold inlays
  const teakColor = new THREE.Color(0x733816);
  const darkTeak = new THREE.Color(0x4a220c);
  const satinGold = new THREE.Color(0xd4af37);

  return (
    <group position={[hingeX, 0, 0]} ref={meshRef}>
      {/* Main Door Slab */}
      <mesh position={[isLeft ? -1.0 : 1.0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.05, 4.4, 0.12]} />
        <meshStandardMaterial
          color={teakColor}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      {/* Recessed Architectural Panels with Gold Trim */}
      {[-1.3, -0.2, 0.95].map((y, i) => (
        <group key={i} position={[isLeft ? -1.0 : 1.0, y, 0.065]}>
          {/* Inner Inset Panel */}
          <mesh castShadow>
            <boxGeometry args={[1.65, 0.92, 0.02]} />
            <meshStandardMaterial color={darkTeak} roughness={0.45} />
          </mesh>
          {/* Fine Gold Beading Frame */}
          <mesh position={[0, 0, 0.015]}>
            <boxGeometry args={[1.5, 0.8, 0.005]} />
            <meshStandardMaterial color={satinGold} metalness={0.8} roughness={0.25} />
          </mesh>
          {/* Center Floral Brass Medallion */}
          <mesh position={[0, 0, 0.022]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.01, 24]} />
            <meshStandardMaterial color={satinGold} metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Long Brushed Brass Vertical Designer Handle */}
      <group position={[isLeft ? -0.18 : 0.18, 0, 0.1]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.022, 0.022, 1.2, 16]} />
          <meshStandardMaterial color={satinGold} metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Handle Mounts */}
        <mesh position={[0, 0.5, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.08, 12]} />
          <meshStandardMaterial color={satinGold} metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.5, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.08, 12]} />
          <meshStandardMaterial color={satinGold} metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// ─── Grand White Marble Door Frame ───────────────────────────────────────────
function MarbleDoorFrame() {
  const marbleColor = new THREE.Color(0xf5f3ee);
  const goldColor = new THREE.Color(0xd4af37);

  return (
    <group>
      {/* Top lintel */}
      <mesh position={[0, 2.38, 0]} castShadow>
        <boxGeometry args={[4.8, 0.38, 0.28]} />
        <meshStandardMaterial color={marbleColor} roughness={0.25} metalness={0.05} />
      </mesh>
      {/* Top Gold Inlay Strip */}
      <mesh position={[0, 2.38, 0.145]}>
        <boxGeometry args={[3.6, 0.05, 0.01]} />
        <meshStandardMaterial color={goldColor} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Left side pillar */}
      <mesh position={[-2.35, 0, 0]} castShadow>
        <boxGeometry args={[0.3, 4.8, 0.26]} />
        <meshStandardMaterial color={marbleColor} roughness={0.25} metalness={0.05} />
      </mesh>
      {/* Right side pillar */}
      <mesh position={[2.35, 0, 0]} castShadow>
        <boxGeometry args={[0.3, 4.8, 0.26]} />
        <meshStandardMaterial color={marbleColor} roughness={0.25} metalness={0.05} />
      </mesh>

      {/* Polished Brass Threshold (Gadapa) */}
      <mesh position={[0, -2.25, 0]}>
        <boxGeometry args={[4.8, 0.12, 0.4]} />
        <meshStandardMaterial color={0xc5a059} metalness={0.8} roughness={0.25} />
      </mesh>
    </group>
  );
}

// ─── Delicate Mango Leaf & Marigold Toran ────────────────────────────────────
function FreshToran() {
  const leafGreen = new THREE.Color(0x2e7d32);
  const marigoldColor = new THREE.Color(0xff9800);
  const jasmineWhite = new THREE.Color(0xffffff);

  return (
    <group position={[0, 2.18, 0.14]}>
      {/* Golden Thread */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 4.4, 8]} />
        <meshStandardMaterial color={0xd4af37} metalness={0.8} roughness={0.3} />
      </mesh>

      {Array.from({ length: 15 }).map((_, i) => {
        const x = -1.95 + i * 0.28;
        const dip = Math.sin(i * 0.65) * 0.09;
        return (
          <group key={i} position={[x, -0.12 + dip, 0]}>
            {/* Mango Leaf */}
            <mesh rotation={[0.2, 0, (i % 2 === 0 ? 1 : -1) * 0.25]}>
              <coneGeometry args={[0.055, 0.26, 4]} />
              <meshStandardMaterial color={leafGreen} roughness={0.5} />
            </mesh>
            {/* Alternating Marigold and Jasmine */}
            <mesh position={[0, -0.16, 0.02]}>
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? marigoldColor : jasmineWhite}
                roughness={0.4}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// ─── Twin Traditional Polished Brass Lamps (Vilakku) ────────────────────────
function PolishedDiya({ position }: { position: [number, number, number] }) {
  const flameRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(clock.elapsedTime * 8) * 0.16;
      flameRef.current.scale.x = 1 + Math.sin(clock.elapsedTime * 6) * 0.1;
    }
  });

  const brassColor = new THREE.Color(0xd4af37);

  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.16, 0.22, 0.08, 20]} />
        <meshStandardMaterial color={brassColor} metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Central Pillar */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.035, 0.055, 0.7, 16]} />
        <meshStandardMaterial color={brassColor} metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Oil Dish */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.18, 0.1, 0.06, 20]} />
        <meshStandardMaterial color={brassColor} metalness={0.92} roughness={0.18} />
      </mesh>
      {/* Crown */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color={brassColor} metalness={0.95} roughness={0.15} />
      </mesh>
      {/* Diya Flame */}
      <mesh ref={flameRef} position={[0, 0.42, 0]}>
        <coneGeometry args={[0.035, 0.14, 12]} />
        <meshStandardMaterial
          color={0xfffaea}
          emissive={new THREE.Color(0xff9900)}
          emissiveIntensity={3}
        />
      </mesh>
      <pointLight position={[0, 0.45, 0]} intensity={1.4} color={0xffb347} distance={3} decay={2} />
    </group>
  );
}

// ─── Interior Revealed: Sunlit Luxury Penthouse Living Room ──────────────────
function RevealedInterior({ openProgress }: { openProgress: number }) {
  return (
    <group position={[0, 0, -1.2]}>
      {/* Bright sunlight streaming from inside */}
      <pointLight position={[0, 1.5, 0]} intensity={openProgress * 2.8} color={0xfffae0} distance={10} />
      
      {/* Interior Floor: Warm Golden Italian Marble */}
      <mesh position={[0, -2.25, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color={0xf2ede4} roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Interior Sunlit Back Wall / Skyline View */}
      <mesh position={[0, 0.5, -4]}>
        <planeGeometry args={[12, 7]} />
        <meshStandardMaterial
          color={new THREE.Color(0xfff8ee)}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

// ─── Camera Controller with Smooth Ease ──────────────────────────────────────
function SmoothCameraController({
  phase,
  onComplete,
}: {
  phase: "idle" | "opening" | "entering" | "done";
  onComplete: () => void;
}) {
  const { camera } = useThree();
  const startZ = useRef(5.2);
  const tRef = useRef(0);
  const doneRef = useRef(false);

  useEffect(() => {
    camera.position.set(0, 0.1, startZ.current);
    camera.lookAt(0, 0.05, 0);
  }, [camera]);

  useFrame((_, delta) => {
    if (phase === "entering") {
      tRef.current = Math.min(tRef.current + delta * 0.38, 1);
      // Smooth cubic bezier easing
      const t = tRef.current;
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      
      camera.position.z = THREE.MathUtils.lerp(startZ.current, -1.6, ease);
      camera.position.y = THREE.MathUtils.lerp(0.1, 0.0, ease);
      camera.lookAt(0, 0, -6);

      if (tRef.current >= 1 && !doneRef.current) {
        doneRef.current = true;
        onComplete();
      }
    }
  });

  return null;
}

// ─── 3D Scene Assembly ───────────────────────────────────────────────────────
function DoorScene({
  phase,
  onEnterComplete,
}: {
  phase: "idle" | "opening" | "entering" | "done";
  onEnterComplete: () => void;
}) {
  const openProgress = phase === "opening" || phase === "entering" || phase === "done" ? 1 : 0;

  return (
    <>
      {/* Bright, Warm Daylight Ambient */}
      <ambientLight intensity={1.1} color={0xfffaf0} />
      <directionalLight position={[4, 6, 4]} intensity={1.5} color={0xfff8ee} castShadow />
      <directionalLight position={[-4, 4, 2]} intensity={0.8} color={0xffe8d6} />

      {/* Exterior White Marble Entrance Porch */}
      <mesh position={[0, -2.25, 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color={0xf8f6f0} roughness={0.25} metalness={0.05} />
      </mesh>

      {/* Outer Ivory Wall */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[14, 8]} />
        <meshStandardMaterial color={0xf2eee6} roughness={0.6} />
      </mesh>

      <MarbleDoorFrame />
      <LuxuryDoorPanel isLeft openProgress={openProgress} />
      <LuxuryDoorPanel isLeft={false} openProgress={openProgress} />
      <FreshToran />
      <RevealedInterior openProgress={openProgress} />

      <PolishedDiya position={[-2.8, -1.75, 0.6]} />
      <PolishedDiya position={[2.8, -1.75, 0.6]} />

      <SmoothCameraController phase={phase} onComplete={onEnterComplete} />
    </>
  );
}

// ─── Pristine White/Ivory Luxury Overlay with Family Tribute ──────────────────
function PristineLuxuryOverlay({
  phase,
  onSkip,
}: {
  phase: "idle" | "opening" | "entering" | "done";
  onSkip: () => void;
}) {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between p-6 sm:p-10 z-20">
      {/* Top Bar with Skip */}
      <div className="w-full flex items-center justify-between">
        <div className="bg-white/90 backdrop-blur-md border border-[#E5DECF] px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
          <span className="text-amber-600 text-lg">🕉️</span>
          <span className="text-[#8B5E3C] font-serif text-xs sm:text-sm font-semibold tracking-widest uppercase">
            ॥ शुभ गृहप्रवेशम् ॥
          </span>
        </div>

        <button
          onClick={onSkip}
          className="pointer-events-auto bg-[#1C1917] hover:bg-[#C5A059] text-white font-medium text-xs tracking-wider uppercase px-5 py-2.5 rounded-full shadow-md transition-all active:scale-95 flex items-center gap-2"
        >
          <span>Enter Website</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* ── Stage 1: Closed Doors Welcome ── */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-xl mx-auto bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-[#E5DECF] shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
          >
            {/* Fine Gold Filigree Ganesha Crest */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-[#FAF6ED] to-white border border-[#D4AF37]/50 flex items-center justify-center text-3xl shadow-sm">
              🪔
            </div>

            <p className="text-[#B45309] text-xs font-semibold tracking-[0.35em] uppercase mb-2">
              ॥ ॐ श्री गणेशाय नमः ॥
            </p>

            <h1
              className="text-4xl sm:text-5xl text-[#1C1917] font-serif font-bold tracking-tight mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Srikanth &amp; Sivapriya
            </h1>

            {/* Respectful & Elegant Family Introduction */}
            <div className="inline-block my-2 border-y border-[#D4AF37]/40 py-1.5 px-6">
              <p className="text-[#8B5E3C] text-sm sm:text-base font-serif italic font-medium">
                Welcoming you along with their Two Elder Daughters
              </p>
            </div>

            <p className="text-[#57534E] text-xs sm:text-sm mt-3 tracking-wider">
              On Cloud 33 · Tower 3 · Floor 12 · Flat 1208
            </p>

            <div className="mt-6 flex items-center justify-center gap-2 text-[#C5A059] text-xs tracking-widest uppercase font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
              Opening The Doors of Our Dream Home…
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Stage 2: The Family Sacred Entrance (High-End & Poetic, NO cartoonish stick figures) ── */}
      <AnimatePresence>
        {(phase === "opening" || phase === "entering") && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-center w-full max-w-xl mx-auto bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-[#D4AF37]/60 shadow-[0_25px_60px_rgba(0,0,0,0.12)]"
          >
            {/* Fine Gold Crest */}
            <div className="flex items-center justify-center gap-2 text-[#B45309] text-xs font-serif uppercase tracking-widest font-bold mb-3">
              <span>🌸</span>
              <span>॥ गृहप्रवेश शुभ मुहूर्तम ॥</span>
              <span>🌸</span>
            </div>

            {/* Sacred Kalash & Auspicious Threshold Graphic */}
            <div className="w-20 h-20 mx-auto my-3 rounded-full bg-gradient-to-b from-[#FFFDF9] to-[#F5EFEB] border-2 border-[#D4AF37] flex items-center justify-center shadow-md">
              <span className="text-4xl">🪴</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl text-[#1C1917] font-serif font-bold mt-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Srikanth, Sivapriya &amp; Their Two Daughters
            </h2>

            <p className="text-[#8B5E3C] text-sm sm:text-base font-serif italic mt-2 leading-relaxed">
              "Stepping across the sacred threshold into their dream abode at On Cloud 33 with divine blessings, health, and eternal prosperity."
            </p>

            {/* Auspicious Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs text-[#57534E]">
              <span className="bg-[#FAF8F5] border border-[#E5DECF] px-3 py-1.5 rounded-full font-medium text-[#8B5E3C]">
                ✨ Vastu Puja &amp; Homam
              </span>
              <span className="bg-[#FAF8F5] border border-[#E5DECF] px-3 py-1.5 rounded-full font-medium text-[#8B5E3C]">
                ✨ Sacred Milk Boiling
              </span>
              <span className="bg-[#FAF8F5] border border-[#E5DECF] px-3 py-1.5 rounded-full font-medium text-[#8B5E3C]">
                ✨ Satyanarayana Vratam
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Subtitle */}
      <div className="w-full text-center">
        <p className="text-[#78716C] text-xs tracking-widest uppercase font-medium">
          200 Ft Miyapur-Bachupally Main Road · Hyderabad
        </p>
      </div>
    </div>
  );
}

// ─── Main Export Component ───────────────────────────────────────────────────
interface DoorIntroProps {
  onComplete: () => void;
  webGLSupported: boolean;
}

type Phase = "idle" | "opening" | "entering" | "done";

export default function DoorIntro({ onComplete, webGLSupported }: DoorIntroProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 1. Show closed doors with elegant welcome (2.4s)
    const t1 = setTimeout(() => setPhase("opening"), 2400);
    // 2. Doors open wide and camera enters (6.2s)
    const t2 = setTimeout(() => setPhase("entering"), 6400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleEnterComplete = () => {
    setPhase("done");
    setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 400);
  };

  const handleSkip = () => {
    setVisible(false);
    onComplete();
  };

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#FCFBF7] overflow-hidden"
      exit={{ opacity: 0 }}
      animate={{ opacity: phase === "done" ? 0 : 1 }}
      transition={{ duration: 0.8 }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0.1, 5.2], fov: 52 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <DoorScene phase={phase} onEnterComplete={handleEnterComplete} />
      </Canvas>

      <PristineLuxuryOverlay phase={phase} onSkip={handleSkip} />
    </motion.div>
  );
}
