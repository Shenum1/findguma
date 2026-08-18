# Artist Website — Project Context & Build Guide

## 1. Purpose

This document gives an AI coding/design agent the full context for an artist website before it receives the implementation prompt.

The website is for an independent music artist. It is not intended to look like a conventional corporate artist website, generic portfolio, or SaaS landing page.

The core creative idea is:

> A nostalgic personal corner of the internet — like discovering the artist's old computer and finding an entire creative world inside it — rebuilt with modern web technology and excellent usability.

The site should feel like entering the artist's world.

Existing fans should feel at home. New visitors should feel that they have discovered something personal, interesting, and slightly unexpected.

The design references the visual culture of Windows XP / Windows 98 / early personal websites / early digital cameras / old media players / pixel interfaces / CRT-era computing, but it must not become a literal Windows clone or a cheap "retro" theme.

The nostalgia is an art direction, not a constraint on usability.

---

## 2. Creative Principles

### 2.1 World-building over conventional marketing

Avoid designing the site like:

- a corporate musician website
- a generic portfolio
- a template music landing page
- a SaaS website
- a modern luxury brand website with a few retro icons added
- a literal Windows desktop recreation

The website should communicate:

- personality
- intimacy
- discovery
- nostalgia
- music
- visual identity
- curiosity
- belonging
- a sense of place

The user should feel:

> "I found this person's little corner of the internet."

rather than:

> "I am visiting a musician's promotional website."

### 2.2 Modern underneath, nostalgic on top

The implementation must prioritize:

- responsive design
- accessibility
- performance
- semantic HTML
- keyboard navigation
- mobile usability
- good loading behavior
- image optimization
- video optimization
- maintainable code
- clean component architecture

Retro styling must never make the site difficult to use.

---

## 3. Visual Direction

### 3.1 Reference era

Visual inspiration can include:

- Windows XP
- Windows 98
- early web pages
- personal Geocities-era websites
- old file explorers
- desktop folders
- system dialogs
- old media players
- digital camera interfaces
- CRT displays
- pixel art
- low-resolution graphics
- scanlines
- system notifications
- loading indicators
- early MP3 players

Use these references subtly and artistically.

### 3.2 Important constraint

Do NOT simply recreate Windows.

The final site should be unmistakably an artist's website with its own identity.

Do not overuse:

- fake desktop windows
- excessive bevels
- random gradients
- excessive glitch effects
- neon cyberpunk colors
- pixelation everywhere
- fake error messages
- unnecessary animations

Every nostalgic element should have a reason to exist.

---

## 4. Typography

Use a combination of:

### System/pixel-inspired typography

Use for:

- navigation
- metadata
- labels
- timestamps
- buttons
- file names
- interface elements
- technical details
- small annotations

### Modern expressive typography

Use for:

- artist name
- large headings
- important statements
- biography
- editorial content
- release titles

The contrast should make the site feel like an old interface containing contemporary art.

Do not sacrifice readability for aesthetic accuracy.

---

## 5. Color Direction

Do not automatically use the stereotypical "retro computer" palette.

Avoid defaulting to:

- black + neon green
- black + neon purple
- generic cyberpunk colors

Instead, derive the final palette from the artist's actual visual identity once assets and references are available.

Possible visual direction:

- off-white
- CRT black
- faded grey
- muted blue
- dusty green
- washed-out red
- one distinctive accent color

The palette should feel aged/digital but still modern and intentional.

---

## 6. Image and Video Direction

Photography is important.

The photo archive can intentionally mix:

- professional portraits
- studio photographs
- live performances
- phone photographs
- film photographs
- behind-the-scenes images
- scans
- artwork
- candid moments
- low-resolution images
- visual experiments

Do not force every image into identical cards.

The archive should feel collected over time.

High-quality source assets should remain visually high quality even when the interface references low-resolution computing.

---

# 7. Site Information Architecture

The initial site should contain:

1. Home
2. About
3. Music
4. Archive / Photos
5. Merch
6. Tour
7. Social links
8. Newsletter/email collection

Tour may initially be empty/hidden if there are no tour dates.

The architecture should make room for future features without requiring a redesign.

---

# 8. Home / Landing Page

The home page is the entry point into the artist's world.

It should establish the visual language immediately.

Potential content:

- artist name/logo
- hero visual
- short looping video or visual
- current release
- latest visualizer
- music CTA
- "enter the world" style interaction
- social links
- subtle retro UI details
- newsletter signup

The page should feel immersive rather than sales-heavy.

Do not immediately overwhelm the user with every section.

---

# 9. Newsletter / Email Collection

Email collection is a required feature.

Purpose:

- release announcements
- merch announcements
- tour announcements
- newsletters
- important artist updates
- exclusive information/content

## Popup behavior

The newsletter popup MUST NOT appear immediately on page load.

Required behavior:

1. Visitor lands on the homepage.
2. Start a 15-second timer.
3. Allow the visitor to explore without interruption.
4. After approximately 15 seconds, display the newsletter modal if the visitor has not already subscribed or dismissed it.
5. If dismissed, do not repeatedly annoy the user during the same session.
6. Persist dismissal/subscription state appropriately.
7. Respect accessibility.
8. Respect reduced-motion preferences.
9. Do not show the popup to known subscribers.

The popup should visually fit the retro/personal-computer aesthetic.

Example conceptual treatment:

    NEW MESSAGE

    WANT TO STAY IN THE LOOP?

    New music. Shows. Merch.
    Things from my world.

    [ your@email.com ]

    [ SIGN ME UP ]

    No spam. Just updates.

This is only an art-direction reference; the final copy should use the artist's actual voice.

## Permanent signup

There should also be a newsletter signup in the footer or another persistent site location.

Do not rely exclusively on the popup.

---

# 10. Music Page

Music is one of the most important areas of the website.

The page should contain the artist's existing catalog.

For every release, support:

- cover artwork
- title
- release date
- release type
- track list
- preview/play option where legally/technically appropriate
- Spotify link
- Apple Music link
- YouTube link
- Audiomack link where applicable
- Boomplay or other regional services where applicable
- Deezer/Tidal/Amazon or other platforms where applicable
- purchase/download link where applicable
- visualizer/video link
- optional lyrics in a future phase

Do not assume every platform exists. Only display platforms for which a real link has been configured.

---

# 11. Music Visuals / Canvas Concept

The preferred location for looping Canvas-style visuals is the Music page.

Each release can have a short looping visual.

Concept:

    [ LOOPING RELEASE VISUAL ]

    SONG TITLE
    2026 • SINGLE

    ▶ PLAY

    Spotify | Apple Music | YouTube | etc.

The visual can function as the release's visual identity.

Optimize video delivery carefully.

Use:

- short loops
- compressed formats
- poster images
- lazy loading where appropriate
- mobile-friendly variants when necessary

Do not automatically autoplay audio.

Muted video loops are acceptable where appropriate.

---

# 12. Audio Playback

The site may provide previews or full playback depending on rights and implementation decisions.

Important distinction:

### Preview model

Website hosts a short preview.

Full song redirects to external streaming/purchase platform.

### Full-playback model

If the artist owns the required rights and wants direct playback, the website may host or stream the full track.

The implementation must not assume that commercially distributed music can simply be copied from streaming platforms and hosted on the website.

The architecture should allow either model.

---

# 13. Persistent Music Player

Consider implementing a persistent mini-player.

When a user begins playback, navigation between pages should ideally not unnecessarily stop the track.

Concept:

    ▶ SONG NAME
    01:32 ━━━━━━━ 03:47
    ×

The player should:

- remain unobtrusive
- work on mobile
- expose play/pause
- show progress
- show track title
- allow closing
- be keyboard accessible
- not block important content

This feature is desirable and should be architected so it can be added without restructuring the application.

---

# 14. About Page

The About page should feel editorial and personal.

Avoid a generic biography block.

Potential sections:

- Who is the artist?
- Origin/background
- Influences
- Creative philosophy
- Musical approach
- Inspirations
- Current era/project
- Artist quotes
- Photography

The page should feel like entering the artist's mind rather than reading a press release.

---

# 15. Archive / Photo Page

Use "Archive" as a preferred label over "Photo Album" if it fits the artist's identity.

Concept:

    /ARTIST/ARCHIVE

    2026
    STUDIO
    LAGOS
    LIVE
    RANDOM
    POLAROIDS
    UNRELEASED

Albums/folders can be browsed.

The page should support:

- image galleries
- albums/categories
- lightbox viewing
- captions
- dates where useful
- responsive layouts
- mixed image aspect ratios

Avoid making every photo look like a generic social media card.

---

# 16. Merch

The merch section should feel like part of the artist's world.

Support:

- product image
- product name
- price
- description
- size/variant selection
- quantity
- stock status
- cart
- checkout
- shipping information

The architecture should support Nigerian customers and local payment options where appropriate.

Paystack can be considered for direct Nigerian payments.

Do not hard-code payment credentials or secrets into the frontend.

---

# 17. Tour

The Tour page should support:

- date
- city
- country
- venue
- time
- event image
- ticket link
- RSVP link if applicable
- past events

If there are no tour dates, display a tasteful empty state or temporarily hide the page.

Do not create fake events.

---

# 18. Social Links

Provide links to the artist's actual social profiles.

Potential platforms:

- Instagram
- TikTok
- X
- YouTube
- Facebook
- Threads
- other platforms as applicable

Only display platforms configured by the artist.

Social links can be persistent in the navigation/footer without dominating the site.

---

# 19. Admin / CMS Requirement

The website should be architected so the artist does not have to contact a developer for every update.

A future/admin interface should support:

## Music

- create release
- upload artwork
- add tracks
- add preview
- add streaming links
- add video link
- add purchase link
- edit release
- publish/unpublish release

## Photos

- upload images
- create albums
- reorder images
- captions
- publish/unpublish

## Merch

- create products
- upload images
- prices
- variants
- stock
- descriptions
- publish/unpublish

## Tours

- add events
- edit events
- ticket links
- publish/unpublish

## Site content

- about text
- artist quotes
- homepage content
- social links
- newsletter copy

The first implementation may separate the public site and admin functionality if that makes the architecture cleaner.

---

# 20. Recommended Technical Stack

Preferred stack:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Motion/Framer Motion where appropriate
- Supabase
- PostgreSQL through Supabase
- Supabase Storage
- Vercel

Potential integrations:

- Resend / Brevo / Kit for email
- Paystack for Nigerian payments
- YouTube for hosted visualizers/videos
- Spotify/Apple Music/Audiomack/etc. as external destinations

Do not lock the project to a vendor unnecessarily. Keep external integrations abstracted behind configuration/services.

---

# 21. Data Model Direction

A sensible database model may include:

- artists
- releases
- tracks
- release_links
- photos
- photo_albums
- merch_products
- merch_variants
- tour_events
- social_links
- newsletter_subscribers
- site_settings

Use relational structure where appropriate.

Do not duplicate the same data across components.

---

# 22. Performance Requirements

The site is media-heavy, so performance matters.

Requirements:

- optimized images
- responsive image sizes
- lazy loading
- optimized video
- avoid huge background videos
- preload only critical assets
- avoid excessive JavaScript
- avoid animation libraries for trivial effects
- use server rendering/static generation where appropriate
- compress assets
- provide poster frames for videos
- prevent layout shifts

The site should feel fast even on mobile networks.

---

# 23. Accessibility

Retro aesthetics must not compromise accessibility.

Support:

- semantic HTML
- keyboard navigation
- visible focus states
- proper form labels
- alt text
- accessible modal behavior
- ESC to close modal
- focus trapping where necessary
- screen-reader-friendly buttons
- sufficient contrast
- reduced-motion support
- accessible audio controls
- accessible video controls

Do not make important information available only through animation.

---

# 24. Responsive Behavior

Desktop and mobile should feel like the same world expressed differently.

Desktop can support:

- floating interface elements
- larger visual compositions
- richer background details
- more experimental navigation

Mobile should use:

- stacked content
- clear navigation
- bottom/compact music player
- touch-friendly controls
- optimized images/video
- simplified retro interface

Do not force a literal desktop operating system layout onto mobile.

---

# 25. Motion Philosophy

Animation should create atmosphere, not distraction.

Good uses:

- subtle window opening
- pixel loading animation
- image transitions
- music player progress
- scrolling marquee
- hover interactions
- subtle cursor effects
- release visual loops

Avoid:

- constant screen shaking
- excessive glitching
- long intro animations
- animations that delay access to content
- autoplaying sound

---

# 26. Future Features

Leave room for:

- lyrics
- exclusive fan content
- members-only area
- fan club
- direct music sales
- digital downloads
- limited releases
- guestbook
- artist journal/blog
- mailing list segmentation
- pre-save campaigns
- release countdowns
- hidden Easter eggs
- interactive digital artifacts
- custom audio visualizers
- tour archives
- press kit
- booking/contact page

Do not implement all of these in the first version.

Design the architecture so they can be introduced later.

---

# 27. Content Rules

Do not invent:

- artist biography
- song titles
- release dates
- social handles
- tour dates
- merch prices
- streaming URLs
- photos
- quotes
- venue information

Use clearly marked placeholders where actual content is not yet supplied.

Do not fabricate links.

---

# 28. Design QA

Before considering the website complete, test:

### Navigation
- all routes work
- no broken links
- active navigation state works
- mobile menu works

### Music
- releases render correctly
- audio preview works where configured
- external platform links work
- visualizers work
- player works

### Newsletter
- popup waits 15 seconds
- popup does not appear immediately
- dismiss behavior works
- subscription flow works
- duplicate subscription behavior is handled
- footer signup works
- loading/error/success states work

### Media
- images load efficiently
- galleries work
- videos do not unnecessarily consume bandwidth
- mobile media works

### Merch
- product data works
- cart works if implemented
- checkout works if implemented
- payment integration is secure

### Responsive
- desktop
- tablet
- mobile

### Accessibility
- keyboard
- screen reader basics
- focus
- contrast
- reduced motion

### Security
- no secrets in frontend
- server-side validation
- protected admin routes
- secure database policies
- spam protection on newsletter forms

---

# 29. AI Agent Working Rules

When implementing this project:

1. Do not make major design decisions that contradict the creative direction.
2. Do not replace the concept with a generic modern website.
3. Do not literalize the Windows reference too aggressively.
4. Do not invent artist content.
5. Do not invent external links.
6. Use placeholders when information is missing.
7. Keep the implementation modular.
8. Prefer reusable components.
9. Keep media optimized.
10. Build mobile-first behavior.
11. Make the site accessible.
12. Do not expose secrets.
13. Keep integrations configurable.
14. Explain significant architectural decisions.
15. If a requested feature has legal/licensing implications, flag the issue rather than silently implementing an unsafe assumption.
16. Preserve room for future features.
17. Treat the artist's world and emotional experience as the primary design objective.

---

# 30. Definition of Success

The project succeeds if:

- The first screen immediately communicates the artist's identity.
- The website feels like entering a personal digital world.
- Existing fans feel familiarity and belonging.
- New visitors feel curiosity.
- Music is easy to discover and hear.
- The complete catalog is organized.
- Streaming and purchase destinations are obvious.
- Visuals and photography feel intentional.
- Email collection works without annoying users.
- The 15-second newsletter popup works exactly as specified.
- Merch can eventually be sold.
- Tour information can eventually be added.
- The site remains fast and usable.
- The retro aesthetic feels intentional rather than gimmicky.
- The architecture can grow with the artist.

The guiding principle is:

> Build a world, not just a website.
