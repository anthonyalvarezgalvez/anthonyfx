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

document.querySelectorAll(".video-facade").forEach((facade) => {
  facade.addEventListener("click", (event) => {
    event.preventDefault();

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${facade.dataset.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    iframe.title = facade.dataset.videoTitle;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;

    facade.parentElement.replaceChildren(iframe);
  });
});
