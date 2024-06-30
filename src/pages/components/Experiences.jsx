import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import downarrow from "/assets/doubledown.svg";
import { useNavigate } from "react-router-dom";
import Experiences from "../../data/Experiences.json";

const About = () => {
  return (
    <motion.div className="minipage">
      <div style={{ fontSize: 30 }}>Experiences</div>
      <div style={{ height: "100%" }}>
        <div className="bodytext">
          {Object.keys(Experiences).map((val, index) => {
            console.log(val);
            return (
              <>
                <div style={{ paddingBottom: "8px" }}>
                  &#x2022; {Experiences[val]["name"]} (
                  {Experiences[val]["date"]}){" "}
                  <div style={{ fontSize: "8px", paddingLeft: "10px" }}>
                    {Experiences[val]["description"]}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default About;
