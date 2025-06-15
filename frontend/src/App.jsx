import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ServicePage from "./pages/ServicePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import AdminLogin from "./pages/Auth/AdminLogin";
import DeliveryLogin from "./pages/Auth/DeliveryLogin";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import CreateCategory from "./pages/Admin/CreateCategory";
import AddNewService from "./pages/Admin/AddNewService";
import Services from "./pages/Admin/Services";
import Users from "./pages/Admin/User";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import UpdateService from "./pages/Admin/UpdateService";
import Search from "./pages/Search";
import ServiceDetails from "./pages/ServiceDetails";
import Categories from "./pages/Categories";
import CategoryService from "./pages/CategoryService";
import CartPage from "./pages/CartPage";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import PaymentFail from "./pages/Payment/PaymentFail";
import PaymentCancel from "./pages/Payment/PaymentCancel";
import AllOrders from "./pages/Delivery/AllOrders";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/service/:slug" element={<ServiceDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryService />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard/delivery/orders" element={<AllOrders />} />
        {/* #payment */}
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-fail" element={<PaymentFail />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/add-service" element={<AddNewService />} />
          <Route path="admin/service/:slug" element={<UpdateService />} />
          <Route path="admin/services" element={<Services />} />
          <Route path="admin/Users" element={<Users />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/delivery-login" element ={<DeliveryLogin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
