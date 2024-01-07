// SearchForm.tsx
import React from "react";

interface SearchFormProps {
  searchValue: React.MutableRefObject<string>;
  type: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTypeSwitch: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchValue,
  type,
  onSearch,
  onTypeSwitch,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex justify-between items-center space-x-4"
    >
      <input
        name="search"
        className="border border-gray-300 rounded-md px-4 py-2 w-1/3"
        placeholder="Search"
        value={searchValue.current}
        onChange={(e) => onSearch(e)}
        required
      />

      <select
        name="selectType"
        className="border border-gray-300 rounded-md px-4 py-2 w-1/3"
        value={type}
        onChange={(e) => onTypeSwitch(e)}
      >
        <option value="users">Users</option>
        <option value="repositories">Repos</option>
      </select>

      <button
        className="bg-red-500 text-white rounded-md px-4 py-2"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default SearchForm;
