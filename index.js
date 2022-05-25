let colorSchemeMode = document.getElementById("color-scheme-mode").value;

function getColor() {
  let seedColor = document.getElementById("seed-color").value;
  return seedColor.replace("#", "");
}

function render(hex, mode) {
  //   console.log(hex, mode);
  let url = `https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}`;
  //   console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((scheme) => {
      const colorsArr = scheme.colors
        .map((color) => {
          let hexColor = color.hex.value;
          return `
          <div class="col">
          <div class="color" style="background-color: ${hexColor}"></div>
          <button class="copy-btn" id="copy-btn" onclick="updateClipboard('${hexColor}')">
          <p class="color-text" id="hex-color">${hexColor}</p>
          <p class="hover-btn" id="${hexColor}-tooltip">Copy text</p>
          </button>
        </div>
        `;
        })
        .join("");
      document.getElementById("color-scheme-div").innerHTML = colorsArr;
    });
}

function updateClipboard(newClip) {
  console.log(newClip);
  navigator.clipboard.writeText(newClip).then(
    function () {
      const tooltip = document.getElementById(newClip + "-tooltip");
      tooltip.textContent = "Copied!";

      var temp = setInterval(function () {
        tooltip.textContent = "Copy text";
        clearInterval(temp);
      }, 2000);
    },
    function () {
      console.info("color could not be copied!");
    }
  );
}

// Render color scheme on page load

render(getColor(), colorSchemeMode);

// Render new scheme on btn click

document.getElementById("color-form").addEventListener("submit", (e) => {
  // Prevent browser  from reloading on form submission
  e.preventDefault(0);

  // Get current color hex value
  let hexColor = getColor();

  // Get current color scheme mode
  let colorSchemeMode = document.getElementById("color-scheme-mode").value;

  // Render new Scheme
  render(hexColor, colorSchemeMode);
});
