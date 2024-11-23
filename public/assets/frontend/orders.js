const ordersList = document.getElementById("ordersList")
const btnSearch = document.getElementById("btnSearch")

//Adding the event listener to the whole UL, in order to catch then the ID of the button pressed and delete the corresponding username
ordersList.addEventListener("click", (e) => {
  const isButton = e.target.nodeName === 'BUTTON';

  if (!isButton) {
    return
  }
  
  var endpoint = `/orders/${e.target.dataset.doc}`

  switch (e.target.className) {
    case 'delete': {
      fetch(endpoint, {
        method: 'DELETE'
      }).then(location.reload())
      .catch(err => console.log(err))
    }; break;
    case 'details': {
      fetch(endpoint, {
        method: 'GET'
      }).then(window.location.href = endpoint)
    }; break;
    case 'update': {
      endpoint = `/orders/edit/${e.target.dataset.doc}`
    fetch(endpoint, {
      method: 'GET'
    }).then(window.location.href = endpoint)
    }; break;
  }  
});

btnSearch.addEventListener("click", (e) => {
  e.preventDefault()
  var filterDate = document.getElementById("filterDate").value
  var filterProduct = document.getElementById("filterProduct").value

  const endpoint = `/orders?date=${filterDate}&product=${filterProduct}`

  fetch(endpoint, {
    method: 'GET'
  }).then(window.location.href = endpoint)
})