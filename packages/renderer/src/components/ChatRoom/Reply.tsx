import { Component, For, createMemo } from "solid-js"
import dayjs from "dayjs"
import calendar from 'dayjs/plugin/calendar'

import ImageComp from "@/components/Image/Image"

import { replyItem, replyItemPfp, replyItemContent, replyItemContentMsg, contentHeader, contentHeaderName, contentHeaderTime } from "./ChatRoom.module.scss"

export interface ReplyProps {
  msg: Message
}

dayjs.extend(calendar)

const Reply: Component<ReplyProps> = ({ msg }) => {
  const truncated = createMemo(() =>
    msg.sender.slice(0, 5) + '...' + msg.sender.slice(-5)
  )
  const msgParts = createMemo(() =>
    msg.message.split('\\n')
  )
  const time = createMemo(() => {
    const d = dayjs(msg.timestamp / 1000)
    return d.calendar(null, {
      sameDay: '[Today at] h:mm A', // The same day ( Today at 2:30 AM )
      nextDay: '[Tomorrow at] h:mm A', // The next day ( Tomorrow at 2:30 AM )
      nextWeek: 'dddd [at] h:mm A', // The next week ( Sunday at 2:30 AM )
      lastDay: '[Yesterday at] h:mm A', // The day before ( Yesterday at 2:30 AM )
      lastWeek: '[Last] dddd [at] h:mm A', // Last week ( Last Monday at 2:30 AM )
      sameElse: 'DD/MM/YYYY' // Everything else ( 17/10/2011 )
    })
  })
  return (
    <div class={replyItem}>
      <ImageComp className={replyItemPfp} src={msg.sender} title={msg.sender} />
      <div class={replyItemContent}>
        <div class={contentHeader}>
          <div class={contentHeaderName}>{truncated()}</div>
          <div class={contentHeaderTime}>{time()}</div>
        </div>
        <div class={replyItemContentMsg}>
          <For each={msgParts()}>
            {(part, i) => (
              <>{part}{i() < msgParts().length - 1 && <br />}</>
            )}
          </For>
        </div>
      </div>
    </div>
  )
}

export default Reply
