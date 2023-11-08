import "@css/style.css";
import "aos/dist/aos.css";
import AOS from "aos";
import "@fortawesome/fontawesome-free/js/all.min.js";
import { Fancybox } from "@fancyapps/ui";

import "bootstrap/dist/js/bootstrap.bundle";
import {
  backGoToTop,
  checkInputs,
  isEmailValid,
  isPhoneNumber,
  postRegister,
  updateIcon,
} from "./helpers";
import { setError, setSuccess, showErrorToast } from "./toast";
import { viewTeachers } from "./view/viewTeachers";
import { teacher } from "./fakeApiTeachers";

var bootstrapButton = $.fn.button.noConflict(); // return $.fn.button to previously assigned value
$.fn.bootstrapBtn = bootstrapButton; // give $().bootstrapBtn the Bootstrap functionality

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
  // viewTeachers
  viewTeachers(teacher);
  // Scroll active navbar
  $(window).on("scroll", function () {
    const scrollPosition = $(this).scrollTop();

    $navbarLinks.each(function () {
      const target = $($(this).attr("href"));
      const targetPosition = target.offset().top - 40;
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

  // Click hidden navbar mobile
  $navbarLinks.on("click", function () {
    if (window.innerWidth < 992) {
      $navbarToggler.click();
      updateIcon();
    }
  });

  // // Toggle icon
  $navbarToggler.on("click", function () {
    updateIcon();
  });

  checkErr(email, "Email không đúng");
  checkErr(phone, "Số điện thoại không đúng");
  checkErr(username, "Tên không được để trống");

  addHandlerSubmit(form, postRegister);

  backGoToTop();

  Fancybox.bind();
  AOS.init();
});
