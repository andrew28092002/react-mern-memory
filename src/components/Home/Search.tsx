import { AppBar, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setSearchPosts } from "../../redux/store/slice/searchSlice";
import { appBarSearch, searchButton } from "./HomeStyles";
import { MuiChipsInput, MuiChipsInputChip } from "mui-chips-input";
import { useTypedDispatch } from "../../redux/store/store";

const Search = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [searchTags, setSearchTags] = useState<MuiChipsInputChip[]>([]);

  useEffect(() => {
    const searchString = localStorage.getItem("search");
    if (searchString) {
      const searchQuery = JSON.parse(searchString);
      const tags = searchQuery.tags.split(",");
      
      dispatch(setSearchPosts(searchQuery));
      setSearch(searchQuery.search);

      // spike. if i don't put it, then initially there will be an empty tag in line
      if (tags[0] !== "") {
        setSearchTags(tags);
      }
    }
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "13") {
      searchPosts();
    }
  };

  const handleChip = (newValue: MuiChipsInputChip[]) => {
    setSearchTags(newValue);
  };

  const searchPosts = () => {
    if (search.trim() || searchTags) {
      const searchQuery = {
        search,
        tags: searchTags.join(","),
      };
      dispatch(setSearchPosts(searchQuery));

      localStorage.setItem("search", JSON.stringify(searchQuery));
      navigate(
        `/posts?searchQuery=${search || "none"}&tags=${searchTags.join(
          ","
        )}`
      );
    } else {
      navigate("/");
    }
  };

  const clearSearch = () => {
    dispatch(
      setSearchPosts({
        search: "",
        tags: "",
      })
    );
    setSearch("");
    setSearchTags([]);
    localStorage.removeItem("search");
    navigate("/");
  };

  return (
    <AppBar sx={appBarSearch} position="static" color="inherit">
      <TextField
        name="search"
        variant="outlined"
        label="Search Memories"
        onKeyPress={handleKeyPress}
        fullWidth
        value={search}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setSearch(e.target.value)
        }
      />
      <MuiChipsInput
        sx={{ margin: "10px 0" }}
        onChange={handleChip}
        label="Search Tags"
        variant="outlined"
        value={searchTags}
        fullWidth
      />
      <Button
        onClick={searchPosts}
        variant="contained"
        sx={searchButton}
        color="primary"
      >
        Search
      </Button>
      <Button variant="contained" color="secondary" onClick={clearSearch}>
        Clear Search Results
      </Button>
    </AppBar>
  );
};

export default Search;
