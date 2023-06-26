import { Component } from "solid-js"

import './App.global.scss'
import Header from "./components/Header"
import ChatRoom from "./components/ChatRoom"

const App: Component = () => (
  <>
    <Header />
    <ChatRoom />
  </>
)

export default App
