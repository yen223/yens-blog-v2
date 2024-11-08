---
title: "A bizarre Google Keyboard bug"
slug: "a-bizarre-google-keyboard-bug"
date: "2024-11-08"
published: true
tags:
  - Android
  - Google Keyboard
description: "This article is about a weird Google keyboard bug on Android."
---

There's a subtle bug that happens when you're using Gboard (the Google keyboard) on Android on certain websites. Watch what happens after I type `test` into the [Guardian crossword app](https://www.theguardian.com/crosswords/cryptic/29529), and try to delete the word:

{% video src="/videos/guardian-crossword-bug.mp4" caption="The bug in the Guardian crossword" /%}

In case you missed it, **after typing T-E-S-T, I have to press `Backspace` 4 times before letters start getting deleted.**

This isn't limited to the Guardian crossword. This also happens in the [Typescript playground](https://www.typescriptlang.org/play/):

{% video src="/videos/typescript-playground-bug.mp4" caption="The bug in the Typescript playground" /%}

But this does not happen everywhere. Here are backspaces working as expected in a plain HTML input field:

{% video src="/videos/normal-text-box.mp4" caption="Backspaces working as expected in a plain HTML input field" /%}

This does not happen with iOS keyboards, or with Gboard on iOS. This appears to be specific to Gboard on Android.

## The bug

The cause of the bug is that **Gboard doesn't issue the correct keyCode in its keydown/keypress/keyup events.**

I've built a [keyboard events viewer](/projects/key-event-viewer) to help illustrate the issue.

Normally, when you type a letter e.g. 't', the browser should fire a [keydown](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event) event with keyCode `84`, and then a [keyup](https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event) event with keyCode `84`. Typing a backspace is similar, except the keyCode is `8`.

{% video src="/videos/desktop-events.mp4" caption="This is on Chrome 130, macOS 15" /%}

However, Gboard has a peculiar behaviour where when it's generating autocomplete suggestions, backspaces *always* have keyCode `229` - `Unidentified`. But once it's not generating suggestions, backspaces have the correct keyCode `8`.

{% video src="/videos/gboard-events.mp4" caption="Keyboard events in Gboard" /%}

This breaks any code that listens for any specific keyCode, e.g. if it's listening for the Backspace key by listening for keyCode `8`. This is also why backspaces worked after pressing it 4 times - once the word "test" was cleared from the autocomplete suggestions, the correct keyCode `8`was fired

### Is this a problem with Gboard, or with the browser?

I'm not entirely sure to be honest. The same bug happens on Chrome on Android, and on Firefox on Android, but they appear to manifest in different ways.

In Chrome, *all letters* have keyCode `229`. In Firefox, typing letters generate the correct keyCode, but backspaces still have keyCode `229`, but with keyname `Process`.

Given that the one common denominator is Gboard, I'm inclined to think it's a problem with Gboard.

### Why does this happen?

Honestly, I do not know. If you are a developer for Gboard, and you happen to read this, any insight would be appreciated!

## The solution

If you need to listen for the `Backspace` key specifically, the best workaround appears to be to listen to the `beforeinput` event on the input element, and check if the `inputType` is `deleteContentBackward`.

```js
let input = document.querySelector('input');
input.addEventListener('beforeinput', (event) => {
    if (event.inputType === 'deleteContentBackward') {
        // Handle backspace
    }
});
```

Note that if you are using React, there is [yet another problem](https://github.com/facebook/react/issues/11211). The `onBeforeInput` synthetic event doesn't contain the `inputType` property. Fortunately the workaround here is relatively straightforward - avoid using the `onBeforeInput` event handler on the input element, and instead manually subscribe to the `beforeinput` using `addEventListener`, e.g.

```tsx
const ref = useRef<HTMLInputElement>(null);

useEffect(() => {
    const listener = (event: InputEvent) => {
        if (event.inputType === 'deleteContentBackward') {
            // Handle backspace
        }
    }
    ref.current?.addEventListener('beforeinput', listener);
    return () => ref.current?.removeEventListener('beforeinput', listener);
}, []);

return <input ref={ref} />
```

If you want to listen to specific letters, you can try and use the `data` prop in the `beforeinput` event.