import React from "react";
interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
}
const Search = ({ search, setSearch }: SearchProps) => {
  return (
    <div className="w-90 max-w-700 m-b-1">
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Telusuri Articles..."
        className="w-100 p-tb-07-lr-1 radius-10-custom outline-none fs-1 fw-700 merienda b-black-opacity border-custom shadow-white c-white trans-border-bg-03 focus-border-w-bg-b sm-fs-07"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
export default Search;
