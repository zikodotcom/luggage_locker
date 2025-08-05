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
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 countries={countries} />
            <Section7 />
            <Section6 />
            <Section5 />
            <Footer />
          </main>
        </div>
      )}
    </>
  );
}
