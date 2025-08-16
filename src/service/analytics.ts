import ReactGA from "react-ga4";
import mixpanel from "mixpanel-browser";

const gaMeasurementId: string | undefined = import.meta.env.VITE_GA_MEASUREMENT_ID;
const mixpanelToken: string | undefined = import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN;

interface MixpanelUserProfile {
  $name?: string;
  $email?: string;
  [key: string]: any; 
}

interface EventProperties {
  category?: string;
  [key: string]: any;
}

if (gaMeasurementId) {
  ReactGA.initialize(gaMeasurementId);
}

if (mixpanelToken) {
  mixpanel.init(mixpanelToken, {
    debug: process.env.NODE_ENV === "development",
    // track_pageview: true,
  });
}

/**
 * 사용자 식별 (로그인, 회원가입 시)
 * @param {string} userId - 우리 서비스의 유저 ID
 * @param {object} userData - 유저 프로필 정보 { $name, $email, ... }
 */
const identifyUser = (userId: string, userData: MixpanelUserProfile): void => {
  if (mixpanelToken) {
    mixpanel.identify(userId);
    mixpanel.people.set(userData);
  }
  if (gaMeasurementId) {
    ReactGA.set({ userId });
  }
};

/**
 * 이벤트 추적
 * @param {string} eventName - 이벤트 이름
 * @param {object} properties - 이벤트 상세 정보
 */
const trackEvent = (eventName: string, properties: EventProperties = {}): void => {
  if (mixpanelToken) {
    mixpanel.track(eventName, properties);
  }
  if (gaMeasurementId) {
    ReactGA.event({
      category: properties?.category || 'General',
      action: eventName,
    });
  }
};

const trackPageView = (path: string): void => {
  if (gaMeasurementId) {
    ReactGA.send({ hitType: "pageview", page: path });
  }
  if (mixpanelToken) {
    mixpanel.track("Page View", { page_path: path });
  }
};

/**
 * 페이지 로드 시 새로고침 여부를 확인하고 이벤트를 전송합니다.
 */
const checkAndTrackRefresh = (): void => {
  try {
    // Performance API가 지원되는지 확인
    if (window.performance) {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      
      if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
        console.log('Page was reloaded!');
        
        trackEvent('Page_Refreshed', {
          category: 'Navigation',
          page_path: window.location.pathname + window.location.search,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const Analytics = {
  identifyUser,
  trackEvent,
  trackPageView,
  checkAndTrackRefresh,
};