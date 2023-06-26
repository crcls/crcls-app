import CRCLSLogo from '@/assets/crcls-logo-dark.svg'

import { mainHeader } from './Header.module.scss'

const Header = () => (
  <header class={mainHeader}>
    <CRCLSLogo />
    <h1 class="sr-only">CRCLS Chat</h1>
  </header>
)

export default Header
