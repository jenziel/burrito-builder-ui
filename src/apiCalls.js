function getOrders (){
  return fetch("http://localhost:3001/api/v1/orders")
  .then((response) => response.json());
}

function postOrder(newOrder) 
{ 
  return fetch(' http://localhost:3001/api/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOrder)
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        throw new Error('Something happened while adding a new order via POST.')
      }
    })
    .then(response => {

      console.log('raw response', response)
     return  response.json()
    })
}
 
  

export { getOrders, postOrder};