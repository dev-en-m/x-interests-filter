# X Interests Filter

Chrome extension. On the x.com home timeline (For you and Following), it hides every post that does not match your interest list.

## Install

1. Open `chrome://extensions` and turn on Developer mode.
2. Click "Load unpacked" and pick this folder.
3. Click the extension's toolbar icon and type your interests, one per line (`rust`, `startups`, `@karpathy`). The feed updates while you type.

## Matching

- Matches whole words or phrases, case-insensitive, in the post text, the quoted post, and the author's name and handle.
- `startup` does not match `startups`. Add both if you want both.
- An empty list shows everything.
- Posts with no text (media only) are hidden unless the author matches.
- Profiles, search, lists and threads are not filtered.
- On /home the left menu and right sidebar are hidden and the feed is centered (`panels.css`). Other pages keep them, so open a post to get navigation back.

## Test

`node test_match.js`

## Privacy

Your interest list is stored locally with `chrome.storage.local`. The extension makes no network requests and collects no data.

## License

[MIT](LICENSE.md)
