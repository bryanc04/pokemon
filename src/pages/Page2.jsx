import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import downarrow from "/assets/doubledown.svg";
import { useNavigate } from "react-router-dom";

const Page2 = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      key="content2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
      className="mainfont"
    >
      {/* <p style={{ fontSize: "20px", marginBottom: "30px" }}>
  Select from the following:
</p> */}
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
      <button
        onClick={() => navigate("/minifox")}
        style={{
          fontSize: "18px",
          padding: "10px 20px",
          margin: "0 10px",
        }}
      >
        Minifox (in work)
      </button>
      <TypeAnimation
        sequence={["Scroll down to enter classic view.", 1000]}
        wrapper="div"
        speed={{ type: "keyStrokeDelayInMs", value: 70 }}
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

export default Page2;
