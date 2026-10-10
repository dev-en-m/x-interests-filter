let matches = () => true

const load = interests => {
  matches = makeMatcher(interests.split('\n'))
  run()
}
chrome.storage.local.get({ interests: '' }, ({ interests }) => load(interests))
chrome.storage.onChanged.addListener(changes => {
  if (changes.interests) load(changes.interests.newValue || '')
})

function run() {
  // ponytail: home timeline only (For you + Following); profiles, search and threads stay unfiltered.
  const on = location.pathname === '/home'
  document.documentElement.classList.toggle('xif-home', on) // hides side panels, see panels.css
  for (const tweet of document.querySelectorAll('article[data-testid="tweet"]')) {
    const cell = tweet.closest('[data-testid="cellInnerDiv"]')
    if (!cell) continue
    // Post text, quoted post text, and author name/handle, so "@someone" works as an interest.
    const text = [...tweet.querySelectorAll('[data-testid="tweetText"], [data-testid="User-Name"]')]
      .map(e => e.textContent)
      .join(' ')
    if (!on || matches(text)) cell.style.removeProperty('display')
    else cell.style.setProperty('display', 'none', 'important')
  }
}

// X renders the timeline lazily and recycles cells, so re-check every batch of DOM changes.
let queued = false
new MutationObserver(() => {
  if (queued) return
  queued = true
  requestAnimationFrame(() => {
    queued = false
    run()
  })
}).observe(document.body, { childList: true, subtree: true })
