import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface TrackingCode {
  id: string;
  name: string;
  type: "ga4" | "gtm" | "google-ads" | "facebook-pixel" | "custom";
  value: string;
  enabled: boolean;
}

function buildSnippet(code: TrackingCode): string {
  switch (code.type) {
    case "ga4":
      return `<script async src="https://www.googletagmanager.com/gtag/js?id=${code.value}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${code.value}');</script>`;
    case "gtm":
      return `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${code.value}');</script>`;
    case "google-ads":
      return `<script async src="https://www.googletagmanager.com/gtag/js?id=${code.value}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${code.value}');</script>`;
    case "facebook-pixel":
      return `<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${code.value}');fbq('track','PageView');</script>`;
    case "custom":
      return code.value;
    default:
      return "";
  }
}

export function TrackingInjector() {
  const { data: codes = [] } = useQuery<TrackingCode[]>({
    queryKey: ["/api/tracking"],
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!codes.length) return;

    const injected: HTMLElement[] = [];

    codes.forEach((code) => {
      const snippet = buildSnippet(code);
      if (!snippet) return;

      const wrapper = document.createElement("div");
      wrapper.innerHTML = snippet;

      Array.from(wrapper.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          if (el.tagName === "SCRIPT") {
            const script = document.createElement("script");
            Array.from(el.attributes).forEach((attr) =>
              script.setAttribute(attr.name, attr.value)
            );
            script.textContent = el.textContent;
            document.head.appendChild(script);
            injected.push(script);
          } else {
            document.head.appendChild(el);
            injected.push(el);
          }
        }
      });
    });

    return () => {
      injected.forEach((el) => {
        try { document.head.removeChild(el); } catch {}
      });
    };
  }, [codes]);

  return null;
}
