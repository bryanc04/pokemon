import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import downarrow from "/assets/doubledown.svg";
import { useNavigate } from "react-router-dom";

const About = () => {
  return (
    <motion.div className="minipage">
      <div style={{ fontSize: 30 }}>About</div>
      <div style={{ height: "100%" }}>
        <div className="bodytext">
          Hi! My name is Bryan Chung (as you can infer from the url), and I am a
          high school senior at The Loomis Chafee School. My interests include
          classical machine learning and natural language processing, quantum
          computing, astrophysics, quantum physics, stochastic processes,
          mathematics, and cryptography.
          <br />
          <br />
          You can find me in the Katherine Brush Library every Thursday
          afternoon with the Go Club—feel free to join us there! I’m also a big
          soccer fan, and every Friday/Saturday night I will likely be playing
          soccer with friends on Pratt Field.
          <br />
          <br /> Besides, my favorite artist is Kendrick Lamar, and I am
          currently on a mission to memorize the lyrics of every single one of
          his songs!
        </div>
      </div>
    </motion.div>
  );
};

export default About;
