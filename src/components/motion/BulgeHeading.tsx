"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

function copyLook(from: Element, to: Element) {
  const cs = getComputedStyle(from);
  if (to instanceof HTMLElement || to instanceof SVGElement) {
    for (let i = 0; i < cs.length; i += 1) {
      const prop = cs.item(i);
      to.style.setProperty(prop, cs.getPropertyValue(prop), cs.getPropertyPriority(prop));
    }
    to.style.setProperty("opacity", "1");
    to.style.setProperty("filter", "none");
    to.style.setProperty("transform", "none");
    to.style.setProperty("translate", "none");
    to.style.setProperty("animation", "none");
    to.style.setProperty("transition", "none");
  }
  const fromKids = [...from.children];
  const toKids = [...to.children];
  for (let i = 0; i < fromKids.length && i < toKids.length; i += 1) {
    copyLook(fromKids[i]!, toKids[i]!);
  }
}

function uniquifyIds(root: Element) {
  const suffix = `-bulge-${Math.random().toString(36).slice(2, 8)}`;
  const mapped = new Map<string, string>();
  root.querySelectorAll("[id]").forEach((el) => {
    const next = `${el.id}${suffix}`;
    mapped.set(el.id, next);
    el.id = next;
  });
  const rewrite = (value: string) => {
    let next = value;
    mapped.forEach((to, from) => {
      next = next.replaceAll(`#${from}`, `#${to}`);
    });
    return next;
  };
  root.querySelectorAll("*").forEach((el) => {
    for (const attr of ["fill", "stroke", "href", "xlink:href", "style"]) {
      const val = el.getAttribute(attr);
      if (val?.includes("#")) el.setAttribute(attr, rewrite(val));
    }
  });
}

async function embedImages(root: Element) {
  const images = [...root.querySelectorAll("img")];
  await Promise.all(
    images.map(async (img) => {
      const src = img.currentSrc || img.src;
      if (!src || src.startsWith("data:")) return;
      try {
        const res = await fetch(src, { mode: "cors" });
        const blob = await res.blob();
        img.src = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        img.removeAttribute("srcset");
      } catch {
        /* Keep the original source if CORS blocks it. */
      }
    }),
  );
}

function hasInk(shot: HTMLCanvasElement) {
  const ctx = shot.getContext("2d", { willReadFrequently: true });
  if (!ctx) return true;
  try {
    const { data } = ctx.getImageData(0, 0, shot.width, shot.height);
    for (let i = 3; i < data.length; i += 64) {
      if ((data[i] ?? 0) > 8) return true;
    }
  } catch {
    return true;
  }
  return false;
}

async function rasterize(heading: HTMLElement) {
  const { toCanvas, getFontEmbedCSS } = await import("html-to-image");
  const rect = heading.getBoundingClientRect();
  const clone = heading.cloneNode(true) as HTMLElement;
  copyLook(heading, clone);
  uniquifyIds(clone);
  await embedImages(clone);

  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = `position:fixed;left:0;top:0;z-index:-1;width:${Math.round(rect.width)}px;height:${Math.round(rect.height)}px;pointer-events:none;`;
  clone.removeAttribute("id");
  clone.style.margin = "0";
  clone.style.width = `${rect.width}px`;
  clone.style.height = `${rect.height}px`;
  clone.style.opacity = "1";
  host.appendChild(clone);
  document.body.appendChild(host);

  try {
    await document.fonts?.ready;
    await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    const fontEmbedCSS = await getFontEmbedCSS(heading).catch(() => "");
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    return await toCanvas(clone, {
      pixelRatio: ratio,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      fontEmbedCSS,
      cacheBust: false,
      skipAutoScale: true,
    });
  } finally {
    host.remove();
  }
}

/**
 * Codrops bulge: a perspective mesh of the heading, vertices pushed toward
 * the camera around the cursor. See romanjeanelie/bulge-text-effect-codrops (MIT).
 */
export function BulgeHeading({ id, className, style, children }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const canvas = canvasRef.current;
    if (!heading || !canvas) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let disposed = false;
    let teardown = () => {};

    const boot = async () => {
      await document.fonts?.ready;
      await Promise.all(
        [...heading.querySelectorAll("img")].map((img) => img.decode?.().catch(() => undefined)),
      );
      if (disposed) return;

      const THREE = await import("three");
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
      });
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.01, 40);
      const uniforms = {
        uMouse: { value: new THREE.Vector2(0.5, 2.4) },
        uRadius: { value: 0.3 },
        uStrength: { value: 0 },
        uAspect: { value: 1 },
      };
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      });
      material.onBeforeCompile = (shader) => {
        shader.uniforms.uMouse = uniforms.uMouse;
        shader.uniforms.uRadius = uniforms.uRadius;
        shader.uniforms.uStrength = uniforms.uStrength;
        shader.uniforms.uAspect = uniforms.uAspect;
        shader.vertexShader =
          "uniform vec2 uMouse;uniform float uRadius;uniform float uStrength;uniform float uAspect;\n" +
          shader.vertexShader.replace(
            "#include <begin_vertex>",
            `#include <begin_vertex>
             float bulgeDist = distance(uv * vec2(uAspect, 1.0), uMouse * vec2(uAspect, 1.0));
             float bulgeCore = bulgeDist / max(uRadius, 0.0001);
             float bulgeWide = bulgeDist / max(uRadius * 1.35, 0.0001);
             float bulgeLift = 0.0;
             if (bulgeCore < 1.0) bulgeLift += 0.7 * pow(1.0 - bulgeCore * bulgeCore, 1.6);
             if (bulgeWide < 1.0) bulgeLift += 0.3 * pow(1.0 - bulgeWide * bulgeWide, 2.0);
             transformed.z += bulgeLift * uStrength;`,
          );
      };
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 1, 256, 128), material);
      scene.add(mesh);

      const mouse = new THREE.Vector2(0.5, 2.4);
      const target = new THREE.Vector2(0.5, 2.4);
      let strength = 0;
      let targetStrength = 0;
      let texture: InstanceType<typeof THREE.CanvasTexture> | null = null;
      let generation = 0;
      let resizeTimer = 0;
      let shown = false;

      const layout = () => {
        const rect = heading.getBoundingClientRect();
        if (rect.width < 8 || rect.height < 8) return rect;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(rect.width, rect.height, false);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        const planeW = 2;
        const planeH = planeW * (rect.height / rect.width);
        mesh.geometry.dispose();
        mesh.geometry = new THREE.PlaneGeometry(planeW, planeH, 256, 128);

        camera.aspect = rect.width / rect.height;
        const distance = planeH / 2 / Math.tan((camera.fov * Math.PI) / 360);
        camera.position.set(0, 0, distance);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();

        uniforms.uAspect.value = rect.width / rect.height;
        uniforms.uRadius.value = 0.3;
        uniforms.uStrength.value = planeH * 0.07 * strength;
        return rect;
      };

      const applyShot = (shot: HTMLCanvasElement) => {
        layout();
        if (!texture) {
          texture = new THREE.CanvasTexture(shot);
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.generateMipmaps = false;
          texture.needsUpdate = true;
          material.map = texture;
          material.needsUpdate = true;
        } else {
          texture.image = shot;
          texture.needsUpdate = true;
        }
        if (!shown) {
          heading.style.opacity = "0";
          canvas.style.opacity = "1";
          shown = true;
        }
      };

      const capture = async () => {
        const token = ++generation;
        for (const wait of [0, 350]) {
          if (wait) await new Promise((resolve) => window.setTimeout(resolve, wait));
          if (disposed || token !== generation) return;
          try {
            const shot = await rasterize(heading);
            if (disposed || token !== generation || !hasInk(shot)) continue;
            applyShot(shot);
            return;
          } catch {
            /* Keep the live heading if the snapshot fails. */
          }
        }
      };

      const onPointer = (event: PointerEvent) => {
        const rect = heading.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const inside = x >= -0.04 && x <= 1.04 && y >= -0.08 && y <= 1.08;
        if (!inside) {
          targetStrength = 0;
          return;
        }
        target.set(x, 1 - y);
        targetStrength = 1;
      };

      const onResize = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          layout();
          void capture();
        }, 160);
      };

      layout();
      renderer.setAnimationLoop(() => {
        mouse.lerp(target, 0.1);
        strength += (targetStrength - strength) * 0.1;
        uniforms.uMouse.value.copy(mouse);
        const planeH = 2 * (canvas.clientHeight / Math.max(canvas.clientWidth, 1));
        uniforms.uStrength.value = planeH * 0.07 * strength;
        renderer.render(scene, camera);
      });

      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("resize", onResize);
      const observer = new ResizeObserver(onResize);
      observer.observe(heading);
      void capture();

      teardown = () => {
        generation += 1;
        window.clearTimeout(resizeTimer);
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("resize", onResize);
        observer.disconnect();
        renderer.setAnimationLoop(null);
        mesh.geometry.dispose();
        material.dispose();
        texture?.dispose();
        renderer.dispose();
        heading.style.opacity = "";
        canvas.style.opacity = "0";
      };
      if (disposed) teardown();
    };

    void boot();
    return () => {
      disposed = true;
      teardown();
    };
  }, []);

  return (
    <div className="relative w-full">
      <h1 ref={headingRef} id={id} className={className} style={style}>
        {children}
      </h1>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full opacity-0"
      />
    </div>
  );
}
