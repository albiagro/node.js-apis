const btnConfirmOrder = document.getElementById("btnConfirmOrder");

btnConfirmOrder.addEventListener("click", (e) => {
  var today  = new Date();

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
    date: today,
    usersIDs: users,
    rows: rows,
  };

  fetch("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order)
  })
  .then(location.reload())
});
