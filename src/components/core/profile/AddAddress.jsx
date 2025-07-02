import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { addAddress, editAddress } from "../../../service/operation/profile";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { indianStates } from "../../../data/addressData";

const AddAddress = ({ setAddAddress, addressData }) => {
  const { user, userLoading } = useSelector((state) => state.profile);
  const {
    register,
    setValue,
    getValues,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const handleForm = async (data) => {
    if (!addressData) {
      await addAddress(data, dispatch);
      setAddAddress(false);
    } else {
      if (isUpdated()) {
        await editAddress(data, dispatch);
        setAddAddress(false);
      } else {
        toast.error("No updation made");
      }
    }
  };

  const isUpdated = () => {
    return (
      getValues("name") !== addressData.name ||
      getValues("phoneNumber") !== addressData.phoneNumber ||
      getValues("pincode") !== addressData.pincode ||
      getValues("locality") !== addressData.locality ||
      getValues("address") !== addressData.address ||
      getValues("city") !== addressData.city ||
      getValues("landmark") !== addressData.landmark ||
      getValues("alternatePhoneNumber") !== addressData.alternatePhoneNumber ||
      getValues("state") !== addressData.state
    );
  };

  useEffect(() => {
    if (addressData) {
      setValue("name", addressData.name);
      setValue("phoneNumber", addressData.phoneNumber);
      setValue("pincode", addressData.pincode);
      setValue("locality", addressData.locality);
      setValue("address", addressData.address);
      setValue("city", addressData.city);
      setValue("landmark", addressData.landmark);
      setValue("alternatePhoneNumber", addressData.alternatePhoneNumber);
      setValue("state", addressData.state);
      setValue("addresId", addressData._id);
    } else {
      reset();
    }
  }, [addressData, reset, setValue]);

  useEffect(() => {
    setValue("userId", user._id);
  }, [setValue, user]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      {userLoading ? (
        <div className="w-full h-72 flex items-center justify-center">
          <div className="custom-loader"></div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(handleForm)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          noValidate
        >
          {/* Name */}
          <label className="flex flex-col">
            <span className="text-lg font-semibold mb-1">Name</span>
            <input
              type="text"
              placeholder="Enter Your Name"
              {...register("name", { required: "Name is required" })}
              className={`p-3 border rounded-md outline-none text-lg ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:border-yellow-400`}
            />
            {errors.name && (
              <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
            )}
          </label>

          {/* Mobile Number */}
          <label className="flex flex-col">
            <span className="text-lg font-semibold mb-1">Mobile Number</span>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
              className={`p-3 border rounded-md outline-none text-lg ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              } focus:border-yellow-400`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </label>

          {/* Pincode */}
          <label className="flex flex-col">
            <span className="text-lg font-semibold mb-1">Pincode</span>
            <input
              type="text"
              placeholder="Enter Pincode"
              {...register("pincode", {
                required: "Pincode is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Enter a valid 6-digit pincode",
                },
              })}
              className={`p-3 border rounded-md outline-none text-lg ${
                errors.pincode ? "border-red-500" : "border-gray-300"
              } focus:border-yellow-400`}
            />
            {errors.pincode && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.pincode.message}
              </p>
            )}
          </label>

          {/* Locality */}
          <label className="flex flex-col">
            <span className="text-lg font-semibold mb-1">Locality</span>
            <input
              type="text"
              placeholder="Locality"
              {...register("locality", { required: "Locality is required" })}
              className={`p-3 border rounded-md outline-none text-lg ${
                errors.locality ? "border-red-500" : "border-gray-300"
              } focus:border-yellow-400`}
            />
            {errors.locality && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.locality.message}
              </p>
            )}
          </label>

          {/* Address */}
          <label className="flex flex-col md:col-span-2">
            <span className="text-lg font-semibold mb-1">Address</span>
            <textarea
              placeholder="Enter Address"
              {...register("address", { required: "Address is required" })}
              rows={4}
              className={`p-3 border rounded-md outline-none text-lg resize-none ${
                errors.address ? "border-red-500" : "border-gray-300"
              } focus:border-yellow-400`}
            />
            {errors.address && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.address.message}
              </p>
            )}
          </label>

          {/* City */}
          <label className="flex flex-col">
            <span className="text-lg font-semibold mb-1">City</span>
            <input
              type="text"
              placeholder="City"
              {...register("city", { required: "City is required" })}
              className={`p-3 border rounded-md outline-none text-lg ${
                errors.city ? "border-red-500" : "border-gray-300"
              } focus:border-yellow-400`}
            />
            {errors.city && (
              <p className="text-red-500 mt-1 text-sm">{errors.city.message}</p>
            )}
          </label>

          {/* State Dropdown */}
          <label className="flex flex-col">
            <span className="text-lg font-semibold mb-1">State</span>
            <select
              {...register("state", { required: "State is required" })}
              defaultValue=""
              className={`p-3 border rounded-md outline-none text-lg bg-white ${
                errors.state ? "border-red-500" : "border-gray-300"
              } focus:border-yellow-400`}
            >
              <option value="" disabled>
                Select State
              </option>
              {indianStates.map(({ id, state }) => (
                <option key={id} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.state.message}
              </p>
            )}
          </label>

          {/* Landmark */}
          <label className="flex flex-col">
            <span className="text-lg font-semibold mb-1">Landmark</span>
            <input
              type="text"
              placeholder="Landmark"
              {...register("landmark", { required: "Landmark is required" })}
              className={`p-3 border rounded-md outline-none text-lg ${
                errors.landmark ? "border-red-500" : "border-gray-300"
              } focus:border-yellow-400`}
            />
            {errors.landmark && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.landmark.message}
              </p>
            )}
          </label>

          {/* Alternate Phone Number */}
          <label className="flex flex-col">
            <span className="text-lg font-semibold mb-1">
              Alternate Phone Number
            </span>
            <input
              type="tel"
              placeholder="Phone Number"
              {...register("alternatePhoneNumber", {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
              className={`p-3 border rounded-md outline-none text-lg ${
                errors.alternatePhoneNumber
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:border-yellow-400`}
            />
            {errors.alternatePhoneNumber && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.alternatePhoneNumber.message}
              </p>
            )}
          </label>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-10 rounded-md transition"
            >
              {addressData ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddAddress;
