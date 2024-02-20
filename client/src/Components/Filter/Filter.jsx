import React from "react";
import {ArrowDropDownIcon , ArrowDropUpIcon} from '../../Icons/Icons'

const Filter = ({
  data,
  filterName,
  filterOpen,
  setFilterOpen,
  filters,
  setFilters,
}) => {
  const handleFilterOpen = () => {
    if (filterOpen === filterName) {
      setFilterOpen(null);
    } else {
      setFilterOpen(filterName);
    }
  };

  return (
    <div>
      <div
        className="flex max-w-fit border-2 border-slate-300 h-10 items-center px-3 py-2 gap-2 cursor-pointer"
        onClick={handleFilterOpen}
      >
        <span>{filterName}</span>
        {filterOpen === filterName ? (
          <ArrowDropUpIcon />
        ) : (
          <ArrowDropDownIcon />
        )}
      </div>
      {filterOpen === filterName && (
        <div className="absolute bg-white max-w-fit max-h-48 border-2 border-slate-300 pl-3 py-2 pr-5 md:pr-16 mt-1 overflow-y-auto">
          <ul className="flex flex-col flex-wrap">
            {data.map(({ value, quantityLeft }, index) => (
              <li key={index} className="flex gap-2">
                <input
                  type="checkbox"
                  onChange={() => setFilters((prev) => [...prev, { name: filterName, value: value }])}
                  defaultChecked={filters.find(
                    (filter) =>
                      filter.name === filterName && filter.value === value
                  )}
                />
                <label
                  htmlFor={value}
                  className="font-medium"
                >{`${value} (${quantityLeft})`}</label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Filter;
