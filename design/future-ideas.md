# Future ideas (not core, just for fun)

Parked so they don't get lost. Build the core pages first.

## Site plan (agreed)

| Page | Style | Menu name on home |
|---|---|---|
| Home | Game title screen: logo, one-line intro, character, "Press Start", main menu | - |
| Projects | PS2 shelf, TV + manual (done) | Start Game |
| About | PS2 memory card: each memory is a "save" (schools, club, jams, hobbies, photo albums) | Load Save |
| Experience | PS3 XMB; phones get the picker-wheel list | Career Mode |
| Contact | Controller: face buttons are contact links, START opens the message form | Multiplayer |
| Extras | Character select + trophies (below) | Extras (locked for now) |

Shared piece: one full-screen **detail screen** (blurred background, title over a thin line, content in the middle, Back at the bottom; like the PSN sign-in screen). Used by XMB items, memory card saves and the contact form ("Sending... Please wait.").

Build order: detail screen -> XMB Experience -> memory card About -> controller Contact -> title screen Home.

### XMB on phones
- Tap the left/right half of the category row to switch category; swipe and tapping icons also work.
- First visit: both halves show a hint; each hint disappears after it's used once (remember per browser).
- Item list scrolls freely with momentum. The highlight changes live to whichever item crosses the highlight slot; the list settles on the nearest item when released.
- Items before the highlighted one sit above the category row.

### Memory card on About
- Desktop: no text under icons, hover selects, click opens. Phones: name under each icon, one tap opens.
- 2D images tilted back 30° in the grid. Selected save gets a white dot; its title shows top right in gold (desktop). Own glass panel, not the PS2 background. Filter: All, Education, Hard skills, Soft skills, Events.
- Opening one: black glass panel with the image spinning; beside the text on desktop, above it on phones. Only the text box scrolls.
- Intro: saves slide in from the left one at a time, pushing older ones along (newest ends top left). Under ~1.5s, first visit only, skipped for reduced motion.

## Character select (LEGO-style)

- The navbar picture is a selected character. Default: the current me, unlocked.
- Roster: a version of me for every year from 2006 to now, plus characters from my games.
- Picking a character changes the home title screen: portrait, name and the one-line intro (that year's me says something).
- Adding a character should only take: an image, a name, the intro line, and a price or code. Nothing else.

### Unlocking
- **Studs (main way, scales):** earned automatically for things people already do, e.g. opening a case, turning a manual page, visiting every page, finding a trophy. Characters cost studs. No new hiding spots needed when adding characters.
- **Cheat codes (a few specials only):** e.g. game characters. Codes hidden around the site, entered in Extras.
- Saved in the visitor's own browser (localStorage). No accounts.

## Trophies

- PS3-style pop-up sliding in at the top: "Trophy unlocked: ...".
- Ideas: Made contact (sent a message), first case opened, read a manual to the back cover, visited every page, found a cheat code, unlocked a character.
- Some secret (hidden until earned).
- Trophy list lives in Extras.

## Other notes
- Take inspiration from joeypurkis.com's XMB, but build our own version (no copied code or exact visuals).
- No real PlayStation branding/wording ("PlayStation Network", button symbols as-is); use our own.
