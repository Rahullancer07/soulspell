import React, { useState } from "react";
import Filter from "./Filter";
import {CloseIcon} from "../../Icons/Icons"

const filter = {
  size: [
    {
      value: 3.5,
      quantityLeft: 12,
    },
    {
      value: 4,
      quantityLeft: 11,
    },
    {
      value: 4.5,
      quantityLeft: 14,
    },
    {
      value: 5,
      quantityLeft: 4,
    },
    {
      value: 6,
      quantityLeft: 20,
    },
    {
      value: 7,
      quantityLeft: 30,
    },
    {
      value: 7.5,
      quantityLeft: 29,
    },
  ],
  color: [
    { value: "BEIGE", quantityLeft: 3 },
    { value: "BLACK", quantityLeft: 122 },
    { value: "BLUE", quantityLeft: 68 },
    { value: "BROWN", quantityLeft: 37 },
    { value: "BURGUNDY", quantityLeft: 3 },
    { value: "CHOCOLATE", quantityLeft: 2 },
    { value: "CREAM", quantityLeft: 12 },
    { value: "GREEN", quantityLeft: 35 },
    { value: "GREY", quantityLeft: 83 },
    { value: "GREY", quantityLeft: 1 },
    { value: "MAROON", quantityLeft: 3 },
    { value: "MULTIvalue", quantityLeft: 1 },
    { value: "ORANGE", quantityLeft: 27 },
    { value: "PINK", quantityLeft: 26 },
    { value: "PURPLE", quantityLeft: 16 },
    { value: "RED", quantityLeft: 26 },
    { value: "SAIL", quantityLeft: 3 },
    { value: "SILVER", quantityLeft: 1 },
    { value: "TEAL", quantityLeft: 4 },
    { value: "WHITE", quantityLeft: 48 },
    { value: "YELLOW", quantityLeft: 12 },
  ],
  shoeBrands: [
    { value: "Nike", quantityLeft: 50 },
    { value: "Adidas", quantityLeft: 30 },
    { value: "Puma", quantityLeft: 20 },
    { value: "Reebok", quantityLeft: 15 },
    { value: "New Balance", quantityLeft: 25 },
    { value: "Converse", quantityLeft: 18 },
    { value: "Vans", quantityLeft: 22 },
    // Add more brands as needed
  ],
  sortBy: [{ value: "Price High to Low" }, { value: "Price Low to High" }],
};
const FiltersSection = () => {
  const [filters, setFilters] = useState([]);
  const [filterOpen, setFilterOpen] = useState(null);

  const handleFilter = ({name , value}) => {
      const newFilters = [];
      for (let index = 0; index < filters.length; index++) {
        if(filters[index].name !== name || filters[index].value !== value){
          newFilters.push(filters[index]);
        }
      }
      setFilters(newFilters);
  }
  return (
    <div>
      <div className="flex gap-5 justify-center">
        <Filter
          data={filter["size"]}
          filterName="Size"
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
          setFilters={setFilters}
          filters={filters}
        />
        <Filter
          data={filter["color"]}
          filterName="Color"
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
          setFilters={setFilters}
          filters={filters}
        />
        <Filter
          data={filter["shoeBrands"]}
          filterName="Brand"
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
          setFilters={setFilters}
          filters={filters}
        />
      </div>
      <div className="flex flex-wrap max-w-fit pt-5 gap-2 justify-center">
        {(filter.length > 0 ) && <button className="bg-gray-300 max-w-fit px-2 py-1 text-black">
          Clear All
        </button>}
        {filters.map((filter, index) => (
          <ul>
            <li key={index}>
              <div className="bg-gray-300 max-w-fit text-black flex items-center gap-2 px-2 py-1 cursor-pointer"
              onClick={() => handleFilter(filter)}>
                <span>{`${filter.name} : ${filter.value}`}</span>
                <CloseIcon />
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default FiltersSection;
