import React from "react";
import "./Orders.css";

const Orders = ({orders}) => {
 
  const orderEls = orders.map(({id, name, ingredients}) => {
    return (
      <div className="order" id={id} key={id}>
        <h3>{name}</h3>
        <ul className="ingredient-list">
          {ingredients.map((ingredient, index) => {
            return <li key={`${ingredient}${id}${index}`} id={`${ingredient}${id}${index}`}>{ingredient}</li>;
          })}
        </ul>
      </div>
    );
  });

  return (
    <section>{orderEls.length ? (
      <div className="order-container">
        {orderEls}
      </div>
      ) : (<p>No orders yet!</p>)}</section>
  );
};

export default Orders;
