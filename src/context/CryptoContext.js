import { createContext, useLayoutEffect, useState } from "react";

// create context object
export const CryptoContext = createContext({})

// create the provider component
export const CryptoProvider = ({children}) => {
    const [cryptoData, setCryptoData] = useState()
    const [searchData, setSearchData] = useState()
    const [coinSearch, setCoinSearch] = useState("")

    const getCryptoData = async () => {
        try{

            const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinSearch}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`
            ).then(res => res.json()).then(json => json) 

            setCryptoData(data)
        }catch(error){
            console.log(error)
        }
    }

    const getSearchResult = async (query) => {
        try{

            const data = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`
            ).then(res => res.json()).then(json => json) 

            setSearchData(data.coins)
        }catch(error){
            console.log(error)
        }
    }

    useLayoutEffect(() => {
        getCryptoData()
    },[coinSearch])

    return(
        <CryptoContext.Provider value={{cryptoData, searchData, getSearchResult, setCoinSearch,setSearchData}}>
            {children}
        </CryptoContext.Provider>
    )
}

