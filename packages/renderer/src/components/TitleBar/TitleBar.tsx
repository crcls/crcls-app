import {
  titleBar,
  frameActions,
  frameActionsBtn,
  frameActionsBtnMin,
  frameActionsBtnMax,
  frameActionsBtnClose,
} from './TitleBar.module.scss'

const TitleBar = () => (
  <div class={titleBar}>
    <div class={frameActions}>
      <button class={`${frameActionsBtn} ${frameActionsBtnClose}`} onclick={window.frame.close}>
        <span class="sr-only">Close</span>
      </button>
      <button class={`${frameActionsBtn} ${frameActionsBtnMin}`} onClick={window.frame.minimize}>
        <span class="sr-only">Minimize</span>
      </button>
      <button class={`${frameActionsBtn} ${frameActionsBtnMax}`} onclick={window.frame.maximize}>
        <span class="sr-only">Maximize</span>
      </button>
    </div>
  </div>
)

export default TitleBar
