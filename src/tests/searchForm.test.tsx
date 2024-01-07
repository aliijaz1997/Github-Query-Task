import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SearchForm from "../component/SearchForm";

describe("SearchForm component", () => {
  const mockOnSearch = jest.fn();
  const mockOnTypeSwitch = jest.fn();
  const mockOnSubmit = jest.fn();

  const searchValue = { current: "" };
  const type = "Users";

  beforeEach(() => {
    mockOnSearch.mockClear();
    mockOnTypeSwitch.mockClear();
    mockOnSubmit.mockClear();
  });

  it("renders the SearchForm component correctly", () => {
    const { getByPlaceholderText, getByText, getByDisplayValue } = render(
      <SearchForm
        searchValue={searchValue}
        type={type}
        onSearch={mockOnSearch}
        onTypeSwitch={mockOnTypeSwitch}
        onSubmit={mockOnSubmit}
      />
    );

    const searchInput = getByPlaceholderText("Search");
    const selectElement = getByText("Users");
    const submitButton = getByText("Submit");

    expect(searchInput).toBeInTheDocument();
    expect(selectElement).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    expect(getByDisplayValue(type)).toBeInTheDocument();
  });

  it("triggers events correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <SearchForm
        searchValue={searchValue}
        type={type}
        onSearch={mockOnSearch}
        onTypeSwitch={mockOnTypeSwitch}
        onSubmit={mockOnSubmit}
      />
    );

    const searchInput = getByPlaceholderText("Search");
    const selectElement = getByText("Users");
    const submitButton = getByText("Submit");

    fireEvent.change(searchInput, { target: { value: "test" } });

    fireEvent.change(selectElement, { target: { value: "repositories" } });

    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
