/* @refresh reload */

// import { onMount } from "solid-js";
import { render } from "solid-js/web"

import '@/ipc/core'
import App from "./App"

import './main.global.scss'

render(() => {
  return <App />
}, document.getElementById("root") as HTMLElement)
