import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { ipcMain } from 'electron'
import path from 'path'

import { win } from './window'

let converse: ChildProcessWithoutNullStreams
let status: 'running' | 'closing'
let restarts: number[] = []
let restartCount = 0

const MAX_RESTARTS = 5
const TIME_FRAME = 5000
const INITIAL_TIMEOUT = 1000
const MAX_TIMEOUT = 60000

export function startConverse(): Promise<void> {
  return new Promise((resolve, reject) => {
    const now = Date.now()
    if (restarts.length >= MAX_RESTARTS && (now - restarts[0]) < TIME_FRAME) {
      console.log('Too many recent restarts, not starting CLI app')
      reject()
      return
    }

    restarts.push(now)
    while (restarts.length > 0 && (now - restarts[0]) > TIME_FRAME) {
      restarts.shift()
    }
    restartCount++

    const timeout = Math.min(INITIAL_TIMEOUT * Math.pow(2, restartCount), MAX_TIMEOUT);
    console.log(`Waiting ${timeout}ms before restarting CLI app...`)

    setTimeout(() => {
      converse = spawn(process.env.CONVERSE!, ['-logfile', path.resolve('~', '.crcls', 'logs', '0000000.log')], { env: process.env })

      converse.stdout.on('data', (data) => {
        // console.log('Converse data: ', data.toString())
        // Send data to the frontend
        const msg = JSON.parse(data)
        console.log('parsed', msg)
        win?.webContents.send(msg.type, msg)
      })

      converse.stderr.on('data', (data) => {
        console.error(`CLI app stderr: ${data}`)
      })

      converse.on('close', (code) => {
        if (code !== 0) {
          console.log(`CLI app process exited with code ${code}`)

          if (status === 'running') {
            console.log('Restarting converse.')
            startConverse()
          }
        }
      })

      status = 'running'
      resolve()
    }, timeout)
  })
}

export function stopConverse() {
  status = 'closing'
  converse.disconnect()
  converse.kill()
}

ipcMain.on('command', (_, command) => {
  console.log('sending cmd: ', command)
  converse.stdin.write(command + '\n')
})