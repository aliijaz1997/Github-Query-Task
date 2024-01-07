import React, { useEffect, useRef, useState } from "react";
import { usePostDataMutation } from "../api";
import Loader from "./loader";
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";

function Main() {
  const currPage = useRef(1);
  const searchValue = useRef("");
  const [gitSearch, setGitSearch] = useState("");
  const [type, setType] = useState("users");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const [postData, { isLoading, isError, data: rtkData, error }] =
    usePostDataMutation();

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 5 &&
      !loading
    ) {
      const currentPage = currPage.current + 1;
      fetchData(currentPage);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  const fetchData = async (newPage: number) => {
    try {
      setLoading(true);
      const request = { type, search: searchValue.current, page: newPage };

      const data = await postData(request);

      if (data) {
        // @ts-ignore
        const newData = data && data.data.items;

        setResult((prevData: any) =>
          newData ? [...prevData, ...newData] : prevData
        );
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      currPage.current = newPage;
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGitSearch(e.target.value);
    searchValue.current = e.target.value;
  };

  const handleTypeSwitch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setType(value);
    setGitSearch("");
    currPage.current = 1;
    searchValue.current = "";
    setResult([]);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(1);
  };

  return (
    <div className="p-8">
      <SearchForm
        searchValue={searchValue}
        type={type}
        onSearch={handleSearch}
        onTypeSwitch={handleTypeSwitch}
        onSubmit={submitHandler}
      />

      <SearchResult result={result} type={type} loading={loading} />

      {loading && <Loader />}
    </div>
  );
}

export default Main;
