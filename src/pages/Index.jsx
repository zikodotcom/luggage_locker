import React, { useEffect } from "react";
import Header from "../sections/landingPage/Header";
import Section1 from "../sections/landingPage/Section1";
import Section2 from "../sections/landingPage/Section2";
import Section3 from "../sections/landingPage/Section3";
import Section4 from "../sections/landingPage/Section4";
import Section5 from "../sections/landingPage/Section5";
import Footer from "../sections/landingPage/Footer";
import { axiosClient } from "@/helpers/axiosClient";
import CreativeLoader from "@/components/creative-loader";
import Section6 from "@/sections/landingPage/Section6";
import Section7 from "@/sections/landingPage/Section7";

import { motion, scale, useInView } from "framer-motion";
import { useRef } from "react";

export default function Index() {
  const [countries, setCountries] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    axiosClient
      .get("/country-dashboard")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const sectionAnimation = {
    hidden: { opacity: 0, y: 50, x: 50 },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  const SectionWrapper = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionAnimation}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <>
      {loading ? (
        <CreativeLoader
          isLoading={loading}
          onComplete={() => setLoading(false)}
        />
      ) : (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
          <Header />
          <main>
            <SectionWrapper>
              <Section1 />
            </SectionWrapper>
            <SectionWrapper>
              <Section2 />
            </SectionWrapper>
            <SectionWrapper>
              <Section3 />
            </SectionWrapper>
            <SectionWrapper>
              <Section4 countries={countries} />
            </SectionWrapper>
            <SectionWrapper>
              <Section7 />
            </SectionWrapper>
            <SectionWrapper>
              <Section6 />
            </SectionWrapper>
            <SectionWrapper>
              <Section5 />
            </SectionWrapper>
            <Footer />
          </main>
        </div>
      )}
    </>
  );
}
