if (window.location.protocol === "file:") {
  document.documentElement.classList.add("file-mode");

  const warning = document.createElement("div");
  warning.className = "local-warning";
  warning.setAttribute("role", "alert");
  warning.innerHTML = `
    <strong>Esta página necesita el servidor local.</strong>
    <span>Cierra esta pestaña y abre <b>ABRIR-PORTFOLIO.bat</b>. No abras index.html directamente.</span>
  `;
  document.body.prepend(warning);
}
