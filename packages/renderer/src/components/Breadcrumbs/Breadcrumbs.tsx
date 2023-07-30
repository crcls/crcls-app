import { Component, For, createMemo, useContext } from "solid-js"

import { AppContext } from "@/App"
import { breadcrumbNav, crumbLink } from "./Breadcrumbs.module.scss"

interface CrumbLinkProps {
  to: string[]
}

const CrumbLink: Component<CrumbLinkProps> = ({ to }) => {
  const { path } = useContext(AppContext)
  const lastPath = createMemo(() => to.length > 1 ? to[to.length - 1] : to[0])

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    path.value = to
  }

  return <>{"/"} <a class={crumbLink} href={`/${to.join('/')}`} title={lastPath()} onClick={handleClick}>{lastPath()}</a></>
}

interface BreadcrumbsProps {
  className?: string
}

const Breadcrumbs: Component<BreadcrumbsProps> = ({ className }) => {
  const { path } = useContext(AppContext)

  return (
    <nav class={breadcrumbNav} classList={{ [className ?? '']: Boolean(className) }}>
      <For each={path.valueOrDie} fallback={<CrumbLink to={['crcls']} />}>
        {(_, i) => {
          return (<CrumbLink to={path.valueOrDie.slice(0, path.valueOrDie.length - i())} />)
        }}
      </For>
    </nav>
  )
}

export default Breadcrumbs
