// Returns text => bool. Each interest matches as a whole word/phrase, case-insensitive.
// No interests = everything matches, so an empty list never blanks the feed.
function makeMatcher(lines) {
  const words = lines.map(s => s.trim()).filter(Boolean)
  if (!words.length) return () => true
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  // Letter/digit lookarounds instead of \b, so "c++", "#rust" and "F1" work too.
  const re = new RegExp(`(?<![\\p{L}\\p{N}])(?:${words.map(esc).join('|')})(?![\\p{L}\\p{N}])`, 'iu')
  return text => re.test(text)
}

if (typeof module !== 'undefined') module.exports = makeMatcher
