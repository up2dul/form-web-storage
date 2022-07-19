const storageKey = 'STORAGE_KEY';
const submitAction = document.getElementById('formUser');
const getStorage = localStorage.getItem(storageKey);

function checkStorage() {
  return typeof Storage !== undefined;
}

function putUserList(data) {
  if (checkStorage()) {
    let userData = [];
    if (getStorage === null) {
      userData = [];
    } else {
      userData = JSON.parse(getStorage);
    }
    userData.unshift(data);
    if (userData.length > 5) {
      userData.pop();
    }
    localStorage.setItem(storageKey, JSON.stringify(userData));
  }
}

function getUserList() {
  if (checkStorage()) {
    return JSON.parse(getStorage) || [];
  } else {
    return [];
  }
}

function renderUserList() {
  const userData = getUserList();
  const userList = document.querySelector('.table-body-list');

  userList.innerHTML = '';

  userData.forEach(({ name, age, gender }, index) => {
    userList.innerHTML += `
      <tr>
        <th scope="row">${index+1}</th>
        <td>${name}</td>
        <td>${age} years old</td>
        <td>${gender}</td>
      </tr>
    `;
  });
}

submitAction.addEventListener('submit', function () {
  const inputName = document.getElementById('inputName').value;
  const inputAge = document.getElementById('inputAge').value;
  const inputGender = document.getElementById('inputGender').value;
  const newUserData = {
    name: inputName,
    age: inputAge,
    gender: inputGender,
  };
  putUserList(newUserData);
  renderUserList();
});

window.addEventListener('load', function () {
  if (checkStorage) {
    if (getStorage !== null) {
      const userdata = getUserList();
      renderUserList(userdata);
    }
  } else {
    alert('Your browser doesn\'t support Web Storage!');
  }
});
