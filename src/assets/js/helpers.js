import {
  setError,
  setSuccess,
  showErrorToast,
  showSuccessToast,
} from "./toast";

const TIMEOUT_SEC = 10;
const API_URL = "https://techmaster.vn/submit-advisory";

export function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export function isEmailValid(value) {
  const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  return regex.test(value);
}

export function isPhoneNumber(value) {
  const regex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{3,4}$/;
  return regex.test(value);
}

export function checkInputs(username, email, phone) {
  let isValid = true;

  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value.trim();
  // console.log(usernameValue, emailValue, phoneValue);
  if (usernameValue === "") {
    // console.log("name error");
    // console.log(usernameValue);
    setError(username, "Tên không được để trống.");
    isValid = false;
  } else {
    // console.log("name ok");
    // console.log(usernameValue);
    setSuccess(username);
  }

  // console.log(isValid);
  if (!isEmailValid(emailValue)) {
    setError(email, "Email không được để trống");
    isValid = false;
  } else {
    setSuccess(email);
  }

  // console.log(isValid);
  if (!isPhoneNumber(phoneValue)) {
    setError(phone, "Số điện thoại không được để trống");
    isValid = false;
  } else {
    setSuccess(phone);
  }

  // console.log(isValid);
  return isValid;
}

export function clearInputs() {
  // Làm sạch giá trị của các input trong form
  document.querySelector("#note").value = "";
  document.querySelector("#phone").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#username").value = "";
}

// tạo lỗi về thời gian yêu từ api
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Yêu cầu mất nhiều thời gian! Đã đợi hết ${s} giây`));
    }, s * 1000);
  });
};

const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    // tạo lỗi api
    if (!res.ok) throw new Error(`${res.status}`);

    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const postRegister = async function (data) {
  try {
    const id = window.location.host;

    const req = {
      FullName: data.fullName,
      Email: data.email,
      Phone: data.phone,
      Note: data.note,
      Link: id,
      ItemId: "g8S0FI_6",
    };
    const res = await AJAX(API_URL, req);
    clearInputs();
    showSuccessToast(
      "Thành công!",
      "Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất!"
    );
    // console.log(res);
  } catch (error) {
    showErrorToast("Lỗi!", "Hãy thử lại!");
    throw error;
  }
};

export function updateIcon() {
  const $navbarToggler = $(".navbar-toggler");
  const $iconUse = $navbarToggler.find("use");
  const isExpanded = $navbarToggler.attr("aria-expanded") === "true";

  $("body").css("overflow", isExpanded ? "hidden" : "auto");

  $iconUse.attr(
    "href",
    isExpanded ? "/img/icon.svg#icon-xmark" : "/img/icon.svg#icon-menu"
  );
}

export function backGoToTop() {
  const btnBackToTop = document.querySelector(".gototop");
  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 600) {
      btnBackToTop.style.transform = "translateY(0)";
    } else {
      btnBackToTop.style.transform = "translateY(75px)";
    }
  });
  btnBackToTop.addEventListener("click", () => {
    backToTop();
  });
}
