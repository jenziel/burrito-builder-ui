import React from "react";
import "./Orders.css";

const Orders = ({orders}) => {
 
  const orderEls = orders.map(({id, name, ingredients}) => {
    return (
      <div className="order" id={id}>
        <h3>{name}</h3>
        <ul className="ingredient-list">
          {ingredients.map((ingredient) => {
            return <li>{ingredient}</li>;
          })}
        </ul>
      </div>
    );
  });

  return (
    <section>{orderEls.length ? orderEls : <p>No orders yet!</p>}</section>
  );
};

export default Orders;
