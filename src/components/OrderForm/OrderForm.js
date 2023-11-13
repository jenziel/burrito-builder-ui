import { useState } from "react";
import { postOrder } from "../../apiCalls";

function OrderForm({addOrder}) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [alert, setAlert] = useState("");

  const isFormComplete = () => {
   return !(name === "" || ingredients.length === 0)
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newOrder = {
      name,
      ingredients
    }
    if (isFormComplete()) {
      console.log('form is complete')
      postOrder(newOrder)
      .then(postOrderResult => {
        console.log(postOrderResult)
        addOrder(postOrderResult);
        clearInputs()
      })
      .catch(err => console.error(err));
    } else {
      setAlert("Form is incomplete. All fields need to be filled in.")
    }
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
    setAlert("")
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
      className = {`${ingredient}-btn`}
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
      <div className='errorMessage'>{alert}</div>
      <button className='submit-btn' onClick={(event) => handleSubmit(event)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
