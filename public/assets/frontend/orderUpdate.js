const btnConfirmOrder = document.getElementById("btnConfirm");

btnConfirmOrder.addEventListener("click", (e) => {

  const endpoint = `/orders/${e.target.dataset.doc}` 

  var users = [];
  var rows = [];

  var productCheckboxes = document.getElementsByName("addUser");

  Array.prototype.forEach.call(productCheckboxes, function (userChk) {
    if (userChk.checked) {
      users.push(userChk.id);
    }
  });

  var productCheckboxes = document.getElementsByName("addProduct");

  Array.prototype.forEach.call(productCheckboxes, function (prodChk) {
    if (prodChk.checked) {
      var row = {
        productID: prodChk.id,
        quantity: document.getElementById(`qty-${prodChk.id}`).value
      }
      rows.push(row);
    }
  });

  var order = {
    usersIDs: users,
    rows: rows,
  };

  fetch(endpoint, {
    method: 'PUT',    
    headers: {
      'Content-Type': 'application/json'},
    body: JSON.stringify(order)
  }).then(location.reload())
  .catch(err => console.log(err))  
});
