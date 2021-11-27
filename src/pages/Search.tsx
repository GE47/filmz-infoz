import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string | null>(null);

  useEffect(() => {
    setSearchValue(searchParams.get("query"));
  }, [searchParams]);

  return <div>Search: {searchValue}</div>;
};

export default Search;
