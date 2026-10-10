# Production plan

Goal: publish Interests Filter for X on the Chrome Web Store (and Edge Add-ons, which accepts the same package).

## 1. Fix before release

- [x] **Fail open when X changes its markup.** Today, if X renames `data-testid="tweetText"` and `data-testid="User-Name"` but keeps `article[data-testid="tweet"]`, every post's text is empty, nothing matches, and the whole feed is hidden. `content.js` now shows the post when neither element is found, so a markup change makes the filter stop working instead of blanking the feed.
- [x] **Name.** Store policy rejects listings that look like they come from another company, so the extension is now "Interests Filter for X" (`manifest.json` and README). The repo keeps the name `x-interests-filter`.
- [x] **Say in the description that the side panels are hidden.** `panels.css` hides X's left menu and right sidebar on /home. Users who don't know this will think the extension broke X. Covered in the store description below.

## 2. Store listing

- [x] Icons: 16, 32, 48 and 128 px in `icons/`. The 128 px icon follows the store guideline of 96 px artwork with 16 px of transparent padding.
- [ ] At least one screenshot, 1280x800 or 640x400: the filtered feed next to the popup with a few interests filled in.
- [ ] Small promo tile, 440x280.
- [x] Short description (max 132 characters): taken from `manifest.json`.
- [x] Long description, ready to paste:

  > See only the posts you care about on your X home timeline.
  >
  > Type your interests in the toolbar popup, one per line (for example `rust`, `startups`, `@karpathy`). Posts on For you and Following that don't mention any of them are hidden. The feed updates as you type.
  >
  > How matching works:
  > • Whole words or phrases, case-insensitive, in the post, the quoted post, and the author's name and handle.
  > • "startup" does not match "startups". Add both if you want both.
  > • An empty list shows everything.
  > • Posts with only images or video are hidden unless the author matches.
  >
  > On the home timeline, X's left menu and right sidebar are hidden so the feed is centered. Open any post or profile to get them back. Profiles, search, lists and threads are never filtered.
  >
  > Privacy: your list is saved in your browser only. The extension makes no network requests and collects no data.
  >
  > Not affiliated with X Corp.
- [ ] Category: Productivity (alternatively Social & Communication).

## 3. Privacy tab (required for review)

- **Single purpose:** "Hides posts on the x.com home timeline that do not match a list of interests the user enters."
- **`storage` justification:** "Saves the user's interest list locally."
- **Host permission justification (`x.com`, `twitter.com`):** "The content script reads post text on the home timeline to decide which posts to hide. Nothing is sent anywhere."
- **Data use:** no data collected, no remote code.
- **Privacy policy URL:** link to the Privacy section of the README on GitHub.

## 4. Package and submit

- [ ] One-time: register a Chrome Web Store developer account ($5 fee, 2-step verification required).
- [ ] Bump `version` in `manifest.json` for every upload. The store rejects a version number it has already seen.
- [ ] Build the zip from runtime files only:
  ```sh
  node test_match.js && zip -r x-interests-filter.zip manifest.json content.js match.js panels.css popup.html popup.js icons
  ```
- [ ] Load the zip contents unpacked one last time and smoke test (section 5).
- [ ] Upload, fill in the listing and the privacy tab, then submit. Review usually takes a few days; host permissions can make it take longer.
- [ ] Tag the release (`git tag v0.1.0 && git push --tags`) and attach the zip to a GitHub release.

## 5. Smoke test (before every release, and weekly after launch)

1. Empty interest list: the feed shows everything.
2. Add `rust`: only matching posts stay, on both For you and Following.
3. Add `@someone`: that account's posts show, including media-only ones.
4. Open a profile, search or a post thread: nothing is filtered and the side panels are back.
5. Scroll far down: new posts are filtered as they load.
6. Edit the list in the popup: the feed updates without a reload.

## 6. After launch

- X changes its markup without warning, and that is the main way this extension breaks. Run the smoke test weekly and watch store reviews and GitHub issues.
- Later, if needed: a GitHub Action that runs `node test_match.js` and builds the zip on each tag; a Firefox build (needs `browser_specific_settings` in the manifest).
