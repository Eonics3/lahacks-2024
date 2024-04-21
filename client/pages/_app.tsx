import { useRouter } from "next/router";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import SignInPage from "../components/SignInPage"; //

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showNavbar = !["/login", "/special"].includes(router.pathname);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
