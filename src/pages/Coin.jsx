import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../context/CoinContext';
import LineChart from '../components/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext)

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-CvWevrTZbUa2rQwsi6KtYh43' }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));
  }

  const fetchHistoricalData = async () =>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-CvWevrTZbUa2rQwsi6KtYh43'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency])
  if (coinData, historicalData) {
    return (
      <div className='px-5 py-0'>
        <div className='flex flex-col items-center gap-5 my-25 mx-auto mb-12'>
          <img className='max-w-24' src={coinData.image.large} alt="" />
          <p><b className='text-4xl font-medium'>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
        </div>
        <div className='max-w-2xl h-64 m-auto'>
          <LineChart historicalData={historicalData} />
        </div>

        <div className='max-w-2xl my-12 mx-auto flex flex-col'>
          <ul className='flex justify-between py-2.5 px-0 border-b border-[#5f5d5f] list-none'>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul className='flex justify-between py-2.5 px-0 border-b border-[#5f5d5f] list-none'>
            <li>Current Price</li>
            <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul className='flex justify-between py-2.5 px-0 border-b border-[#5f5d5f] list-none'>
            <li>Market Cap</li>
            <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul className='flex justify-between py-2.5 px-0 border-b border-[#5f5d5f] list-none'>
            <li>24 Hour High</li>
            <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul className='flex justify-between py-2.5 px-0 border-b border-[#5f5d5f] list-none'>
            <li>24 Hour Low</li>
            <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>
      </div>
    )
  } else {
    return (
      <div className='grid place-self-center min-h-[80vh]'>
        <div className='w-16 h-16 place-self-center border-4 border-[#bdbdbd] border-t-[#4500c6] rounded-full animate-spin'></div>
      </div>
    )
  }
}

export default Coin
