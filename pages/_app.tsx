import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { I18nextProvider } from "react-i18next";
import i18n from "../locales/i18n";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "../src/components/layout/Spinner";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      if (url !== router.asPath) {
        setLoading(true);
      }
    };

    const handleRouteChangeEnd = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeEnd);
    router.events.on("routeChangeError", handleRouteChangeEnd);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeEnd);
      router.events.off("routeChangeError", handleRouteChangeEnd);
    };
  }, [router]);

  return (
    <>
      {loading && <Spinner />}
      <I18nextProvider i18n={i18n}>
        <Component {...pageProps} />
      </I18nextProvider>
    </>
  );
}
