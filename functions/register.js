const uuid = require('uuid').v4
const path = require('path').resolve()
const randStr = require('crypto-random-string')
const { existsSync, mkdirSync, writeFileSync, readFileSync } = require('fs')

// --- Authing

const auth = []

function createAuth () {
  const uid = uuid()
  auth.push(uid)
  return uid
}

function useAuth (uid) {
  if (!auth.includes(uid)) return false
  else auth[auth.indexOf(uid)] = null; return true
}

module.exports.createAuth = createAuth
module.exports.useAuth = useAuth

// --- Counting

if (!existsSync(path + '/data/')) mkdirSync(path + '/data')
if (!existsSync(path + '/data/counts.json')) writeFileSync(path + '/data/counts.json', 0)
let count = readFileSync(path + '/data/counts.json').toString('utf-8')

function addCount (c) {
  if (c) count += c
  else count++
}

function getCount () {
  return count
}

module.exports.addCount = addCount
module.exports.getCount = getCount

// --- Embed Registing

if (!existsSync(path + '/data/')) mkdirSync(path + '/data')
if (!existsSync(path + '/data/embeds.json')) writeFileSync(path + '/data/embeds.json', '{}')
let embeds = JSON.parse(readFileSync(path + '/data/embeds.json').toString('utf-8'))

function addEmbed (obj) {
  const eid = randStr({ length: 10, type: 'url-safe' })
  embeds[eid] = obj
  return eid
}

function getEmbed (eid) {
  if (!Object.keys(embeds).includes(eid)) return { success: false, reason: 'Embed Handle) Embed Not Found' }
  else return { success: true, data: embeds[eid] }
}

function embCount () {
  return Object.keys(embeds).length
}

module.exports.addEmbed = addEmbed
module.exports.getEmbed = getEmbed
module.exports.embCount = embCount

// --- Cooldown

const coolList = []

function cooldown (ip) {
  const res = coolList.includes(ip)
  coolList.push(ip)
  setTimeout(() => {
    coolList[coolList.indexOf(ip)] = null
  })
  return res
}

module.exports.cooldown = cooldown

// --- Saving

setInterval(() => {
  writeFileSync(path + '/data/counts.json', count)
  writeFileSync(path + '/data/embeds.json', JSON.stringify(embeds))
}, 10000)
