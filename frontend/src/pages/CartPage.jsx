import React from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Update quantity function
  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    const newCart = cart
      .map((item) => (item._id === id ? { ...item, quantity: qty } : item))
      .filter((item) => item.quantity > 0); // Remove if quantity is 0
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += (item.price || 0) * (item.quantity || 1);
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "BDT",
      });
    } catch (error) {
      console.log(error);
      return "$0.00";
    }
  };

  // delete service
  const removeBasketService = (pid) => {
    try {
      const newCart = cart.filter((item) => item._id !== pid);
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Payment handler
  const handlePayment = async () => {
    try {
      const amount = cart.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      );
      const { data } = await axios.post(
        "/api/v1/payment/initiate",
        {
          cart,
          address: auth?.user?.address,
          amount,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.paymentUrl) {
        // Do NOT clear the cart here!
        window.location.href = data.paymentUrl;
      } else {
        toast.error("Payment initiation failed");
      }
    } catch (error) {
      toast.error("Payment initiation failed");
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have Selected ${cart.length} Services in your Laundry Basket ${auth?.token ? "" : "please login to checkout"
                }`
                : "Your Laundry Basket Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div
                className="card mb-2 p-2 d-flex flex-row align-items-center"
                style={{
                  maxWidth: "500px",
                  minWidth: "320px",
                  margin: "0 auto",
                }}
                key={p._id}
              >
                <div className="col-md-4">
                  <img
                    src={`/api/v1/service/service-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="90px"
                    height="90px"
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                </div>
                <div className="col-md-8 ps-3">
                  <p className="mb-1 fw-bold">{p.name}</p>
                  <p className="mb-1">{p.description.substring(0, 30)}</p>
                  <p className="mb-1">Price : {p.price}</p>
                  {/* Quantity Controls */}
                  <div className="mb-1">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() =>
                        updateQuantity(p._id, (p.quantity || 1) - 1)
                      }
                      disabled={p.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-2">{p.quantity || 1}</span>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() =>
                        updateQuantity(p._id, (p.quantity || 1) + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  {/* Purchase Date Display */}
                  <p className="mb-1" style={{ fontSize: "0.9em" }}>
                    Order Date:{" "}
                    {p.purchaseDate
                      ? new Date(p.purchaseDate).toLocaleString()
                      : "Not available"}
                  </p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeBasketService(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4 text-center">
            <h2>Laundry Basket Summary</h2>
            <hr />
            <div className="mb-3">
              <h4>Items in Cart:</h4>
              <ul className="list-group">
                {cart?.map((item, index) => (
                  <li
                    key={item._id}
                    className="list-group-item d-flex justify-content-between"
                    title={item.description || ""}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#ffffff", // Light grey & white
                      transition: "background-color 0.3s",
                    }}
                  >
                    <span>{item.name}</span>
                    <span>
                      {item.quantity} x{" "}
                      {item.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "BDT",
                      })}
                    </span>
                    <span>
                      {(item.quantity * item.price).toLocaleString("en-US", {
                        style: "currency",
                        currency: "BDT",
                      })}
                    </span>
                  </li>
                ))}
              </ul>

              <style>
                {`
  .list-group-item:hover, tr:hover {
    background-color:rgb(241, 241, 26) !important;
    cursor: pointer;
    transition: background 0.2s;
  }
`}
              </style>
            </div>
            <h4>Total: {totalPrice()}</h4>

            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Profile
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Profile
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
            <button
              className="btn btn-success"
              disabled={!cart.length || !auth?.user?.address}
              onClick={handlePayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
