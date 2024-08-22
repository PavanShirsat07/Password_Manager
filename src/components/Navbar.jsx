import React from 'react'
const Navbar = () => {
  return (
    <div className='flex justify-between bg-black text-white w-full p-4 pr-3 pl-6 border border-gray-900'>
      <div className='font-semibold text-3xl  text-zinc-90000 hover:text-4xl cursor-pointer'>
        <span className='text-blue-400'>&lt;</span>
        Pass
        <span className='text-blue-400'>Op&gt;</span>
      </div>
      <ul className='flex'>
        <li className='px-4 py-2 text-xl hover:font-bold cursor-pointer'>Home</li>
        <li className='px-4 py-2 text-xl hover:font-bold cursor-pointer'>Contact</li>
        <li className='px-4 py-2 text-xl hover:font-bold cursor-pointer'>About</li>
      </ul>
    </div>
  )
}

export default Navbar
