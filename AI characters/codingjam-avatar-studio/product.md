# AI Avatar Generator — Product Design Doc

**Author:** Antigravity (PM)
**Status:** Draft v0.1
**Last updated:** 2026-07-08
**One-liner:** Turn a photo of your (or your pet's) face into a delightfully stylized avatar in seconds.

---

## 1. The user & the moment

- **Who:** Someone who wants a fun, fresh profile picture or a delightful image to share with friends, but doesn't have the time or skill to prompt an AI image generator from scratch.
- **When:** They are bored, feeling playful, or want to update their online identity. They have a photo of themselves or their pet readily available on their device.
- **Why now:** Generic AI art is everywhere, but a simple, one-click "make me look like a Pixar character" tool that *just works* without a complex prompting interface is still rare and magical.

## 2. The contract (I/O)

- **Input:** A single uploaded photo (validated client-side to ensure a face is visible) and a selection of one of four visual styles (e.g., Pixar, Anime).
- **Output:** A single, high-quality stylized avatar image.
- **The loop:** Upload photo → pick style → generate → view and share/download.

## 3. The magical moment

> "My cat looks exactly like a Pixar character, I have to send this to the group chat right now."

## 4. Scope: what we ARE building (v1)

- A clean, single-screen web interface to upload an image.
- Client-side face detection to ensure the uploaded photo is valid before sending it to the backend.
- A selector for exactly 4 distinct, highly-curated style presets.
- Integration with the Google Gemini API to generate the stylized avatar.
- A delightful loading state that builds anticipation.
- A simple result view with options to download or share the image.

## 5. Scope: what we are NOT building

- **No bulk generation** — We focus on one high-quality output at a time.
- **No animations or video** — Static images only; keeps the API integration and UI simple.
- **No character lore or text generation** — We are not building a chatbot or character sheets.
- **No auto-formatted social media sizes** — The user gets one standard aspect ratio.
- **No accounts or login** — Zero friction to get to the magical moment.
- **No complex prompting** — The user only clicks a preset style button; the prompt engineering happens behind the scenes.

## 6. The signature detail

The anticipation-building loading state. While Gemini processes the image, the UI shouldn't just show a spinner. It should show a playful, vibrant micro-animation (e.g., a "scanning" laser over the original photo, or a color-shifting glow) that makes the 3-5 second wait feel like a magical transformation is brewing, not a network delay.

## 7. Success: how we know it worked

- **Primary:** ≥30% of users who generate one avatar immediately generate a second one (either a different photo or a different style).
- **Secondary:** Share/Download button click rate > 50% for generated images.
- **What we're NOT measuring:** Time-in-app, total accounts created (since there are none).

## 8. Open questions

- [ ] Can client-side face detection run reliably and quickly across mobile and desktop browsers?
- [ ] What are the exact 4 style presets that yield the most consistently delightful results with the Gemini API?

## 9. Handoff

- **For UX:** The loading state is the most important part of the experience; it needs to turn the API latency into an exciting part of the magic trick.
- **For Eng:** Implementing reliable, lightweight client-side face detection is the biggest technical hurdle before the API call.
