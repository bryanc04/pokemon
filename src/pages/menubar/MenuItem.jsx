import * as React from "react";
import { motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MenuItem = ({ index, value, curPage }) => {
  return (
    <motion.li
      style={{
        listStyleType: "none",
        border: "1px solid transparent",
        padding: "10px",
        fontSize: `${17 - Math.abs(curPage - index) * 2}px`,
        color: `${value == "fill" ? "transparent" : "black"}`,
      }}
      variants={variants}
      whileHover={{ border: "1px solid black" }}
      whileTap={{ scale: 0.95 }}
    >
      <div>{value}</div>
    </motion.li>
  );
};

export default MenuItem;
