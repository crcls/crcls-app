/* @refresh reload */

// import { onMount } from "solid-js";
import { render } from "solid-js/web"
import App from "./app"

render(() => {
  return <App />
}, document.getElementById("root") as HTMLElement)
