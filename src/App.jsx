import React, { useState, useCallback, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import downarrow from "/assets/doubledown.svg";
import { useNavigate } from "react-router-dom";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";

export default function App() {
  const [currentContent, setCurrentContent] = useState(0);
  const navigate = useNavigate();
  const isScrollingRef = useRef(false);

  const handleScroll = useCallback(
    (event) => {
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      if (currentContent != 2) {
        if (event.deltaY > 0) {
          if (currentContent === 0) {
            setCurrentContent(1);
          } else if (currentContent === 1) {
            setCurrentContent(2);
          }
        } else if (event.deltaY < 0) {
          if (currentContent === 1) {
            setCurrentContent(0);
          } else if (currentContent === 2) {
            setCurrentContent(1);
          }
        }
      }

      // Reset the flag after a short delay
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1300);
    },
    [currentContent]
  );

  return (
    <div
      className="App"
      onWheel={handleScroll}
      style={{
        overflow: "hidden",
        height: "100vh",
        backgroundImage: "url(/assets/background.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          fontFamily: "Chopin Script",
          position: "absolute",
          left: "5%",
          top: "5%",
          fontSize: "40px",
        }}
      >
        Chung
      </div>
      <AnimatePresence mode="wait">
        {currentContent === 0 ? (
          <Page1 />
        ) : currentContent === 1 ? (
          <Page2 />
        ) : (
          <Page3 />
        )}
      </AnimatePresence>
    </div>
  );
}
