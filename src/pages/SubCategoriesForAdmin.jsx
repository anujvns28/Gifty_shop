import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllSubCategoriesProduct } from '../service/operation/subCategory';
import SellerProductCard from '../components/core/sellerProducts/SellerProductCard';

const SubCategoriesForAdmin = () => {
    const [subCategories, setSubCategories] = useState();
    const {subCategoryId} = useParams();
    const dispatch = useDispatch();
    const {productLoading} = useSelector((state) => state.product);


    const fetchSubCategories = async () => {
         const response = await getAllSubCategoriesProduct(subCategoryId,dispatch);
         if (response && response.data) {
            setSubCategories(response.data);
         }
    }

    console.log(subCategories);

    useEffect(() => {
        fetchSubCategories();   
    }, []);

    if (productLoading) {
        return (
            <div className='h-screen w-screen flex items-center text-black justify-center'>
                <div className='custom-loader'></div>
            </div>
        );
    }

  return (
    <div className='w-[70%] mx-auto p-3 border rounded-md my-3 h-full lg:min-h-screen min-h-[300px]'>
      {
        !subCategories ? 
        <div className='w-full h-full lg:min-h-screen min-h-[300px]  flex items-center justify-center'>
            <p className='text-xl font-semibold'>Not Found</p>
        </div>
        : <div className='flex flex-col gap-3'>
            {
              subCategories.product.map((item) => {
                return <SellerProductCard key={item._id} product={item} />
              })
            }
        </div> 
      }
    </div>
  )
}

export default SubCategoriesForAdmin
