"use client";

import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useId,
} from "react";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      render: (
        container: HTMLElement | string,
        parameters: {
          sitekey: string;
          theme?: "light" | "dark";
          size?: "normal" | "compact";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
    __onRecaptchaLoaded?: () => void;
  }
}

export interface GoogleRecaptchaRef {
  reset: () => void;
  getResponse: () => string | null;
}

export interface GoogleRecaptchaProps {
  siteKey?: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  theme?: "light" | "dark";
  size?: "normal" | "compact";
  className?: string;
}

const DEFAULT_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  "6Lcy_PwtAAAAAJB5hPOOMMyc-gFuIz8yoT99xlLV";

let isScriptLoading = false;
let isScriptLoaded = false;
const readyCallbacks: Array<() => void> = [];

function loadRecaptchaScript(onReady: () => void) {
  if (typeof window === "undefined") return;

  if (window.grecaptcha && typeof window.grecaptcha.render === "function") {
    isScriptLoaded = true;
    onReady();
    return;
  }

  readyCallbacks.push(onReady);

  if (isScriptLoading) return;
  isScriptLoading = true;

  window.__onRecaptchaLoaded = () => {
    isScriptLoaded = true;
    isScriptLoading = false;
    while (readyCallbacks.length > 0) {
      const cb = readyCallbacks.shift();
      if (cb) cb();
    }
  };

  const existingScript = document.getElementById("google-recaptcha-v2-script");
  if (!existingScript) {
    const script = document.createElement("script");
    script.id = "google-recaptcha-v2-script";
    script.src =
      "https://www.google.com/recaptcha/api.js?onload=__onRecaptchaLoaded&render=explicit";
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      console.error("Failed to load Google reCAPTCHA script.");
      isScriptLoading = false;
    };
    document.head.appendChild(script);
  }
}

const GoogleRecaptcha = forwardRef<GoogleRecaptchaRef, GoogleRecaptchaProps>(
  (
    {
      siteKey = DEFAULT_SITE_KEY,
      onVerify,
      onExpire,
      onError,
      theme = "light",
      size = "normal",
      className = "",
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<number | null>(null);
    const rawId = useId();
    const elementId = `recaptcha-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

    // Stable references to callbacks so typing in forms never re-renders the widget
    const onVerifyRef = useRef(onVerify);
    onVerifyRef.current = onVerify;

    const onExpireRef = useRef(onExpire);
    onExpireRef.current = onExpire;

    const onErrorRef = useRef(onError);
    onErrorRef.current = onError;

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (
          typeof window !== "undefined" &&
          window.grecaptcha &&
          widgetIdRef.current !== null
        ) {
          try {
            window.grecaptcha.reset(widgetIdRef.current);
          } catch (e) {
            console.warn("Could not reset reCAPTCHA widget:", e);
          }
        }
      },
      getResponse: () => {
        if (
          typeof window !== "undefined" &&
          window.grecaptcha &&
          widgetIdRef.current !== null
        ) {
          try {
            return window.grecaptcha.getResponse(widgetIdRef.current) || null;
          } catch (e) {
            console.warn("Could not get reCAPTCHA response:", e);
            return null;
          }
        }
        return null;
      },
    }));

    useEffect(() => {
      let isMounted = true;

      const renderWidget = () => {
        if (!isMounted || !containerRef.current) return;
        // Don't render again if already assigned a widget or element already has iframe
        if (widgetIdRef.current !== null) return;
        if (containerRef.current.children.length > 0) return;
        if (!window.grecaptcha || typeof window.grecaptcha.render !== "function")
          return;

        try {
          const id = window.grecaptcha.render(containerRef.current, {
            sitekey: siteKey,
            theme,
            size,
            callback: (token: string) => {
              if (isMounted) {
                onVerifyRef.current?.(token);
              }
            },
            "expired-callback": () => {
              if (isMounted) {
                onExpireRef.current?.();
              }
            },
            "error-callback": () => {
              if (isMounted) {
                onErrorRef.current?.();
              }
            },
          });
          widgetIdRef.current = id;
        } catch (err) {
          console.error("Error rendering reCAPTCHA:", err);
        }
      };

      loadRecaptchaScript(() => {
        if (window.grecaptcha && window.grecaptcha.ready) {
          window.grecaptcha.ready(renderWidget);
        } else {
          renderWidget();
        }
      });

      return () => {
        isMounted = false;
        widgetIdRef.current = null;
      };
    }, [siteKey, theme, size]);

    // Keep containerRef completely empty of React children so React NEVER
    // performs DOM reconciliation or removeChild on nodes modified by Google reCAPTCHA.
    return (
      <div className={`recaptcha-wrapper my-2 overflow-x-auto ${className}`}>
        <div
          id={elementId}
          ref={containerRef}
          className="inline-block min-h-[78px] min-w-[304px]"
        />
      </div>
    );
  }
);

GoogleRecaptcha.displayName = "GoogleRecaptcha";

export default GoogleRecaptcha;
