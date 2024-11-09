const userList = document.getElementById("usersList")
const btnUpdate = document.getElementById("btnUpdate");

//Adding the event listener to the whole UL, in order to catch then the ID of the button pressed and delete the corresponding username
userList.addEventListener("click", (e) => {
  const isButton = e.target.nodeName === 'BUTTON';

  if (!isButton) {
    return
  }

  const endpoint = `/users/${e.target.dataset.doc}`

  fetch(endpoint, {
    method: 'DELETE'
  }).then(location.reload())
  .catch(err => console.log(err))
});

btnUpdate.addEventListener("click", (e) => {
  e.preventDefault()
  var updateName = document.getElementById("updateName").value
  var updateSurname = document.getElementById("updateSurname").value
  var updateEmail = document.getElementById("updateEmail").value

  var user = {
    name: updateName,
    surname: updateSurname,
    email: updateEmail
  }

  var nameAndSurname = updateName + updateSurname
  const endpoint = `/users/${nameAndSurname}`

  console.log(endpoint)

  fetch(endpoint, {
    method: 'PUT',    
    headers: {
      'Content-Type': 'application/json'},
    body: JSON.stringify(user)
  }).then(location.reload())
  .catch(err => console.log(err))  
});