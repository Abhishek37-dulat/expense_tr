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
      "http://localhost:8001/api/exp/signup/",
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

async function handleSignin(event) {
  event.preventDefault();
  const tempData = {
    email: event.target.email.value,
    password: event.target.password.value,
  };
  if (!tempData.email || !tempData.password) {
    alert("all fields are required!");
  } else {
    const formData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    const data = await axios.post(
      "http://localhost:8001/api/exp/login/",
      formData
    );
    if (data?.status === 200) {
      // console.log(data.data.token);
      localStorage.setItem("user_token", data.data.token);
      handlenextPage(data);
    } else {
      console.log(data);
      alert("user doesn't exist!");
    }
  }
}
var options = {
  key: "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
  amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  currency: "INR",
  name: "Expense Tracker", //your business name
  description: "Test Transaction",
  image: "https://example.com/your_logo",
  order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
  prefill: {
    //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
    name: "Gaurav Kumar", //your customer's name
    email: "gaurav.kumar@example.com",
    contact: "9000090000", //Provide the customer's phone number for better conversion rates
  },
  notes: {
    address: "Razorpay Corporate Office",
  },
  theme: {
    color: "#3399cc",
  },
};

document.getElementById("rzp-button1").onclick = function (e) {};
