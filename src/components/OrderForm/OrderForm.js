import { useState } from "react";

function OrderForm({addOrder}) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const newOrder = {
      name,
      ingredients
    }
    addOrder(newOrder)
    clearInputs();
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  function handleIngredientSelection(event){
    event.preventDefault();
    setIngredients([...ingredients, event.target.value])
  }
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        value={ingredient}
        onClick={handleIngredientSelection}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button onClick={(event) => handleSubmit(event)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
