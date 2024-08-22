import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col [background:radial-gradient(125%_185%_at_60%_10%,#000_40%,#63e_100%)]'>
        <div className='font-semibold text-xl  text-zinc-90000 ml-3 flex justify-center align-middle'>
                        <span className='text-blue-400'>&lt;</span>
                        <span className='text-white'>Pass</span>
                        <span className='text-blue-400'>Op&gt;</span>
         </div>
        <div className='flex justify-center ml-9 text-xl gap-2 font-bold text-blue-200'>
            <span >Created With</span>
            <span><img src="public/heart.png" width={30} alt="" /></span>
            <span>By Pavan_Shirsat</span>
        </div>
    </div>
  )
}

export default Footer
