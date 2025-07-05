import React from "react";
import allProductsIcon from "./images/shopping.png";
import fashionIcon from "./images/clothes.png";
import groceryIcon from "./images/shopping-bag.png";
import electronicsIcon from "./images/tv-furniture.png";
import furnitureIcon from "./images/set.png";
import toysIcon from "./images/toy-car.png";
import beautyIcon from "./images/personal-care.png";
import otherIcon from "./images/etc.png";
import 'bootstrap/dist/css/bootstrap.min.css';

const categories = [
  { name: "All Products", icon: allProductsIcon, active: true },
  { name: "Fashion", icon: fashionIcon },
  { name: "Grocery", icon: groceryIcon },
  { name: "Electronics", icon: electronicsIcon },
  { name: "Furniture", icon: furnitureIcon },
  { name: "Toys", icon: toysIcon },
  { name: "Beauty And Personal Care", icon: beautyIcon },
  { name: "Other", icon: otherIcon },
];

export default function SideBarMenu() {
  return (
    <div className="container-fluid px-2">
      <div className="row">
        <div className="col-md-3 d-none d-md-block">
          <div className="list-group">
            {categories.map((item, index) => (
              <div
                key={index}
                className={`list-group-item d-flex align-items-center gap-3 ${item.active ? 'bg-success text-white' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                <img src={item.icon} alt={item.name} width="28" height="28" />
                <span className="fw-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 d-md-none mb-3">
          <div className="d-flex flex-wrap justify-content-start gap-3">
            {categories.map((item, index) => (
              <div
                key={index}
                className={`d-flex flex-column align-items-center px-2 py-2 rounded ${item.active ? 'bg-success text-white' : 'bg-light'}`}
                style={{ cursor: 'pointer', width: '100px' }}
              >
                <img src={item.icon} alt={item.name} width="28" height="28" />
                <small className="text-center mt-1">{item.name}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
