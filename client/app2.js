let updated_id = -1;

const tokendata = localStorage.getItem("user_token");
if (!tokendata) {
  window.location.href =
    "file:///C:/Users/Abhishek%20Dulat/Downloads/sharpner/sharpner_exp/client/login.html";
}

const tokenfinal = JSON.parse(atob(tokendata.split(".")[1]));

if (tokenfinal.isPremium) {
  console.log(tokenfinal.name);
  document.getElementById("rzp-button1").style.display = "none";
  document.getElementById(
    "rzp-p"
  ).innerHTML = `${tokenfinal.name} You are Premium User`;
}

async function handleBookappointment(event) {
  event.preventDefault();
  if (updated_id != -1) {
    handleupdate(event);
    return;
  } else {
    console.log("bye");
    const formData = {
      title: event.target.title.value,
      amount: event.target.amount.value,
      category: event.target.category.value,
    };
    const data = await axios.post(
      "http://localhost:8001/api/book/add",
      formData,
      { headers: { Authorization: tokendata } }
    );
    console.log(data);
    const username_input = document.getElementById("title");
    username_input.value = "";
    const email_input = document.getElementById("amount");
    email_input.value = "";
    getallbookings();
  }
}

async function getallbookings() {
  const data = await axios.get("http://localhost:8001/api/book/all", {
    headers: { Authorization: tokendata },
  });
  const finaldata = data.data.data;
  console.log(finaldata);
  let totalexp = 0;

  const basebox = document.getElementById("main_app_result");
  basebox.innerHTML = "";
  for (let i = 0; i < finaldata.length; i++) {
    totalexp += finaldata[i].amount;
    const eventBox = document.createElement("div");
    eventBox.className = "details_box";
    const p1 = document.createElement("p");
    p1.textContent = `${finaldata[i].title}`;
    const p2 = document.createElement("p");
    p2.textContent = `$${finaldata[i].amount}`;
    p2.style.color = "#6C92A2";
    p2.style.weight = "600";
    const p3 = document.createElement("p");
    p3.textContent = `${finaldata[i].category}`;
    const b1 = document.createElement("button");
    b1.textContent = "Edit";
    b1.addEventListener("click", async () => {
      const username_input = document.getElementById("title");
      username_input.value = finaldata[i].title;
      const email_input = document.getElementById("amount");
      email_input.value = finaldata[i].amount;
      const button_input = document.getElementById("formsubmit");
      button_input.style.display = "none";
      const button_input1 = document.getElementById("formsubmitupdate");
      button_input1.style.display = "block";
      updated_id = finaldata[i].id;
    });
    const b2 = document.createElement("button");
    b2.textContent = "Done";
    b2.addEventListener("click", async () => {
      const data = await axios.delete(
        `http://localhost:8001/api/book/delete/${finaldata[i].id}`,
        { headers: { Authorization: tokendata } }
      );
      console.log(data);
      getallbookings();
    });
    basebox.appendChild(eventBox);
    eventBox.appendChild(p1);
    eventBox.appendChild(p2);
    eventBox.appendChild(p3);
    eventBox.appendChild(b1);
    eventBox.appendChild(b2);
  }
  const exptotalBox = document.getElementById("totalvalueclass");
  exptotalBox.textContent = `$${totalexp}`;
}

async function handleupdate(event) {
  event.preventDefault();
  console.log("hello");
  const formData = {
    title: event.target.title.value,
    amount: event.target.amount.value,
  };
  const data = await axios.put(
    `http://localhost:8001/api/expense/${updated_id}`,
    formData,
    { headers: { Authorization: tokendata } }
  );
  console.log(data);
  updated_id = -1;
  const username_input = document.getElementById("title");
  username_input.value = "";
  const email_input = document.getElementById("amount");
  email_input.value = "";
  getallbookings();
}

getallbookings();

document.getElementById("rzp-button1").onclick = async function (e) {
  const token = localStorage.getItem("user_token");
  const response = await axios.get(
    `http://localhost:8001/api/purchase/premium`,
    { headers: { Authorization: token } }
  );
  console.log(response);
  let options = {
    key: response.data.key_id,
    order_id: response.data.order.id,
    handler: async function (response) {
      const data = await axios.post(
        `http://localhost:8001/api/purchase/updatepremium`,
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        { headers: { Authorization: token } }
      );
      localStorage.setItem("user_token", data.data.token);
      alert("you are a Premium User Now!");
    },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();
  rzp1.on("payment.failed", async function (response) {
    const data = await axios.post(
      `http://localhost:8001/api/purchase/updatepremiumfailed`,
      {
        order_id: options.order_id,
        payment_id: response.razorpay_payment_id,
      },
      { headers: { Authorization: token } }
    );
    localStorage.setItem("user_token", data.data.token);
    alert("Something went wrong!");
  });
};
