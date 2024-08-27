import React from 'react'
import Title from '../Compmnents/Title'
import { assets } from '../assets/assets'
import NewsletterBos from '../Compmnents/NewsletterBos'

export default function Contact() {
  return <>
  
  <div className='text-center text-2xl pt-10 border-t'>
    <Title text1={'CONTACT'} text2={'US'}/>
  </div>
  <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
    <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
    <div className='flex flex-col justify-center items-start gap-6'>
      <p className='font-semibold text-xl text-gray-600'>Our Store</p>
      <p className='text-gray-500'>Egypt Cairo</p>
      <p className='text-gray-500'>Tel: 01028510504 <br />Email:sabry9800@gmail.com</p>
      <p className='font-semibold  text-xl text-gray-600'>Careers at Forever</p>
      <p className='text-gray-500'>Learn more about our teams and job openings.</p>
      <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
    </div>
  </div>
  <NewsletterBos/>
  
  </>
}
