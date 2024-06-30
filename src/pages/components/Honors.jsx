import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import downarrow from "/assets/doubledown.svg";
import { useNavigate } from "react-router-dom";
import Honors from "../../data/Honors.json";

const About = () => {
  return (
    <motion.div className="minipage">
      <div style={{ fontSize: 30 }}>Honors</div>
      <div style={{ height: "100%" }}>
        <div className="bodytext">
          {Object.keys(Honors).map((val, index) => (
            <>
              <div style={{ paddingBottom: "10px" }}>
                &#x2022; {Honors[val]["name"]} ({Honors[val]["date"]})
              </div>
            </>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default About;
