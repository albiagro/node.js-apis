const productsList = document.getElementById("productsList")
const btnUpdate = document.getElementById("btnUpdate");

//Adding the event listener to the whole UL, in order to catch then the ID of the button pressed and delete the corresponding username
productsList.addEventListener("click", (e) => {
  const isButton = e.target.nodeName === 'BUTTON';

  if (!isButton) {
    return
  }

  const endpoint = `/products/${e.target.dataset.doc}`

  fetch(endpoint, {
    method: 'DELETE'
  }).then(location.reload())
  .catch(err => console.log(err))
});

btnUpdate.addEventListener("click", (e) => {
  e.preventDefault()
  var productName = document.getElementById("updateValue").value
  var productPrice = document.getElementById("updatePrice").value

  const endpoint = `/products/${productName}`

  var product = {
    name: productName,
    price: productPrice
  }

  fetch(endpoint, {
    method: 'PUT',    
    headers: {
      'Content-Type': 'application/json'},
    body: JSON.stringify(product)
  }).then(location.reload())
  .catch(err => console.log(err))  
});