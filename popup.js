const box = document.getElementById('interests')
chrome.storage.local.get({ interests: '' }, ({ interests }) => { box.value = interests })
box.addEventListener('input', () => chrome.storage.local.set({ interests: box.value }))
