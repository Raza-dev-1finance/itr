declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export default function analytics(data = {}, eventName = "gtm.click") {
  if (typeof window !== 'undefined') {
    if (!window.dataLayer) {
      window.dataLayer = [];
    }
    window.dataLayer.push({
      event: eventName,
      ...data
    });
  } else {
    console.warn('analytics: window is not defined (probably SSR)');
  }
}