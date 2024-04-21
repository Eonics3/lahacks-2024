import { useRouter } from "next/router";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import video from "./videos/videoplayback.mp4";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div className="App">
      <video />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
