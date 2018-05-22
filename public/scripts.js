const loginBtn = document.getElementById('login');

loginBtn.addEventListener('click', () => {
  fetch('/login')
    .then(response => response.json())
    .then(json => {
      let clientID = `client_id=${json.clientID}`;
      let scope = `scope=${json.scope}`;
      let state = `state=${json.state}`;

      window.location.href = `https://github.com/login/oauth/authorize?${clientID}&${scope}&${state}`;
    })
    .catch(err => console.log(err));
});