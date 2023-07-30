import { Component } from 'solid-js'

import { FaSolidCircleNotch } from 'solid-icons/fa'
import { BsChatFill } from 'solid-icons/bs'
import { RiArrowsArrowRightSFill } from 'solid-icons/ri'
import { TiArrowRightThick } from 'solid-icons/ti'

import { icon, iconSpin } from './Icon.module.scss'
import { IconTypes } from 'solid-icons'

interface IconProps {
  name: string
  spin?: boolean
  size?: number
}

const icons = new Map<string, IconTypes>([
  ['arrowRight', TiArrowRightThick],
  ['chat', BsChatFill],
  ['chevronRight', RiArrowsArrowRightSFill],
  ['spinner', FaSolidCircleNotch]
])

const Icon: Component<IconProps> = ({ name, size, spin }) => {
  const Comp = icons.get(name)

  return Comp !== undefined ? <Comp class={icon} classList={{ [iconSpin]: spin }} size={size} /> : null
}

export default Icon
