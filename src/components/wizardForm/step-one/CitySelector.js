import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Select from "react-select";
import HTTPClient from "../../../services/networking/queries";

const CitySelector = ({ selectedOption, handleChangeCity }) => {
  const {
    cities,
    city,
    language,
    stepOneUserLocation: { lang, lat },
  } = useSelector((data) => data);
  useEffect(() => {
    HTTPClient.fetch(
      `City/GetCityByLatLng?latitude=${lat}&longitude=${lang}`,
      true,
      2
    ).then(({ data: { data } }) => {
      if (data && data.id !== 0) {
        handleChangeCity({
          label: data.name,
          value: data.id,
          name: data.name,
          id: data.id,
        });
      } else {
        handleChangeCity("");
      }
    });
  }, [lang, lat]);

  return (
    <div dir={`${language === "ar" ? "rtl" : "ltr"}`}>
      <Select
        isMulti={false}
        isSearchable={true}
        value={selectedOption || city}
        onChange={(e) => handleChangeCity(e)}
        options={cities.map((city) => {
          return {
            ...city,
            label: city.name,
            value: city.id,
          };
        })}
        placeholder={language == "ar" ? "اختر المدينة" : "Choose city"}
        className="custome-input"
      />
    </div>
  );
};

export default CitySelector;
