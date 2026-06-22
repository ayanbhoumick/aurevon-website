"use client";
import { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";

const vertex = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform float uGlow;

vec3 palette(float t) {
    return mix(
      vec3(0.45, 0.32, 0.10),
      vec3(0.79, 0.66, 0.40),
      0.5 + 0.5 * sin(t)
    );
}

float wave(vec2 uv, float freq, float phase) {
    return 0.4 * sin(uv.x * freq + uTime * uSpeed + phase);
}

float glow(float d, float strength) {
    return exp(-d * d * strength);
}

void main() {
    vec2 uv = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;

    float y = uv.y;

    float w1 = wave(uv, 3.0, 0.0);
    float w2 = wave(uv, 5.0, 1.0);
    float w3 = wave(uv, 7.0, 2.5);

    float waveLine = w1 + w2 * 0.6 + w3 * 0.4;

    float dist = abs(y - waveLine);
    float g = glow(dist, uGlow);

    vec3 col = palette(waveLine + y);
    vec3 bg = vec3(0.04, 0.04, 0.04);

    col = mix(bg, col, g * 1.2);

    gl_FragColor = vec4(col, 1.0);
}
`;

type Props = {
  speed?: number;
  glow?: number;
  resolutionScale?: number;
};

export default function AuroraWaves({
  speed = 0.4,
  glow = 12.0,
  resolutionScale = 1.0,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current as HTMLCanvasElement;
    const parent = canvas.parentElement as HTMLElement;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      canvas,
    });

    const gl = renderer.gl;
    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2() },
        uSpeed: { value: speed },
        uGlow: { value: glow },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      const rw = w * resolutionScale;
      const rh = h * resolutionScale;
      renderer.setSize(rw, rh);
      // OGL overrides canvas style.width/height — reset so canvas fills parent
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      program.uniforms.uResolution.value.set(rw, rh);
    };

    window.addEventListener("resize", resize);
    resize();

    const start = performance.now();
    let frame = 0;
    let destroyed = false;

    const loop = () => {
      if (destroyed) return;
      program.uniforms.uTime.value = (performance.now() - start) / 1000;
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      destroyed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [speed, glow, resolutionScale]);

  return <canvas ref={ref} className="w-full h-full block" />;
}
