import { FaSearch } from "react-icons/fa";
import React from 'react'


const SearchBar = ({onChange, placeholder}) => {
    return (
            <input
                type="text"
                onChange={onChange}
                placeholder={placeholder}
            />
    );
};

export default SearchBar;