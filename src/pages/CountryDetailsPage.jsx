
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";


function CountryDetailsPage() {
    const { alpha3Code } = useParams();
    const [country, setCountry] = useState(null);
  
    useEffect(() => {
      const loadCountryInfo = () => {

        axios.get(`https://ih-countries-api.herokuapp.com/countries/${alpha3Code}`)
          .then(response => {
            setCountry(response.data);
          })
          .catch(error => {
            console.error('Error', error);
          });


      };
  
      loadCountryInfo();
    }, [alpha3Code]);
  

  return (
    <>
      <h1>Country Details</h1>
      {country ? (

        <>
          <h1>{country.name.common}</h1>
          <h2>Capital: {country.capital}</h2>
          <h2>Area: {country.area} km²</h2>
          {country.borders.length === 0 ? (
            <p>No borders</p>

          ) : (
            <>
              <h2>Borders:</h2>
              {country.borders.map((border) => (
             <li key={border}>
                  <Link to={`/${border}`}>{border}</Link>
                </li>
              ))}
              
            </>
          )}
          <Link to={`/`}>Back</Link>
        </>
      ) : (
        <p>Country not found.</p>
      )}
    </>
  );
}

export default CountryDetailsPage;