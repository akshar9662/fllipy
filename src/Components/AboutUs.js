import React from "react";
import aboutus from "./images/aboutus.jpg";
import mission from "./images/mission.png";
const AboutUs = () => {
  return (
    <div className="container my-5 px-3 px-md-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">About Fllipy</h1>
        <p className="text-muted mt-2">
          Your one-stop destination for quality, value, and convenience.
        </p>
      </div>

      <div className="row align-items-center mb-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src={aboutus}
            alt="About us"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h4 className="fw-bold mb-3">Who We Are</h4>
          <p>
            At <strong>Fllipy</strong>, we believe in redefining your shopping experience by offering
            a handpicked collection of fashion, electronics, home essentials, and more.
          </p>
          <p>
            We’re passionate about bringing premium products to your doorstep with
            seamless service and great deals.
          </p>
        </div>
      </div>

      <div className="row align-items-center flex-md-row-reverse">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src={mission}
            alt="Our Mission"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h4 className="fw-bold mb-3">Our Mission</h4>
          <p>
            Our goal is simple — to deliver high-quality, affordable products with a
            user-friendly platform that makes shopping enjoyable and effortless.
          </p>
          <p>
            We’re committed to innovation, trust, and customer happiness at every step.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
