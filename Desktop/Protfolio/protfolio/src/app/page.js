import React from "react";

import SplashCursor from "../components/SplashCursor";
import LightRays from "../components/LightRays";
import { SparklesCore } from "@/components/ui/sparkles";
import LampContainer from "@/components/ui/lamp";
import CircularText from "@/components/CircularText";
import SplitText from "@/components/SplitText";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";

const Home = () => {
  const navItems = [
    { name: "Home", link: "#" },
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" },
  ];

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {/* <LampContainer/> */}
      <Navbar className="fixed top-0">
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
        </NavBody>
      </Navbar>
      <SparklesCore
        className="w-full h-full"
        background="#000000"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        particleColor="#FFFFFF"
      />
      <SplashCursor />

      {/* Centered CircularText above the background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
        <div className="pointer-events-auto">
          <CircularText
            text="REACT*BITS*COMPONENTS*"
            onHover="speedUp"
            spinDuration={20}
            className="w-[260px] h-[260px]"
          />
        </div>
      </div>
      {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
      </div> */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
        <SplitText
          text="Hello, GSAP!"
          className="text-2xl font-semibold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
      </div>
    </div>
  );
};

export default Home;
