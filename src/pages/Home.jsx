import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '../context/CoinContext'
import { Link } from 'react-router-dom';

const Home = () => {

  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandeler = (event) =>{
    setInput(event.target.value);
    if(event.target.value === ""){
      setDisplayCoin(allCoin);
    }
  }

  const searchHandler = async(event) =>{
    event.preventDefault();
    const coins = await allCoin.filter((item)=>{
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins);
  }

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin, setDisplayCoin])

  return (
    <div className='py-0 px-2 pb-[100px]'>
      <div className='max-w-screen-sm my-20 mx-auto flex flex-col items-center text-center gap-7'>
        <h1 className='text-6xl font-semibold'>Largest <br /> Crypto Marketplace</h1>
        <p className='w-3/4 text-[#e3e3e3] leading-normal'>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
        <form onSubmit={searchHandler} className='p-2 w-4/5 bg-white rounded-md text-xl flex justify-between items-center gap-2.5 text-black '>
          <input list='coinlist' onChange={inputHandeler} required value={input} className='flex-1 text-base outline-none border-none pl-2.5' type="text" placeholder='Search crypto...' />

          <datalist id='coinlist'>
            {allCoin.map((item, index)=>(
              <option key={index} value={item.name}/>
            ))}
          </datalist>

          <button className='border-none bg-[#7927ff] text-white text-base py-2.5 px-7 rounded-md cursor-pointer' type='submit'>Search</button>
        </form>
      </div>
      <div className='max-w-3xl	m-auto bg-gradient-to-b from-[#5403ff26] to-[#69029926] rounded-2xl'>
        <div className='grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] py-4 px-5 items-center border-b border-[#3c3c3c]'>
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className='text-center'>24H Change</p>
          <p className='text-right'>Market Cap</p>
        </div>
        {
          displayCoin.slice(0, 10).map((item, index) => (
            <Link to={`/coin/${item.id}`} className='grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] py-4 px-5 items-center border-b border-[#3c3c3c] last:border-none' key={index}>
              <p>{item.market_cap_rank}</p>
              <div className='flex items-center gap-2.5'>
                <img className='w-8' src={item.image} alt="" />
                <p>{item.name + "-" + item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h > 0 ? "text-green-600 text-center" : "text-red-600 text-center"}>{Math.floor(item.price_change_percentage_24h * 100) / 100}</p>
              <p className='text-right'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home
