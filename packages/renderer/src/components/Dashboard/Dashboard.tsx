import { For, createMemo, useContext } from "solid-js"

import { AppContext } from "@/App"
import ImageComp from "@/components/Image/Image"

import { dashboard, profile, profileDetails, profilePfp, address, circlesCont, circlesContList, newCircle, newCirclePlus, noDataMsg } from "./Dashboard.module.scss"

const Dashboard = () => {
  const { account, circles } = useContext(AppContext)
  const truncatedAddress = createMemo(() => account?.valueOrDie.address.slice(0, 4) + '...' + account?.valueOrDie.address.slice(-4))

  if (account === undefined) {
    return null
  }

  return (
    <section class={dashboard}>
      <section class={profile}>
        <div class={profilePfp}>
          <ImageComp src={account.valueOrDie.pfp} title={account.valueOrDie.handle ?? account.valueOrDie.address} />
        </div>
        <div class={profileDetails}>
          <h2>{account.valueOrDie.handle ?? "Anon"}</h2>
          <div class={address} title={account.valueOrDie.address}>
            {truncatedAddress()}
          </div>
        </div>
      </section>
      <section class={circlesCont}>
        <header>
          <h5>Circles Joined: {circles.valueOrDie.length}</h5>
          <button class={newCircle}>Create a new Circle <span class={newCirclePlus}>+</span></button>
        </header>
        <div class={circlesContList}>
          <For each={circles.valueOrDie} fallback={<div class={noDataMsg}>No Circles available.</div>}>
            {(circle) => (
              <div>
                <ImageComp src={circle.logo} title={circle.name ?? circle.id} />
              </div>
            )}
          </For>
        </div>
      </section>
    </section>
  )
}

export default Dashboard
