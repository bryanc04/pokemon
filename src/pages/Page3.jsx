import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuItem from "./menubar/MenuItem";
import About from "./components/About";
import Education from "./components/Education";
import Experiences from "./components/Experiences";
import Honors from "./components/Honors";
import Publications from "./components/Publications";
const Pages = [
  "fill",
  "fill",
  "fill",
  "fill",
  "fill",
  "fill",
  "About",
  "Education",
  "Experiences",
  "Honors",
  "Publications",
  "Fun Facts",
  "fill",
  "fill",
  "fill",
  "fill",
  "fill",
  "fill",
];

const pages = {
  About: About,
  Education: Education,
  Experiences: Experiences,
  Honors: Honors,
  Publications: Publications,
};

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 50 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const Page3 = () => {
  const [curPage, setCurpage] = useState(6);
  const isScrollingRef = useRef(false);

  const handleScroll = useCallback(
    (event) => {
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      if (event.deltaY > 0) {
        setCurpage(((curPage + 1) % 6) + 6);
      } else if (event.deltaY < 0) {
        setCurpage(((curPage + 5) % 6) + 6);
      }

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1300);
    },
    [curPage]
  );

  const PageComponent = curPage ? pages[Pages[curPage]] : null;
  console.log(Pages[curPage]);

  return (
    <motion.div
      key="content1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
      style={{
        position: "absolute",
        textAlign: "left",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "20% 80%",
      }}
    >
      <div style={{ height: "100vh", display: "flex", alignItems: "center" }}>
        <motion.ul
          style={{
            listStyle: "none",
            padding: "40px",
            margin: 0,
          }}
        >
          {Pages.map((value, i) => (
            <motion.li
              key={i}
              style={{
                position: "absolute",
              }}
              initial={false}
              animate={{
                y: (i - curPage) * 40,
                opacity: Math.abs(i - curPage) < 6 ? 1 : 0,
              }}
              transition={{
                y: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <MenuItem curPage={curPage} value={value} index={i} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          onWheel={handleScroll}
          style={{
            width: "70%",
            height: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "rgba(255,255,255,0.15)",
            transform: "translateX(-80px)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <AnimatePresence mode="wait">
            {PageComponent && (
              <motion.div
                key={curPage}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  overflow: "auto",
                }}
              >
                <PageComponent />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Page3;
