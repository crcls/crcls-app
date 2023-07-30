import { Component } from 'solid-js'
import { loader, loaderFadeOut } from './Loader.module.scss'

interface LoaderProps {
  fadeOut?: boolean
}

const Loader: Component<LoaderProps> = ({ fadeOut }) => (
  <div class={loader} classList={{ [loaderFadeOut]: fadeOut }}>Loading...</div>
)

export default Loader
