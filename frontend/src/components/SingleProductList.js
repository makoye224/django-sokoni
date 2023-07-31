import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useStateContext } from "../context/Context";
import Rating from "./Rating";

const SingleProductList = ({ prod }) => {
  const history = useHistory();
  const {
    cart,
    addToCart,
    removeItemFromCart,
  } = useStateContext();

  const handleBuyNowClick = () => {
    const isProductInCart = cart.some((item) => item?.product?.id == prod.id);
    console.log(isProductInCart)
    if (!isProductInCart) {
      handleAddTocart();
    }
  
    history.push(`/buynow/${prod.id}`);
  };

  // Function to truncate description to 80 characters
  const truncateString = (description, number) => {
    if (description.length > number) {
      return description.slice(0, number);
    }
    return description;
  };

  const handleAddTocart = () => {
    const payload = {
      product: prod,
      quantity: 1,
    };
     try {
      addToCart(payload);
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };

  useEffect(() => {
    // Scroll to the top of the page after the route change
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
      <div>
        <div
          className="card"
          style={{
            borderRadius: "2rem",
            boxShadow: "2px 2px 2px 2px rgba(10, 10, 10, 0.5)",
            backgroundColor: "#FFF5EE",
          }}
        >
          <a
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "auto" });
              history.push(`/details/${prod.id}`);
            }}
            style={{ cursor: "pointer" }}
          >
            <div style={{ height: "250px", overflow: "hidden" }}>
              <img
                src="https://shorturl.at/lpFJW"
                className="card-img-top"
                alt="product photo"
                loading="lazy"
                style={{ borderRadius: "2rem", objectFit: "contain" }}
              />
            </div>
          </a>

          <div className="card-body">
            <a
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "auto" });
                history.push(`/details/${prod.id}`);
              }}
              style={{ cursor: "pointer" }}
            >
              <section style={{ maxHeight: "30px", overflow: "hidden" }}>
                <div
                  className="d-flex flex-wrap"
                  style={{ fontWeight: "bold" }}
                >
                  <div className="flex-grow-1">
                    <p className="d-inline container">
                      {truncateString(prod && prod.title, 20)}
                    </p>
                  </div>
                  <div>
                    <p className="d-inline container">
                      $ {prod && prod.unit_price}
                    </p>
                  </div>
                </div>
              </section>
              <section>
                {prod.fastDelivery ? (
                  <p className="container">Fast Delivery</p>
                ) : (
                  <p className="container">4-day Delivery</p>
                )}
              </section>
              <section>
                <div className="container text-center">
                  <Rating rating={3} />
                </div>
              </section>
              <section>
               
                  <p className="container" style={{height: '45px', overflow: 'hidden'}}>
                    {truncateString(prod && prod.description, 50)}
                  </p>
              
              </section>
            </a>
            <section>
              {!prod.inventory ? (
                <div className="text-danger d-flex justify-content-center">
                  Out of Stock
                </div>
              ) : (
                <div
                  className="d-flex justify-content-center"
                  style={{ cursor: "pointer" }}
                >
                  {cart.some((item) => item?.product?.id === prod?.id) ? (
                    <Button
                      variant="default"
                      onClick={() => {
                        const item = cart.find(
                          (item) => item?.product?.id === prod?.id
                        );
                        removeItemFromCart(prod?.id);
                      }}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "1rem",
                      }}
                    >
                      Remove From Cart
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      onClick={handleAddTocart}
                      style={{
                        backgroundColor: "#2dace4",
                        borderRadius: "1rem",
                        color: "white",
                      }}
                    >
                      Add to Cart
                    </Button>
                  )}
                  <Button
                    variant="success"
                    onClick={handleBuyNowClick}
                    style={{ marginLeft: "20px", borderRadius: "1rem" }}
                  >
                    Buy Now
                  </Button>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductList;
