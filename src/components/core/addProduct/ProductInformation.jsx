import React, { useEffect, useState } from 'react'
import { ProColor, gender, size } from '../../../data/filterData'
import { useDispatch, useSelector } from 'react-redux'
import { setProductCreatingSteps, setProductInformation } from '../../../slice/Product';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const ProductInformation = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { productInformation } = useSelector((state) => state.product);


    const handleNext = (data) => {
      const dum = {
        ...productInformation,
      };
      dum.productName = data.productName;
      dum.productDes = data.productDes;
      dum.price = data.price;
      dum.discountPrice = data.discountPrice;
      dum.forWhom = data.forWhom;
      dum.color = data.color;

      console.log(dum, "thi is dum ");
      dispatch(setProductInformation(dum));
      dispatch(setProductCreatingSteps(3));
    };

    useEffect(() => {
      setValue(
        "productName",
        productInformation.productName && productInformation.productName
      );
      setValue(
        "productDes",
        productInformation.productDes && productInformation.productDes
      );
      setValue("price", productInformation.price && productInformation.price);
      setValue(
        "discountPrice",
        productInformation.discountPrice && productInformation.discountPrice
      );
      setValue(
        "forWhom",
        productInformation.forWhom && productInformation.forWhom
      );
      setValue("color", productInformation.color && productInformation.color);
    }, []);

    return (
      <div class="min-h-screen flex items-center justify-center w-[1000px] mx-auto max-w-[90%]">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full ">
          <h2 class="text-2xl font-bold pb-4 text-center">
            Product Information
          </h2>
          <form onSubmit={handleSubmit(handleNext)}>
            <div class="space-y-4 w-full">
              <div>
                <label
                  for="productName"
                  class="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product name"
                  {...register("productName", { required: true })}
                />
                {errors.productName && (
                  <div>
                    <p className="text-blue-500">Product name is required</p>
                  </div>
                )}
              </div>

              <div>
                <label
                  for="productDes"
                  class="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="productDes"
                  rows="4"
                  class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product description"
                  {...register("productDes", { required: true })}
                ></textarea>
                {errors.productDes && (
                  <div>
                    <p className="text-blue-500">
                      product Description is required
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-row gap-3 ">
                <div className="w-full">
                  <label
                    for="productPrice"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product price"
                    {...register("price", { required: true })}
                  />
                  {errors.price && (
                    <div>
                      <p className="text-blue-500">Price is required</p>
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <label
                    for="productPrice"
                    class="block text-sm  w-full font-medium text-gray-700"
                  >
                    Discount Price (₹)
                  </label>
                  <input
                    type="number"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product price"
                    {...register("discountPrice", { required: true })}
                  />
                  {errors.discountPrice && (
                    <div>
                      <p className="text-blue-500">
                        Discount price is required
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  for="productGender"
                  class="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="productGender"
                  class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  {...register("forWhom", { required: true })}
                >
                  <option value="">Select Category</option>
                  {gender.map((item) => (
                    <option value={item.gender}>{item.gender}</option>
                  ))}
                </select>
                {errors.forWhom && (
                  <div>
                    <p className="text-blue-500">Gender is required</p>
                  </div>
                )}
              </div>

              <div>
                <label
                  for="productColor"
                  class="block text-sm font-medium text-gray-700"
                >
                  Color
                </label>
                <select
                  id="productColor"
                  class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  {...register("color", { required: true })}
                >
                  <option value="">Select Color</option>
                  {ProColor.map((item) => (
                    <option value={item.colorName}>{item.colorName}</option>
                  ))}
                </select>
                {errors.color && (
                  <div>
                    <p className="text-blue-500">name is required</p>
                  </div>
                )}
              </div>

              <div className="flex flex-row gap-2 items-center">
                <div
                  onClick={() => dispatch(setProductCreatingSteps(1))}
                  class="flex justify-end"
                >
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Back
                  </button>
                </div>
                {productInformation.size && (
                  <div class="flex justify-end my-8">
                    <button
                      onClick={() => dispatch(setProductCreatingSteps(3))}
                      type="submit"
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Continue without save
                    </button>
                  </div>
                )}
                <div class="flex justify-end">
                  <button
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
}

export default ProductInformation
