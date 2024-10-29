import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import arrow_icon from '../assets/arrow_icon.png'
import { CoinContext } from '../context/CoinContext'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  }

  return (
    <div className='flex items-center justify-between text-[#ddd] border-b-2 border-[#3c3c3c] pt-5 pb-5 px-[10%] md:py-5 md:px-[8%]'>
      <Link to='/'>
        <img className='w-[max(12vw, 120px)]' src={logo} alt="" />
      </Link>
      <ul className='flex gap-10'>
      <Link to='/'><li className='cursor-pointer'>Home</li></Link>
        <li className='cursor-pointer'>Features</li>
        <li className='cursor-pointer'>Pricing</li>
        <li className='cursor-pointer'>Blog</li>
      </ul>
      <div className='flex items-center gap-5'>
        <select className='px-2 py-1 rounded-md border-2 border-white bg-transparent text-white' onChange={currencyHandler}>
          <option className='bg-[#09005c] text-white text-xs' value="usd">USD</option>
          <option className='bg-[#09005c] text-white text-xs' value="eur">EUR</option>
          <option className='bg-[#09005c] text-white text-xs' value="inr">INR</option>
        </select>
        <button className='flex items-center gap-[10px] px-2 py-1 border-white border-2 rounded-md text-[#393939] bg-white cursor-pointer font-medium md:gap-2 md:py-2 md:px-4 md:font-medium'>Sign up <img className='w-[13px]' src={arrow_icon} alt="" /></button>
      </div>
    </div>
  )
}

export default Navbar
