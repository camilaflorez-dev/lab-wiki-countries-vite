import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const loadAllCountries = () => {

      axios
        .get("https://ih-countries-api.herokuapp.com/countries")
        .then((response) => {
          setCountries(response.data);
        })

        .catch((error) => {
          console.error("Error", error);
        });
    };

    loadAllCountries();
  }, []);

  return (
    <>
          <h1 className="page-title">LAB | React WikiCountries</h1>
      <h1 className="page-title">WikiCountries: Your Guide to the World</h1>
      <div className="countries-container">
        {countries.map((country) => (
          <Link
            key={country.alpha3Code}
            to={`/${country.alpha3Code}`}
            className="country-link"
          >

         <div className="Country">
                
              <img
                src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                alt={`${country.name.common} flag`}
                className="flag-image"
              />
              <h2 className="country-name">{country.name.common}</h2>
            </div>
          </Link>
        ))}
      </div>
    </>



  );
}

export default HomePage;
