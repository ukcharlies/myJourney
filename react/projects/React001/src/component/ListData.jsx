import React, { useState } from "react";
import { use } from "react";

export const ListData = ({ langs, logger, countries }) => {
  const [selectedItems, setSelectedItems] = useState(-1);
  const clickHandler = (theItem) => {
    console.log("Clicked", theItem);
  };

  return (
    <div>
      <h1 className="font-extrbold text-2xl">List of Programming Languages</h1>
      <ul className="list-disc list-inside max-w-xl rounded-lg">
        {langs.length < 1 ? (
          <p>Sorry no course available</p>
        ) : (
          langs.map((item, index) => (
            <li
              key={index}
              className={`cursor-pointer hover:bg-gray-100 p-2 ${
                index === selectedItems ? "bg-blue-500" : ""
              }`}
              onClick={() => {
                setSelectedItems(index);
                clickHandler(item);
              }}
            >
              {item}
            </li>
          ))
        )}
      </ul>
      <h1 className="font-extrabold text-2xl">List of Countries</h1>
      <ul>
        {countries.map((country, index) => (
          <li
            key={index}
            className="cursor-pointer hover:bg-gray-100 p-2"
            onClick={() => logger(country)}
          >
            {country}
          </li>
        ))}
      </ul>
    </div>
  );
};
