let updated_id = -1;

async function handleSignup(event) {
  event.preventDefault();
  const tempData = {
    name: event.target.name.value,
    email: event.target.email.value,
    password: event.target.password.value,
    confirmpassword: event.target.confirmpassword.value,
  };
  if (
    !tempData.name ||
    !tempData.email ||
    !tempData.password ||
    !tempData.confirmpassword
  ) {
    alert("all fields are required!");
  }
  if (tempData.password !== tempData.confirmpassword) {
    alert("password and confirm password doesn't match!");
  } else {
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };
    const data = await axios.post(
      "http://localhost:8001/api/signup/",
      formData
    );
    if (data?.status === 200) {
      console.log(data);
      handlenextPage(data);
    } else {
      alert("user already exists!");
    }
  }
}

function handlenextPage(data) {
  window.location.href =
    "file:///C:/Users/Abhishek%20Dulat/Downloads/sharpner/sharpner_exp/client/newpage.html";
  const app1 = document.getElementById("usernamedata");
  app1.innerHTML = `Welcome ${data.data.name}`;
  app1.style.color = "white";
}
