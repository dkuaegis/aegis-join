import { useEffect, useState } from 'react';

/**
 * 카카오톡 인앱 브라우저 환경을 감지하고,
 * 기본 브라우저를 여는 기능을 제공하는 커스텀 훅
 * @returns { isKakaoInApp: boolean, openInDefaultBrowser: () => void }
 */
export function useExternalBrowser() {
  const [isKakaoInApp, setIsKakaoInApp] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트된 후에 navigator 객체에 접근
    const userAgent = navigator.userAgent.toLowerCase();
    setIsKakaoInApp(userAgent.includes('kakaotalk'));
  }, []);

  const openInDefaultBrowser = () => {
    if (!isKakaoInApp) return;

    const currentUrl = window.location.href;
    
    // 안드로이드: package 지정 없이, fallback URL과 함께 인텐트 호출
    location.href =
      'intent:' +
      currentUrl.replace(/https?:\/\//i, '') +
      '#Intent;scheme=https;S.browser_fallback_url=' +
      encodeURIComponent(currentUrl) +
      ';end;';
  };

  return { isKakaoInApp, openInDefaultBrowser };
}