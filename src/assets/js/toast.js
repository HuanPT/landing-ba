function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.querySelector("#toast");
  if (!main) return;

  const toast = document.createElement("div");
  toast.classList.add("toast", "show", `toast--${type}`);
  toast.style.animation = `slideDropDown ease 0.3s, fadeOut linear 1s ${(
    duration / 1000
  ).toFixed(2)}s forwards`;

  const icons = {
    success: "fa-solid fa-circle-check",
    info: "fa-solid fa-circle-info",
    warning: "fa-solid fa-circle-exclamation",
    error: "fa-solid fa-triangle-exclamation",
  };

  toast.innerHTML = `
    <div class="toast__icon">
      <i class="${icons[type]}"></i>
    </div>
    <div class="toast__body">
      <h3 class="toast__title">${title}</h3>
      <p class="toast__msg">${message}</p>
    </div>
    <div class="toast__close">
      <i class="fa-solid fa-xmark"></i>
    </div>
  `;

  const autoRemoveId = setTimeout(() => {
    main.removeChild(toast);
  }, duration + 1000);

  toast.addEventListener("click", (e) => {
    if (e.target.closest(".toast__close")) {
      main.removeChild(toast);
      clearTimeout(autoRemoveId);
    }
  });

  main.appendChild(toast);
}

export function showErrorToast(title, message) {
  toast({
    title: title ? `${title}` : "Lỗi!",
    message: message ? `${message}` : "",
    type: "error",
    duration: 2000, //bao lâu thì ẩn đi 3s
  });
}

export function showSuccessToast(title, message) {
  toast({
    title: title ? `${title}` : "Thành công!",
    message: message ? `${message}` : "",
    type: "success",
    duration: 2000, //bao lâu thì ẩn đi 3s
  });
}

export function showInfoToast(title, message) {
  toast({
    title: title ? `${title}` : "Thông tin!",
    message: message ? `${message}` : "",
    type: "info",
    duration: 2000, //bao lâu thì ẩn đi 3s
  });
}

export function showWarningToast(title, message) {
  toast({
    title: title ? `${title}` : "Cảnh báo!",
    message: message ? `${message}` : "",
    type: "warning",
    duration: 2000, //bao lâu thì ẩn đi 3s
  });
}

export function setError(input, message) {
  input.style.border = "thin solid #ff0000";
  input.nextElementSibling.innerHTML = message;
}

export function setSuccess(input) {
  input.style.border = "thin solid #47d864";
  input.nextElementSibling.innerHTML = "";
}
