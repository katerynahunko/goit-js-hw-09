!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),o=document.querySelector("body"),n=0;t.addEventListener("click",(function(){n=setInterval((function(){o.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3),t.disabled=!0})),e.addEventListener("click",(function(){clearInterval(n),o.style.backgroundColor="#ffffff",t.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.0c51d3ca.js.map
