export function compressImageIfNeeded(
  dataUrlOrUrl: string,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.75
): Promise<string> {
  if (!dataUrlOrUrl || !dataUrlOrUrl.startsWith('data:image/')) {
    return Promise.resolve(dataUrlOrUrl || '');
  }

  // If data url size is under 200KB (~270,000 chars), return as is
  if (dataUrlOrUrl.length < 270000) {
    return Promise.resolve(dataUrlOrUrl);
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrlOrUrl.substring(0, 200000));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      } catch (e) {
        console.error('Failed to compress image canvas:', e);
        resolve('https://images.unsplash.com/photo-1595231712325-2fecd1f532a3?auto=format&fit=crop&w=800&q=80');
      }
    };
    img.onerror = () => {
      resolve('https://images.unsplash.com/photo-1595231712325-2fecd1f532a3?auto=format&fit=crop&w=800&q=80');
    };
    img.src = dataUrlOrUrl;
  });
}
