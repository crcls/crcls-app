import { Component, createMemo } from 'solid-js'
import ImageComp from '@/components/Image/Image'
import {
  accountManager,
  accountManagerOpen,
  accountPfp,
  circlePicker,
  circlePickerCont,
  contentPanel,
  profile,
  profilePfp,
  tokenDetail,
  tokenDetailLogo,
  tokenDetailName,
  tokenItem,
  wallet,
  walletAddress,
  walletBalance,
  walletCoins,
} from './AccountManager.module.scss'
import { useSignal } from '@/hooks/signals'

interface AccountManagerProps {
  account: Account
}

const AccountManager: Component<AccountManagerProps> = ({ account }) => {
  const isOpen = useSignal(false)
  const truncatedAddress = createMemo(() => account.address.slice(0, 5) + '...' + account.address.slice(-4))

  const toggleOpen = () => {
    isOpen.value = !isOpen.value
  }

  return (
    <section class={accountManager} classList={{ [accountManagerOpen]: isOpen.value }}>
      <div class={circlePicker}>
        <div class={circlePickerCont}>
          <button onClick={toggleOpen}>
            <ImageComp className={accountPfp} src={account.pfp} title={account.handle ?? account.address} />
          </button>
        </div>
      </div>
      <div class={contentPanel}>
        <div class={profile}>
          <div class={profilePfp}>
            <ImageComp src={account.pfp} title={account.handle ?? account.address} />
          </div>
        </div>
        <div class={wallet}>
          <div class={walletBalance}>
            <h2>${account.balance.toFixed(2)}</h2>
          </div>
          <div class={walletAddress} title={account.address}>
            {truncatedAddress()}
          </div>
          <table class={walletCoins}>
            <tbody>
              <tr class={tokenItem}>
                <td>
                  <div class={tokenDetail}>
                    <img class={tokenDetailLogo} src="https://cryptologos.cc/logos/polygon-matic-logo.svg" />
                    <span class={tokenDetailName}>MATIC</span>
                  </div>
                </td>
                <td>
                  <div class={tokenDetail}>{account.balance}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default AccountManager
