import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import downarrow from "/assets/doubledown.svg";
import { useNavigate } from "react-router-dom";

const Page1 = () => {
  return (
    <motion.div
      key="content1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
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
      </div>
      <TypeAnimation
        sequence={["       ", 1000, "Scroll down to select options.", 1000]}
        wrapper="div"
        speed={{ type: "keyStrokeDelayInMs", value: 120 }}
        deletionSpeed={{ type: "keyStrokeDelayInMs", value: 80 }}
        style={{
          fontSize: "15px",
          marginTop: "20px",
          top: "85%",
          position: "absolute",
        }}
        repeat={0}
      />
      <div className="iconcontainer blink" style={{ marginTop: "20px" }}>
        <img src={downarrow} alt="Scroll down" />
      </div>
    </motion.div>
  );
};

export default Page1;
