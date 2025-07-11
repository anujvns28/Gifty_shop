import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VeryfyEmail from './pages/VeryfyEmail';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import SubCategories from './pages/SubCategories';
import SingleProduct from './pages/SingleProduct';
import Profile from './pages/Profile';
import ProfileInfo from './components/core/profile/ProfileInfo';
import Address from './components/core/profile/Address';
import MobileProfile from './pages/MobileProfile';
import MobileAddress from './pages/MobileAddress';
import UpdatePassword from './components/core/profile/UpdatePassword';
import AddProduct from './pages/AddProduct';
import CustomerOrders from "./pages/CustomerOrders";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import MyOrders from "./pages/MyOrders";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SubCategoriesForAdmin from "./pages/SubCategoriesForAdmin";
import Categories from "./pages/Categories";
import OrderDetailes from "./pages/OrderDetailes";

function App() {
  return (
    <div className="h-full w-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VeryfyEmail />} />
        <Route
          path="/products/:categoryId/:subCategoryId"
          element={<SubCategories />}
        />
        <Route path="/shouse/:productId" element={<SingleProduct />} />

        <Route element={<Profile />}>
          <Route path={"my-profile/view-profile"} element={<ProfileInfo />} />
          <Route path={"my-profile/add-address"} element={<Address />} />
          <Route
            path={"my-profile/update-password"}
            element={<UpdatePassword />}
          />
        </Route>
        <Route path={"/my-profile"} element={<MobileProfile />} />
        <Route path={"/add-address"} element={<MobileAddress />} />

        <Route path={"/create-product"} element={<AddProduct />} />
        <Route path={"/customer-orders"} element={<CustomerOrders />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path={"/wishlist"} element={<Wishlist />} />
        <Route path={"/orders"} element={<MyOrders />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/forgot-password"} element={<ForgotPassword />} />
        <Route path={"/update-password/:token"} element={<ResetPassword />} />

        <Route path="/categories" element={<Categories />} />
        <Route
          path="/sub-categories/:subCategoryId"
          element={<SubCategoriesForAdmin />}
        />
        <Route path="/order-details/:orderId" element={<OrderDetailes />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
