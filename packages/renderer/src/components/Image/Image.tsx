import { Component, createResource } from 'solid-js'

import Icon from '@/components/Icon/Icon'
import DefaultProfile from '@/assets/default-profile.png'

interface ImageProps {
  className?: string
  src: string
  loading?: 'eager' | 'lazy'
  title: string
  alt?: string
  width?: number
  height?: number
}

function LoadImage(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      resolve(img.src)
    }
    img.onerror = () => {
      resolve(DefaultProfile)
    }
    img.src = src
  })
}

const ImageComp: Component<ImageProps> = ({ className, src, title, alt, width, height, loading = 'lazy' }) => {
  const [imageSrc] = createResource<string>(() => LoadImage(src))

  return imageSrc() !== undefined ? (
    <>
      <Icon name="spinner" spin />
      {imageSrc.loading}
      {imageSrc.state}
    </>
  ) : (
    <img
      loading={loading}
      class={className}
      src={DefaultProfile}
      alt={alt}
      title={title}
      width={width}
      height={height}
    />
  )
}

export default ImageComp
