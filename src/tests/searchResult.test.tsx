import React from "react";
import { render, screen } from "@testing-library/react";
import SearchResult from "../component/SearchResult";

test("Renders user SearchResult", () => {
  const mockResult = [
    {
      id: 1,
      avatar_url: "https://example.com/avatar.png",
      login: "testuser",
      html_url: "https://example.com/testuser",
    },
  ];

  render(<SearchResult result={mockResult} type="users" loading={false} />);

  const userElement = screen.getByText("testuser");
  expect(userElement).toBeInTheDocument();

  const linkElement = screen.getByRole("link", {
    name: "https://example.com/testuser",
  });
  expect(linkElement).toBeInTheDocument();
});

test("Renders repository SearchResult", () => {
  const mockResult = [
    {
      id: 1,
      full_name: "testuser/testrepo",
    },
  ];

  render(
    <SearchResult result={mockResult} type="repositories" loading={false} />
  );

  const repositoryElement = screen.getByText("testuser/testrepo");
  expect(repositoryElement).toBeInTheDocument();
});
