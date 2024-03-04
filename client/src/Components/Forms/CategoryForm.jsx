import React from "react";

const CategoryForm = ({ handleSubmit, name, setName, image, setImage }) => {
  return (
    <div className="p-5">
      <div className="pb-4">
        <span className="text-lg md:text-xl font-semibold uppercase">Add Category</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Enter new category"
            className="border text-black border-slate-600 rounded-lg w-full h-10 px-5 placeholder:text-slate-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="border text-black border-slate-600 rounded-lg w-full h-10 px-5 placeholder:text-slate-600 "
            placeholder="Category Image Url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-slate-600 w-20 h-8 md:w-40 md:h-10 text-white rounded-md"
        >
          Submit
        </button>
        <button
          type="reset"
          className="bg-slate-200 mx-5 w-20 h-8 md:w-40 md:h-10 text-black rounded-md"
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
