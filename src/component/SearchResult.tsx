// SearchResult.tsx
import React from "react";

interface SearchResultProps {
  result: any[];
  type: string;
  loading: boolean;
}

const SearchResult: React.FC<SearchResultProps> = ({
  result,
  type,
  loading,
}) => {
  return (
    <div className="mt-8 bg-slate-100 rounded-md p-2">
      {result.map((value: any) => {
        const {
          id,
          full_name,
          languages_url,
          forks_url,
          avatar_url,
          login,
          html_url,
        } = value;

        return (
          <div key={id} className="flex m-4">
            <div className="border border-gray-100 shadow-md bg-white p-4 w-full rounded-md">
              {type === "repositories" ? (
                <div>
                  <p className="text-black text-lg font-bold">{full_name}</p>
                </div>
              ) : (
                <div className="flex items-center">
                  <img
                    src={avatar_url}
                    alt={login}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <p className="text-black text-lg font-bold">{login}</p>
                </div>
              )}

              {type === "users" && (
                <div>
                  <a
                    href={html_url}
                    rel="noreferrer"
                    target="_blank"
                    className="text-blue-500"
                  >
                    {html_url}
                  </a>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResult;
