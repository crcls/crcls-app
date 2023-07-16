import { Component } from 'solid-js'

import { FaSolidCircleNotch } from 'solid-icons/fa'

import { icon, iconSpin } from './Icon.module.scss'
import { IconTypes } from 'solid-icons'

interface IconProps {
  name: string
  spin?: boolean
  size?: number
}

const icons = new Map<string, IconTypes>([['spinner', FaSolidCircleNotch]])

const Icon: Component<IconProps> = ({ name, size, spin }) => {
  const Comp = icons.get(name)

  return Comp !== undefined ? <Comp class={icon} classList={{ [iconSpin]: spin }} size={size} /> : null
}

export default Icon
