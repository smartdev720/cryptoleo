import React from 'react'
import searchIcon from "../assets/search-icon.svg"

const Search = () => {
  return (
   
        <form>
            <input type='text' name='search' />
            <button type='aubmit'>
                <img src={searchIcon} alt='search' />
            </button>
        </form>
  )
}

export default Search