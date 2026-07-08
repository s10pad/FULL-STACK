# AI Avatar Generator — UX Design Doc

**Designer:** Antigravity (UX)
**Status:** Draft v0.1
**Last updated:** 2026-07-08

---

## 1. The design bet

We're betting that the loading state is actually the core product experience. By transforming the API wait time from a boring spinner into a magical, anticipation-building sequence, we can get away with a single, dead-simple screen. 80% of our design effort goes into the micro-interactions of the upload and loading phases; the rest is just framing.

## 2. The defining interaction

User selects a photo and taps one of the four style buttons. The style button does a satisfying, tactile press-down. The uploaded photo instantly locks in place, and a vibrant, color-shifting "scanning laser" effect sweeps down over the image. The UI dims slightly, placing all focus on the scanning effect. After ~3-5 seconds, the scanning laser flashes bright white, and the new stylized avatar snaps into place with a subtle "pop" animation and a satisfying settle. Feels like: a futuristic polaroid developing instantly.

## 3. Screen inventory

- **Main Studio Screen** — Upload, select style, generate, and view/share the avatar.

## 4. Screen-by-screen specs

### Main Studio Screen

**Purpose:** The single surface for the entire avatar generation loop.

**Layout (top to bottom):**
1. **Header** — Minimalist title ("Avatar Studio") and a subtle gradient underline.
2. **Hero Image Area** — A large, square drop-zone/preview area.
3. **Action Bar (Style Presets)** — A horizontal row of 4 prominent, distinct buttons for the styles (e.g., Pixar, Anime, Cyberpunk, Watercolor). # Make it 5. Add grimdark style, reminiscent of warhammer
4. **Post-Generation Actions** — (Hidden until generation completes) "Download" and "Share" buttons beneath the image.

**Key interactions:**
- Tap/Drop in Hero Area → Opens file picker / accepts dropped image.
- Tap Style Button (with image loaded) → Triggers the defining generation interaction.
- Tap Style Button (without image loaded) → Jiggles the Hero Image Area to prompt upload.

**States:**
- **Default (Empty):** Hero area shows a soft dashed border and a playful "Drop a face here" prompt with a subtle breathing animation. Style buttons are visible but slightly desaturated.
- **Image Uploaded:** The user's photo fills the Hero Area. Style buttons fully saturate and pulse once to invite a click.
- **Loading (Generating):** The defining "scanning laser" animation runs over the photo. Style buttons are disabled and visually recessed.
- **Success:** The new avatar replaces the original photo. The "Download" and "Share" buttons slide up smoothly from below the image.
- **Error:** If no face is detected client-side, the Hero Area flashes a soft red border and says "Oops! We need a clear face to work our magic." The original state is restored.

## 5. The user journey

User opens the app and sees a clean, inviting screen with a pulsing "Drop a face here" box. They tap it, select a selfie from their camera roll, and the photo snaps into the box perfectly cropped to a square. The four style buttons below light up in vibrant colors. 

They tap the "Pixar" button. It presses down with a satisfying click. A glowing laser sweeps across their selfie, making it feel like it's being actively scanned by something high-tech. They wait 4 seconds. Suddenly, a bright flash occurs, and their face is now a 3D Pixar character. They smile, tap the "Share" button that just slid into view, and immediately text it to their friends. 

When they close the share sheet, the UI is still on their generated avatar. They can tap another style button to instantly re-run the magic on the same photo.

## 6. Component & visual notes

- **Typography:** Modern, rounded sans-serif (e.g., 'Nunito' or 'Outfit'). Friendly but clean.
- **Color:** Dark mode by default to make the images and laser effects pop. Deep slate backgrounds with vibrant neon accents (cyan, magenta) for the styles.
- **Motion:** Everything is fluid and springy. The style buttons should feel like premium mechanical keyboard switches when pressed.
- **The signature visual:** The scanning laser during generation. It must look like light interacting with the photo, not just a solid line moving down.
- **Microcopy voice:** Playful and direct. "Drop a face here" instead of "Upload an image." "Working magic..." during generation.

## 7. Accessibility & inclusion

- **Screen readers:** The upload zone and style buttons will have clear `aria-labels` describing the visual styles.
- **Motor difficulties:** The style buttons are massive, full-width or large-grid tap targets. No precise dragging or cropping required.
- **Bandwidth:** The client-side face detection saves users on slow connections from uploading invalid images and waiting for API failures.

## 8. What we are NOT designing

- **No image cropping/editing tools** — The app auto-crops to a square (object-fit: cover) and centers it. We aren't building Photoshop.
- **No gallery or history view** — The user downloads it or loses it. Keeps the UI strictly single-purpose.
- **No settings screen** — There is nothing to configure.
- **No sidebars or hamburger menus** — The entire app is the main screen.

## 9. Open design questions

- [ ] What exactly are the 4 styles we are offering? We need distinct visual icons/colors for each button.
- [ ] How do we visually handle the "Share" button on desktop browsers where native sharing isn't always supported? (Fallback to "Copy Image"?)

## 10. Handoff to engineering

The "scanning laser" loading state is the moment of magic — it needs to be perfectly synced with the API call and transition seamlessly into the final image reveal. 

Additionally, we need a lightweight, reliable client-side face detection library (like face-api.js or mediapipe) that won't bloat the initial page load time.
