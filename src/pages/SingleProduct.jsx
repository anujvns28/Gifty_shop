import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getRatingAndReview,
  getSignleProductInfo,
} from "../service/operation/product";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/common/ProductCard";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { CategoryInfo } from "../service/operation/category";
import SubCategoryCard from "../components/common/SubCategoryCard";
import { size } from "../data/filterData";
import { IoIosArrowDown } from "react-icons/io";
import ReactStars from "react-stars";
import Modal from "../components/common/Modal";
import { addCartPrice, addToCart, addToWishlist } from "../slice/Product";
import RatingAndReviewModal from "../components/common/RatingAndReviewModal";
import { buyShouse } from "../service/operation/payment";
import AddressModal from "../components/common/AddressModal";
import { setRecentlyView } from "../slice/user";
import toast from "react-hot-toast";

const SingleProduct = () => {
  const { productId } = useParams();
  const [productInfo, setProductInfo] = useState();
  const [imageIndex, setImageIndex] = useState(0);
  const { allProduct } = useSelector((state) => state.product);
  const [viewport, setViewport] = useState(window.innerWidth);
  const [category, setCategory] = useState();
  const [modalData, setModalData] = useState();
  const [reviewModal, setReviewModal] = useState();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [ratingAndReviews, setRatingAndREviews] = useState();
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedState, setSelectedState] = useState("None");
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  const handleResize = () => {
    setViewport(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);

  const fetchproductInfo = async () => {
    const result = await getSignleProductInfo(productId);
    const rating = await getRatingAndReview(productId);
    if (result) {
      setProductInfo(result.data);
      dispatch(setRecentlyView(result.data));
      const category = await CategoryInfo(result.data.category);
      if (category) {
        setCategory(category.data);
      }
    }
    if (rating) {
      setRatingAndREviews(rating.data);
    }
  };

  // cart functin
  const handleCart = () => {
    if (!user) {
      console.log("cart");
      setModalData({
        text1: "Login!!",
        text2: "You are not logged in!",
        btn1: "Cancle",
        btn2: "Login",
        handler1: () => setModalData(null),
        handler2: () => navigate("/login"),
      });
      return;
    } else {
      const data = { ...productInfo };
      dispatch(addToCart(data));
      dispatch(addCartPrice(productInfo.price));
    }
  };

  // wishlist functin
  const handleWhisList = () => {
    if (!user) {
      setModalData({
        text1: "Login!!",
        text2: "You are not logged in!",
        btn1: "Cancle",
        btn2: "Login",
        handler1: () => setModalData(null),
        handler2: () => navigate("/login"),
      });
      return;
    }
    dispatch(addToWishlist(productInfo));
  };

  // buy now functin
  const handleBuyNow = async () => {
    if (!user) {
      setModalData({
        text1: "Login!!",
        text2: "You are not logged in!",
        btn1: "Cancle",
        btn2: "Login",
        handler1: () => setModalData(null),
        handler2: () => navigate("/login"),
      });
      return;
    } else {
      if (deliveryCharge > 0) {
        setShowAddressModal(true);
      } else {
        toast.error("Please select a delivery location");
      }
    }
  };

  // rating and review function
  const handleRatingAndReview = () => {
    if (!user) {
      setModalData({
        text1: "Login!!",
        text2: "You are not logged in!",
        btn1: "Cancle",
        btn2: "Login",
        handler1: () => setModalData(null),
        handler2: () => navigate("/login"),
      });
      return;
    }
    setReviewModal(true);
  };

  useEffect(() => {
    setProductInfo(null);
    fetchproductInfo();
  }, [productId]);

  if (!productInfo) {
    return (
      <div className="w-screen h-screen flex items-center justify-center ">
        <div className="custom-loader"></div>
      </div>
    );
  }
  return (
    <div className="w-full h-full ">
      <div className=" w-11/12 mx-auto ">
        <div className=" lg:w-[77%] w-[95%] mx-auto flex lg:flex-row  my-10 flex-col-reverse gap-[8%]">
          <div className="flex lg:flex-row  lg:h-[80vh] sticky top-8 flex-col-reverse gap-2 lg:w-[55%]  w-full">
            <div className="relative">
              {productInfo ? (
                <div className="flex lg:flex-col  gap-2">
                  {productInfo.productsImages.map((item, index) => {
                    return (
                      <div key={index} className="w-20">
                        <img
                          onClick={() => setImageIndex(index)}
                          className="object-cover rounded-md lg:w-32 lg:h-20  h-16 cursor-pointer"
                          src={item}
                        ></img>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div> Loading... </div>
              )}
            </div>
            {/* gf */}
            <div className="w-full  ">
              {productInfo ? (
                <img
                  className="object-cover  lg:h-[80vh] h-[300px] rounded-md"
                  src={productInfo.productsImages[imageIndex]}
                ></img>
              ) : (
                "Loading..."
              )}
            </div>
          </div>

          <div className=" lg:w-[40%] w-full p-3 flex flex-col lg:gap-2 ">
            <h1 className="lg:text-3xl text-xl font-semibold">
              {productInfo ? productInfo.productName : "Loading..."}
            </h1>

            <div className="lg:pt-3 pt-1">
              <p className="font-semibold text-lg">
                MRP : {productInfo ? productInfo.price : "Loading..."}
              </p>
              <p className="text-slate-400">incl. of taxes</p>
              <p className="text-slate-400">
                (Includes delivery charges and all applicable duties)
              </p>
            </div>
            <p className="font-semibold pb-2">
              Color : {productInfo ? productInfo.color : "Loading..."}
            </p>
            {/* delivery charge */}
            <div className="flex flex-col gap-2 mb-4 mt-2 border p-4 rounded-md shadow-sm bg-gray-50 w-full max-w-md">
              <label className="text-sm md:text-base font-semibold text-gray-700">
                Select Delivery Location
              </label>

              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                value={selectedState}
                onChange={(e) => {
                  const state = e.target.value;
                  setSelectedState(state);
                  if (state === "Maharashtra") setDeliveryCharge(70);
                  else if (state === "Other States") setDeliveryCharge(100);
                  else setDeliveryCharge(0);
                }}
              >
                <option value="None">-- Select State --</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Other States">Other States</option>
              </select>

              {selectedState !== "None" ? (
                <>
                  <p className="text-sm md:text-base text-gray-600">
                    Delivery Charge:{" "}
                    <span className="font-semibold">₹{deliveryCharge}</span>
                  </p>
                  <p className="text-sm md:text-base text-gray-600">
                    Total Payable:{" "}
                    <span className="font-semibold">
                      ₹{productInfo?.price + deliveryCharge}
                    </span>
                  </p>
                </>
              ) : (
                <p className="text-sm text-red-500">
                  Please select a delivery location
                </p>
              )}
            </div>

            <div className="lg:flex hidden flex-col gap-3">
              <div className="flex flex-row gap-3">
                <button
                  onClick={handleCart}
                  className="rounded-full text-xl px-2 py-4 w-[48%] bg-black  text-white"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleWhisList}
                  className="rounded-full text-xl px-2 py-4 w-[48%]  border border-black text-black"
                >
                  Wishlist
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="rounded-full hover:bg-yellow-600 text-xl px-2 py-4 bg-yellow-500 w-full text-white"
              >
                Buy Now
              </button>
            </div>

            {/* information */}
            <div className="pt-4 px-2 hidden lg:flex flex-col ">
              <p className="text-black font-semibold leading-relaxed">
                {productInfo ? productInfo.productDes : "Loading..."}
              </p>

              <details className=" border-y-2 mt-5 py-5">
                <summary className="flex cursor-pointer items-center justify-between text-xl font-semibold   ">
                  <p className=" "> Delivery & Returns</p>
                  <p>
                    <IoIosArrowDown />
                  </p>
                </summary>
                <div className="font-semibold leading-relaxed">
                  <p className="pt-4">
                    All purchases are subject to delivery fees.
                  </p>
                  <p>
                    <span className="text-3xl font-bold ">.</span> Standard
                    delivery 4–9 business days
                  </p>
                  <p>
                    Orders are processed and delivered Monday–Saturday
                    (excluding public holidays)
                  </p>
                  <p>Premimum Members enjoy free returns.</p>
                </div>
              </details>

              {/* ratting and revied */}
              <details className=" border-b-2  py-5">
                <summary className="flex cursor-pointer items-center justify-between text-xl font-semibold   ">
                  <p className=" ">
                    {" "}
                    Reviews ({productInfo.ratingAndReviews.length})
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    {ratingAndReviews && (
                      <ReactStars
                        count={5}
                        value={ratingAndReviews.averageRating}
                        edit={false}
                        size={24}
                        color2={"#ffd700"}
                      />
                    )}
                    <p>
                      <IoIosArrowDown />
                    </p>
                  </div>
                </summary>
                <div className="font-semibold leading-relaxed">
                  <div className="flex flex-row gap-4 items-center pt-8">
                    <ReactStars
                      count={5}
                      value={
                        ratingAndReviews ? ratingAndReviews.averageRating : 0
                      }
                      edit={false}
                      size={24}
                      color2={"#ffd700"}
                    />

                    <p className="">
                      {" "}
                      {ratingAndReviews
                        ? ratingAndReviews.averageRating
                        : 0}{" "}
                      Stars
                    </p>
                  </div>

                  <p
                    onClick={handleRatingAndReview}
                    className="font-semibold underline pt-1 pb-6 cursor-pointer"
                  >
                    Write a Review
                  </p>

                  {ratingAndReviews && (
                    <div>
                      {ratingAndReviews.ratingAndReviews.length === 0 ? (
                        <div className="flex items-center justify-center">
                          <p className="py-4">Not Reviewed Yet</p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-5">
                          {ratingAndReviews.ratingAndReviews.map(
                            (item, index) => {
                              return (
                                <div
                                  className={`${
                                    index !==
                                      ratingAndReviews.ratingAndReviews.length -
                                        1 && "border-b pb-4"
                                  }`}
                                >
                                  <div className="flex flex-row items-center gap-3">
                                    <img
                                      src={item.user.image}
                                      className="w-[20px] h-[20px] rounded-full object-fill"
                                    />
                                    <div>
                                      {item.user.firstName} {item.user.lastName}
                                    </div>
                                    <div>
                                      <ReactStars
                                        count={5}
                                        value={item.rating}
                                        edit={false}
                                        size={20}
                                        color2={"#ffd700"}
                                      />
                                    </div>
                                  </div>
                                  <p>{item.review}</p>
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </details>

              <details className=" border-b-2 py-5">
                <summary className="flex cursor-pointer items-center justify-between text-xl font-semibold   ">
                  <p className=" "> Product Information</p>
                  <p>
                    <IoIosArrowDown />
                  </p>
                </summary>
                <div className="font-semibold leading-relaxed">
                  <p className="pt-4">
                    Declaration: Handmade resin art product, directly sold by
                    the Gifty_Shop_2.
                  </p>
                  <p className="pt-4">
                    Marketed by: gifty_shop_2, Agashi Virar West , Mumbai,
                    Maharashtra - 401303
                  </p>
                  <p className="pt-4">Contact: +91 9022007484</p>
                  <p className="pt-4">
                    Care Instructions: Keep away from direct sunlight and water.
                    Clean with a dry, soft cloth.
                  </p>
                  <p className="pt-4">
                    Return Policy: Eligible for return within 7 days if damaged
                    during delivery.
                  </p>
                  <p className="pt-4">
                    Note: Customization available on request. Contact for
                    personalized designs.
                  </p>
                  <p className="pt-4">
                    Disclaimer: Each piece is uniquely handmade. Slight
                    variations in color and design are natural.
                  </p>
                  <p className="font-bold">Net Quantity: 1 handcrafted item</p>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* mobile  */}
        <div className="lg:hidden flex flex-col gap-1">
          {/* size */}

          {/* buttons */}
          <div className="flex flex-col gap-3">
            <div className="flex  gap-3">
              <button
                onClick={handleCart}
                className="rounded-full  py-2 w-[90%] mx-auto bg-black  text-white"
              >
                Add to Cart
              </button>
              <button
                onClick={handleWhisList}
                className="rounded-full  mx-auto py-2 w-[90%]  border border-black text-black"
              >
                Wishlist
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="rounded-full hover:bg-yellow-600 py-2 w-full mx-auto bg-yellow-500  text-white"
            >
              Buy Now
            </button>
          </div>
          {/* information */}
          <div className="pt-4 px-2  ">
            <p className="text-black font-semibold leading-relaxed">
              {productInfo ? productInfo.productDes : "Loading..."}
            </p>

            <details className=" border-y-2 mt-5 py-5">
              <summary className="flex cursor-pointer items-center justify-between text-xl font-semibold   ">
                <p className=" "> Delivery & Returns</p>
                <p>
                  <IoIosArrowDown />
                </p>
              </summary>
              <div className="font-semibold leading-relaxed">
                <p className="pt-4">
                  All purchases are subject to delivery fees.
                </p>
                <p>
                  <span className="text-3xl font-bold ">.</span> Standard
                  delivery 4–9 business days
                </p>
                <p>
                  Orders are processed and delivered Monday–Friday (excluding
                  public holidays)
                </p>
                <p>Premimum Members enjoy free returns.</p>
              </div>
            </details>

            {/* ratting and revied */}
            <details className=" border-b-2  py-5">
              <summary className="flex cursor-pointer items-center justify-between text-xl font-semibold   ">
                <p className=" ">
                  {" "}
                  Reviews ({productInfo.ratingAndReviews.length})
                </p>
                <div className="flex items-center justify-center gap-2">
                  <ReactStars
                    count={5}
                    value={
                      ratingAndReviews ? ratingAndReviews.averageRating : 0
                    }
                    edit={false}
                    size={24}
                    color2={"#ffd700"}
                  />
                  <p>
                    <IoIosArrowDown />
                  </p>
                </div>
              </summary>
              <div className="font-semibold leading-relaxed">
                <div className="flex flex-row gap-4 items-center pt-8">
                  <ReactStars
                    count={5}
                    value={
                      ratingAndReviews ? ratingAndReviews.averageRating : 0
                    }
                    edit={false}
                    size={24}
                    color2={"#ffd700"}
                  />

                  <p className="">
                    {" "}
                    {ratingAndReviews ? ratingAndReviews.averageRating : 0}{" "}
                    Stars
                  </p>
                </div>

                <p
                  onClick={handleRatingAndReview}
                  className="font-semibold underline pt-1 pb-6 cursor-pointer"
                >
                  Write a Review
                </p>

                {ratingAndReviews && (
                  <div>
                    {ratingAndReviews.ratingAndReviews.length === 0 ? (
                      <div className="flex items-center justify-center">
                        <p className="py-4">Not Reviewed Yet</p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-5">
                        {ratingAndReviews.ratingAndReviews.map(
                          (item, index) => {
                            return (
                              <div
                                key={index}
                                className={`${
                                  index !==
                                    ratingAndReviews.ratingAndReviews.length -
                                      1 && "border-b pb-4"
                                }`}
                              >
                                <div className="flex flex-row items-center gap-3">
                                  <img
                                    src={item.user.image}
                                    className="w-[20px] h-[20px] rounded-full object-fill"
                                  />
                                  <div>
                                    {item.user.firstName} {item.user.lastName}
                                  </div>
                                  <div>
                                    <ReactStars
                                      count={5}
                                      value={item.rating}
                                      edit={false}
                                      size={20}
                                      color2={"#ffd700"}
                                    />
                                  </div>
                                </div>
                                <p>{item.review}</p>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </details>

            <details className=" border-b-2 py-5">
              <summary className="flex cursor-pointer items-center justify-between text-xl font-semibold   ">
                <p className=" "> Product Information</p>
                <p>
                  <IoIosArrowDown />
                </p>
              </summary>
              <div className="font-semibold leading-relaxed">
                <p className="pt-4">
                  Declaration: Handmade resin art product, directly sold by the
                  Gifty_Shop_2.
                </p>
                <p className="pt-4">
                  Marketed by: gifty_shop_2, Agashi Virar West , Mumbai,
                  Maharashtra - 401303
                </p>
                <p className="pt-4">Contact: +91 9022007484</p>
                <p className="pt-4">
                  Care Instructions: Keep away from direct sunlight and water.
                  Clean with a dry, soft cloth.
                </p>
                <p className="pt-4">
                  Return Policy: Eligible for return within 7 days if damaged
                  during delivery.
                </p>
                <p className="pt-4">
                  Note: Customization available on request. Contact for
                  personalized designs.
                </p>
                <p className="pt-4">
                  Disclaimer: Each piece is uniquely handmade. Slight variations
                  in color and design are natural.
                </p>
                <p className="font-bold">Net Quantity: 1 handcrafted item</p>
              </div>
            </details>
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-100 p-3 mt-7">
        <div className="w-11/12 mx-auto">
          {/* relaeatd products */}
          <div>
            <h1 className="text-xl font-semibold italic text-blue-500 my-3">
              Similar Products{" "}
            </h1>
            {allProduct ? (
              <div>
                {
                  <Swiper
                    modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                    navigation
                    spaceBetween={10}
                    slidesPerView={viewport < 500 ? 1.8 : 4.05}
                  >
                    <div className="items-center  ">
                      {allProduct.map((ele) => {
                        if (ele._id !== productId) {
                          return (
                            <div
                              key={ele._id}
                              className="flex  items-center justify-center "
                            >
                              <SwiperSlide>
                                <ProductCard product={ele} />
                              </SwiperSlide>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </Swiper>
                }
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>

          {/* similer brands */}
          {category && (
            <div className="">
              <p className="text-xl font-semibold italic text-blue-500 my-3">
                Other related products{" "}
              </p>
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                navigation
                spaceBetween={10}
                slidesPerView={viewport < 500 ? 1.2 : 3.5}
              >
                {category.subCategories.map(
                  (item) =>
                    item._id !== productInfo.subCategoryProducts && (
                      <div>
                        <SwiperSlide>
                          <SubCategoryCard
                            item={item}
                            categoryId={category._id}
                          />
                        </SwiperSlide>
                      </div>
                    )
                )}
              </Swiper>
            </div>
          )}
        </div>
      </div>
      {modalData && <Modal modalData={modalData} />}
      {reviewModal && (
        <RatingAndReviewModal
          setReviewModal={setReviewModal}
          productId={productInfo._id}
          fetchproductInfo={fetchproductInfo}
        />
      )}
      {showAddressModal && (
        <AddressModal
          productId={productId}
          setShowAddressModal={setShowAddressModal}
          deliveryCharge={deliveryCharge}
        />
      )}
    </div>
  );
};

export default SingleProduct;
