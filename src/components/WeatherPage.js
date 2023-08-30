import React from "react";
import Image1 from "../Assets/images/sunlight2.jpg";
import Image7 from "../Assets/images/sunlight.jpg";
import Image2 from "../Assets/images/cloud.jpg";
import Image3 from "../Assets/images/rain.jpg";
import Image4 from "../Assets/images/sunny.avif";
import Image5 from "../Assets/images/haze.jpg";
import nodata from "../Assets/images/nodata.jpg";
import Image6 from "../Assets/images/Windy.avif";
import SearchIcon from "@mui/icons-material/Search";
import rainAudio from "../Assets/Audio/1.mp3";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Weather.css";

const WeatherPage = () => {
  const parem = useParams();
  const [data, setdata] = useState(null);
  const [Value, setValue] = useState("");
  const [Error, setError] = useState(false);
  const [style, setStyle] = useState({});

  function handleFetch(city) {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=343ffec2ec084fa0a8a151325231208&q=${city}&days=1&aqi=no&alerts=no`
    )
      .then((response) => {
        if (response.ok) {
          setError(false);
          return response.json();
        } else {
          setError(true);
        }
      })
      .then((json) => {
        if (json === "undefined") {
          setdata({
            location: {
              name: "--",
              localtime: "--",
            },
            current: {
              cloud: "--",
              humidity: "--",
              wind_kph: "--",
              pressure_mb: "--",
              feelslike_c: "--",
            },
          });
        } else {
          setdata(json);
        }
      });
  }

  function handleFetch2(lat, lon) {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=343ffec2ec084fa0a8a151325231208&q=${lat}&q=${lon}&days=1&aqi=no&alerts=no`
    )
      .then((response) => {
        if (response.ok) {
          setError(false);
          return response.json();
        } else {
          setError(true);
        }
      })
      .then((json) => {
        if (json === "undefined") {
          setdata({
            location: {
              name: "--",
              localtime: "--",
            },
            current: {
              cloud: "--",
              humidity: "--",
              wind_kph: "--",
              pressure_mb: "--",
              feelslike_c: "--",
            },
          });
        } else {
          setdata(json);
        }
      });
  }
  useEffect(() => {
    handleFetch(parem.id);
    setValue(parem.id);
  }, []);

  const handleSearch = () => {
    if (Value.trim() == "") {
      alert("please fill the field");
    } else {
      handleFetch(Value);
    }
  };
  let backgroundImage = "";
  let background = "";
  let audio = null;
  switch (true) {
    case data?.current.condition.text.includes("clear"):
      backgroundImage = `url(${Image4})`;
      background = `${Image4}`;
      audio = null;
      break;
    case data?.current.condition.text.includes("cloudy"):
      backgroundImage = `url(${Image2})`;
      background = `${Image2}`;
      audio = null;
      break;
    case data?.current.condition.text.includes("wind"):
    case data?.current.condition.text.includes("windy"):
      backgroundImage = `url(${Image6})`;
      background = `${Image6}`;
      break;
    case data?.current.condition.text.includes("rain"):
    case data?.current.condition.text.includes("Thundery"):
      backgroundImage = `url(${Image3})`;
      background = `${Image3}`;
      audio = new Audio(rainAudio);
      break;
    case data?.current.condition.text.includes("haze"):
      backgroundImage = `url(${Image5})`;
      background = `${Image5}`;
      break;
    case data?.current.condition.text.includes("Mist"):
      backgroundImage = `url(${Image2})`;
      background = `${Image2}`;
      audio = null;
      break;
    case data?.current.condition.text.includes("sunshine"):
    case data?.current.condition.text.includes("sunny"):
      backgroundImage = `url(${Image7})`;
      background = `${Image7}`;
      break;
    default:
      backgroundImage = `url(${Image1})`;
      background = `${Image1}`;
      break;
  }
  function bg() {
    setStyle({
      backgroundImage: backgroundImage,
      backgroundPosition: "center",
      backgroundSize: "cover",
    });
  }
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }
  function showPosition(position) {
    handleFetch2(position.coords.latitude, position.coords.longitude);
  }
  useEffect(() => {
    bg();
    audio?.play();
  }, [data]);

  return (
    <div className="Container">
      <img src={background} className="video" alt="not found" />
      <div className="box" style={style}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-8 d-flex align-items-center ">
              {Error === false ? (
                <div className="d-flex align-items-center temperature">
                  <h1 className="display-1 fw-semibold text-white">
                    {data?.current.temp_c}° C
                  </h1>
                  <div className="ms-3">
                    <p className="m-0 text-white fw-normal fs-2">
                      {data?.location.name}
                    </p>
                    <p className="m-0 text-white fw-normal">
                      {data?.location.localtime}
                    </p>
                  </div>
                  <div className="ms-3">
                    <img
                      src={data?.current.condition.icon}
                      width="40px"
                      height="40px"
                      alt="not found"
                    />
                    <p className="mt-2 mb-0 text-white fw-normal">
                      {data?.current.condition.text}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="errorpage">
                  <img src={nodata} alt="not found" />
                  <h4>No data Found</h4>
                </div>
              )}
            </div>
            <div className="col-4 colself">
              <div className="SearchBox d-flex justify-content-end">
                <input
                  type="text"
                  value={Value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <span className="searchIcon ms-2" onClick={handleSearch}>
                  <SearchIcon />
                </span>
              </div>
              <div className="location">
                <ul>
                  <li className="mt-4 fw-semibold" onClick={getLocation}>
                    Current location <LocationOnIcon />
                  </li>
                  <li
                    onClick={() => {
                      handleFetch("Delhi");
                      setValue("Delhi");
                    }}
                  >
                    Delhi
                  </li>
                  <li
                    onClick={() => {
                      handleFetch("Mumbai");
                      setValue("Mumbai");
                    }}
                  >
                    Mumbai
                  </li>
                  <li
                    onClick={() => {
                      handleFetch("Pune");
                      setValue("Pune");
                    }}
                  >
                    Pune
                  </li>
                  <li
                    onClick={() => {
                      handleFetch("Bengaluru");
                      setValue("Bengaluru");
                    }}
                  >
                    Bengaluru
                  </li>
                </ul>
                <hr />
              </div>
              <div className="WeatherDetail">
                <ul>
                  <li className="mt-4 fw-semibold">Weather Details</li>
                  <li>
                    <span>Cloud </span> <span>{data?.current.cloud}%</span>
                  </li>
                  <li>
                    <span>Humidity</span> <span>{data?.current.humidity}%</span>
                  </li>
                  <li>
                    <span>Wind</span> <span>{data?.current.wind_kph}m/s</span>
                  </li>
                  <li>
                    <span>Pressure</span>
                    <span>{data?.current.pressure_mb}pa</span>
                  </li>
                  <li>
                    <span>feelslike</span>
                    <span>{data?.current.feelslike_c}° C</span>
                  </li>
                </ul>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
