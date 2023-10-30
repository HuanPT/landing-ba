import "@css/style.css";
import "aos/dist/aos.css";
import AOS from "aos";
import "@fortawesome/fontawesome-free/js/all.min.js";
import { Fancybox } from "@fancyapps/ui";

import javascriptLogo from "../../public/img/javascript.svg";
import viteLogo from "../../public/img/vite.svg";
import { setupCounter } from "@js/counter.js";

import "bootstrap/dist/js/bootstrap.bundle";
import {
  checkInputs,
  isEmailValid,
  isPhoneNumber,
  postRegister,
} from "./helpers";
import { setError, setSuccess, showErrorToast } from "./toast";

var bootstrapButton = $.fn.button.noConflict(); // return $.fn.button to previously assigned value
$.fn.bootstrapBtn = bootstrapButton; // give $().bootstrapBtn the Bootstrap functionality

// document.querySelector("#app").innerHTML += `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `;

const trackID = "";
const form = document.querySelector("form");
const note = document.querySelector("#note");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const username = document.querySelector("#username");

const checkErr = (input, message) => {
  const validationFunc = () => {
    let isValid = false;
    let value = input.value.trim();
    if (input.id === "email") {
      isValid = isEmailValid(value);
    } else if (input.id === "phone") {
      isValid = isPhoneNumber(value);
    } else if (input.id === "username") {
      isValid = value !== "";
    }
    if (isValid) {
      setSuccess(input);
    } else {
      setError(input, message);
    }
  };
  input.addEventListener("blur", validationFunc);
};

function addHandlerSubmit(form, handler) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const isFormValid = checkInputs(username, email, phone);
    if (isFormValid) {
      const dataArr = new FormData(form);
      const data = Object.fromEntries(dataArr);
      handler(data);
    } else {
      showErrorToast("Đăng ký không thành công", "");
    }
  });
}

const $navbarLinks = $(".navbar-nav>li>a");
const $navbarToggler = $(".navbar-toggler");

window.addEventListener("load", () => {
  // Scroll active navbar
  $(window).on("scroll", function () {
    const scrollPosition = $(this).scrollTop();

    $navbarLinks.each(function () {
      const target = $($(this).attr("href"));
      const targetPosition = target.offset().top - 1;
      const targetHeight = target.outerHeight();

      if (
        targetPosition <= scrollPosition &&
        targetPosition + targetHeight > scrollPosition
      ) {
        $navbarLinks.removeClass("active");
        $(this).addClass("active");
      }
    });
  });
  checkErr(email, "Email không đúng");
  checkErr(phone, "Số điện thoại không đúng");
  checkErr(username, "Tên không được để trống");

  addHandlerSubmit(form, postRegister);

  Fancybox.bind();
  AOS.init();
});
