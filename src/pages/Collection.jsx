import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../Compmnents/Title';
import Productitem from '../Compmnents/Productitem';

export default function Collection() {

  let {products , serach , showSearch} = useContext(ShopContext);
  const [showFeltir, setShowFeltir] = useState(false);
  const [fillterProduct, setFillterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavet')


  let toggelCategory = (e)=> {
    if(category.includes(e.target.value)){
        setCategory(prev=> prev.filter(item => item !== e.target.value))
    }else{
      setCategory(prev => [...prev,e.target.value])
    }
  }

  let toggelSubCategory = (e)=> {
    if (subCategory.includes(e.target.value)){
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

let applyFillter = ()=>{
  let prodcutsCopy = products.slice();

  if (showSearch && serach) {
    prodcutsCopy = prodcutsCopy.filter(item => item.name.toLowerCase().includes(serach.toLowerCase()))
  }

  if (category.length > 0) {
    prodcutsCopy = prodcutsCopy.filter(item => category.includes(item.category))
  }

  if (subCategory.length > 0) {
    prodcutsCopy = prodcutsCopy.filter(item => subCategory.includes(item.subCategory))
  }
  setFillterProduct(prodcutsCopy);
}

let sortProduct = ()=> {
   let fpCopy = fillterProduct.slice();
   switch(sortType){
    case 'low-high':
      setFillterProduct(fpCopy.sort((a,b)=> (a.price - b.price)));
      break;

      case 'high-low':
        setFillterProduct(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;

        default:
          applyFillter();
          break;
   }
}

useEffect(()=> {
  sortProduct();
} , [sortType])

  useEffect(()=> {
      applyFillter();
  } , [category, subCategory , serach , showSearch]);

  return <>
  
  <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

    <div className='min-w-60'>
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS 
          <img onClick={()=> setShowFeltir(!showFeltir)} src={assets.dropdown_icon} className={`h-3 sm:hidden cursor-pointer ${showFeltir ? 'rotate-90' : ''}`} alt="" />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFeltir ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggelCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggelCategory} /> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggelCategory} /> Kids
            </p>
          </div>
        </div>

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFeltir ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggelSubCategory} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggelSubCategory} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggelSubCategory} /> Winterwear
            </p>
          </div>
        </div>
    </div>

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          <select onChange={(e)=> setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavet">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {fillterProduct.map((item, index)=> (
            <Productitem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
          ))}
        </div>
      </div>
  </div>
  
  
  </>
}
