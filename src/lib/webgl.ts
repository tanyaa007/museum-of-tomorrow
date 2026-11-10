let cached: boolean | null = null;

/** Quick capability check so we can show a fallback instead of a broken canvas. */
export function isWebGLAvailable(): boolean {
  if (cached !== null) return cached;
  try {
    const canvas = document.createElement('canvas');
    const ctx = (canvas.getContext('webgl2') || canvas.getContext('webgl')) as (WebGLRenderingContext | null);
    const ok = !!ctx;
    if (ctx) {
      // Release test context immediately so it does not count against browser context limit
      const ext = ctx.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    }
    cached = ok;
    return ok;
  } catch {
    cached = false;
    return false;
  }
}
