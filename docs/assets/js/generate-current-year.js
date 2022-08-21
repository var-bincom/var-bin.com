const generateCurrentYear = () => {
  const el = document.getElementById("currentYear");
  const currentDate = new Date();

  el.innerHTML = currentDate.getUTCFullYear();
};
