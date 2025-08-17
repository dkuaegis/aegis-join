import ReactGA from "react-ga4";
import mixpanel from "mixpanel-browser";

interface MixpanelUserProfile {
  $name?: string;
  $email?: string;
  [key: string]: string | number | boolean | undefined | null;
}

interface EventProperties {
  category?: string;
  [key: string]: string | number | boolean | undefined | null;
}

let isInitialized = false;

const isValidEnvVar = (value: string | undefined): value is string => {
  return !!value && !['false', 'null', 'undefined'].includes(value);
};

const isDev = import.meta.env.MODE === 'development';

const init = (): void => {
  if (isInitialized) {
    if (isDev) {
      console.warn("Analytics has already been initialized.");
    }
    return;
  }

  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const mixpanelToken = import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN;

  try {
    if (isValidEnvVar(gaMeasurementId)) {
      ReactGA.initialize(gaMeasurementId);
      if (isDev) console.log("GA initialized.");
    }

    if (isValidEnvVar(mixpanelToken)) {
      mixpanel.init(mixpanelToken, {
        debug: isDev,
      });
      if (isDev) console.log("Mixpanel initialized.");
    }
    isInitialized = true;
  } catch (error) {
    if (isDev) {
      console.error("Failed to initialize analytics:", error);
    }
  }
};

const identifyUser = (userId: string, userData: MixpanelUserProfile): void => {
  try {
    if (isValidEnvVar(import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN)) {
      mixpanel.identify(userId);
      mixpanel.people.set(userData);
    }
    if (isValidEnvVar(import.meta.env.VITE_GA_MEASUREMENT_ID)) {
      ReactGA.set({ userId });
    }
  } catch (error) {
    if (isDev) {
      console.error("Failed to identify user:", error);
    }
  }
};

// 학번/이름 기반 식별 헬퍼
const identifyStudent = (studentId: string, name?: string): void => {
  const profile: MixpanelUserProfile = {
    $name: name,
    student_id: studentId,
  };
  identifyUser(studentId, profile);
};

const trackEvent = (eventName: string, properties: EventProperties = {}): void => {
  try {
    if (isValidEnvVar(import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN)) {
      mixpanel.track(eventName, properties);
    }
    if (isValidEnvVar(import.meta.env.VITE_GA_MEASUREMENT_ID)) {
      ReactGA.event(eventName, properties);
    }
  } catch (error) {
    if (isDev) {
      console.error(`Failed to track event [${eventName}]:`, error);
    }
  }
};

const trackPageView = (path: string): void => {
  try {
    if (isValidEnvVar(import.meta.env.VITE_GA_MEASUREMENT_ID)) {
      ReactGA.send({ hitType: "pageview", page: path });
    }
    if (isValidEnvVar(import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN)) {
      mixpanel.track("Page View", { page_path: path });
    }
  } catch (error) {
    if (isDev) {
      console.error(`Failed to track page view [${path}]:`, error);
    }
  }
};

const checkAndTrackRefresh = (): void => {
  try {
    if (window.performance) {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
        trackEvent('Page Refreshed', {
          category: 'Navigation',
          page_path: window.location.pathname + window.location.search,
        });
      }
    }
  } catch (error) {
    if (isDev) {
      console.error("Failed to check and track refresh:", error);
    }
  }
};

export const Analytics = {
  init,
  identifyUser,
  identifyStudent,
  trackEvent,
  trackPageView,
  checkAndTrackRefresh,
};