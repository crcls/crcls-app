import { useContext } from "solid-js"
import { totalUsd, walletSection } from "./Wallet.module.scss"
import { AppContext } from "@/App"
import { formatCurrency } from "@/utils/format"

const Wallet = () => {
  const { account } = useContext(AppContext)
  if (account === undefined) return null

  return (
    <section class={walletSection}>
      <h2 class={totalUsd}>
        <small>USD</small>
        <span>{formatCurrency(account.vod.balance)}</span>
      </h2>
    </section>
  )
}

export default Wallet
