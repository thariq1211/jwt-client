var BASE_URL = "http://147.139.164.106:8080";
var LOCAL_URL = "http://localhost:3000";

$(document).ready(() => {
  $("#root").html("<h1>selamat datang</h1>");
  $("#ex").text("contoh API https://jsonplaceholder.typicode.com/users");
  sessionStorage.removeItem("SECRET_TOKEN");
});

function authenticate() {
  var username = $("#username").val();
  var password = $("#password").val();
  if (username === "" && password === "") {
    throw new Error("FORM isEmpty");
  } else {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${BASE_URL}/iswitch1-login/authenticate`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        sessionStorage.setItem("SECRET_TOKEN", result.data.token);
      })
      .catch((error) => console.log("error", error));
  }
}

function login() {
  var username = $("#username1").val();
  var password = $("#password2").val();
  var token = sessionStorage.getItem("SECRET_TOKEN");
  console.log({ username, password, token });

  var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  if (username === "" && password === "" && !token) {
    throw new Error("FORM isEmpty");
  } else {
    axios({
      url: `${BASE_URL}/iswitch1-login/user/login`,
      method: "POST",
      data: {
        username,
        password,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (data) {
        console.log(data);
      })
      .catch(function (err) {
        console.log(err.message);
      });
  }
}

function hitHello() {
  axios("https://iswitch.ddns.net:8443/access-token/hello", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("SECRET_TOKEN")}`,
    },
  })
    .then((data) => {
      console.log(data);
      $("#hasilHello").html(`<p>${JSON.stringify(data)}</p>`);
    })
    .catch((err) => {
      console.log(err);
      $("#hasilHello").html(`<p>${JSON.stringify(err)}</p>`);
    });
}

$(function () {
  $("#api").click(function (e) {
    e.preventDefault();
    authenticate();
  });
  $("#loginAgent").click(function (e) {
    e.preventDefault();
    login();
  });
  $("#hasilHello").click(function (e) {
    e.preventDefault();
    hitHello();
  });
});
