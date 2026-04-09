import { useEffect, useRef } from 'react';
import { generateQRDataUrl } from '../utils';
import { usePosterStore } from '../store/usePosterStore';

export function usePosterEffects() {
  const reglink = usePosterStore((state) => state.poster.reglink);
  const size = usePosterStore((state) => state.design.size);
  const isDark = usePosterStore((state) => state.isDark);
  const setQrDataUrl = usePosterStore((state) => state.setQrDataUrl);
  const qrTimer = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    clearTimeout(qrTimer.current);

    if (!reglink) {
      setQrDataUrl(null);
      return undefined;
    }

    let cancelled = false;

    qrTimer.current = setTimeout(async () => {
      const url = await generateQRDataUrl(reglink, size);
      if (!cancelled) {
        setQrDataUrl(url);
      }
    }, 600);

    return () => {
      cancelled = true;
      clearTimeout(qrTimer.current);
    };
  }, [reglink, setQrDataUrl, size]);
}
