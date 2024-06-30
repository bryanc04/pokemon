import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import downarrow from "/assets/doubledown.svg";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function App() {
  const [currentContent, setCurrentContent] = useState(0);
  const navigate = useNavigate();

  const handleScroll = (event) => {
    if (event.deltaY > 0 && currentContent === 0) {
      setCurrentContent(1);
    } else if (event.deltaY < 0 && currentContent === 1) {
      setCurrentContent(0);
    }
  };

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
          <motion.div
            key="content1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mainfont"
            style={{
              position: "absolute",
              textAlign: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "grid",
                left: "20%",
                transform: "translateX(-50%)",
                position: "absolute",
                letterSpacing: "2px",
                textAlign: "left",
              }}
            >
              <TypeAnimation
                sequence={["Welcome!", 4000]}
                wrapper="span"
                speed={{ type: "keyStrokeDelayInMs", value: 120 }}
                deletionSpeed={{ type: "keyStrokeDelayInMs", value: 80 }}
                style={{
                  fontSize: "50px",
                  display: "inline-block",
                  textDecoration: "underline",
                  textUnderlineOffset: "10px",
                  textDecorationThickness: "2px",
                }}
                repeat={0}
              />
              <TypeAnimation
                sequence={[
                  "       ",
                  1000,
                  "Scroll down to select options.",
                  1000,
                ]}
                wrapper="div"
                speed={{ type: "keyStrokeDelayInMs", value: 120 }}
                deletionSpeed={{ type: "keyStrokeDelayInMs", value: 80 }}
                style={{
                  fontSize: "15px",
                  marginTop: "20px",
                }}
                repeat={0}
              />
            </div>
            <div className="iconcontainer" style={{ marginTop: "20px" }}>
              <img src={downarrow} alt="Scroll down" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              top: "40%",
              width: "100%",
            }}
          >
            <p style={{ fontSize: "20px", marginBottom: "30px" }}>
              Select from the following:
            </p>
            <button
              onClick={() => navigate("/pokemon")}
              style={{
                fontSize: "18px",
                padding: "10px 20px",
                margin: "0 10px",
              }}
            >
              Pokemon (beta)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
