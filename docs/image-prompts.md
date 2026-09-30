# Image prompts

Prompts for the image slots in `src/config/images.ts` that still reuse the three
960×720 source images (each is marked `TODO` there).

**Workflow for each new image**

1. Generate it and save the full-size file (WebP, PNG or JPG) into
   `public/images/src/` using the base name in the table, for example
   `public/images/src/hero-vessel.webp`.
2. Run `pnpm images`. This writes the width variants (`-480`, `-720`, `-960`,
   `-1600`, `-2400`, never upscaled) into `public/images/` and rebuilds
   `public/og.jpg`.
3. In `src/config/images.ts`, add a `responsive("<base name>", [widths], [aspect])`
   entry listing the widths that were generated, and point the slot at it.

**Shared style (append to every prompt):**

> Photorealistic, documentary industrial photography, natural light, muted
> desaturated palette of deep teal-navy (#102b36), steel grey and white with a
> single restrained accent of safety orange (#c74925). Clean composition with
> generous negative space, no text, no logos, no watermarks, no people's faces in
> focus. Shot on a full-frame camera, 35mm lens, f/5.6, subtle film grain.

| Slot | Base name | Source size | Prompt |
| --- | --- | --- | --- |
| `hero` | `hero-vessel` | 2880×1620 | Wide aerial view of an offshore survey support vessel at blue hour on a calm dark sea, deck crane and A-frame lowering a yellow work-class ROV, soft deck floodlights, vessel placed in the right third so the left half is open dark water for headline text. |
| `intro` | `intro-rov-detail` | 1200×1200 | Tight close-up of a work-class ROV front: camera housing, LED lights and manipulator arm, wet yellow buoyancy foam and brushed aluminium frame, shallow depth of field, square crop, subject centred for a circular mask. |
| `pillars.subsea` | `pillar-subsea` | 2400×1500 | Subsea scene of an inertial metrology sensor mounted on a pipeline tie-in hub on the seabed, ROV lights cutting through blue-green water, particles in the water, cinematic and calm. |
| `pillars.robotics` | `pillar-robotics` | 2400×1500 | Industrial robotics workshop: a purpose-built inspection robot on a test stand beside a steel pipe section, engineer's hands adjusting a sensor, bright even overhead light, clean concrete floor. |
| `pillars.platforms` | `pillar-platforms` | 2400×1500 | Modern operations room with large displays showing a 3D digital twin of subsea infrastructure, dashboards with charts, dim ambient teal light, window overlooking an industrial port at dusk. |
| `capabilities.positioning` | `cap-positioning` | 1200×900 | Survey engineer's workstation on a vessel bridge showing a positioning plot of subsea connection points, sea visible through the window, focus on the screen. |
| `capabilities.imr` | `cap-imr` | 1200×900 | Underwater inspection of a subsea manifold by an ROV, marine growth on steel, bright ROV lights, visible cleaning brush tool. |
| `capabilities.remoteOps` | `cap-remote-ops` | 1200×900 | Remote operations specialist from behind, headset on, watching a live offshore camera feed and data panels, Houston skyline softly visible outside at night. |
| `showcase` | `showcase-control-room` | 2880×1620 | Wide cinematic shot of a remote operations centre: rows of monitors with a subsea digital twin and live ROV feeds, deep navy ambient light, bottom third darker and uncluttered for overlaid text. |
| `experience` | `experience-fabrication` | 2000×1400 | Fabrication yard in West Africa: a subsea jumper spool on stands, surveyor with a total station performing dimensional control, late-afternoon warm light, long shadows. |
| Open Graph | (generated) | 1200×630 | No prompt needed: `public/og.jpg` is built by `pnpm images` from the `offshore-survey` source plus the wordmark. To base it on the new hero, change the source filename near the bottom of `scripts/optimize-images.mjs`. |

**Tips**
- Keep 10–15% empty margin on the side where text overlays (hero, showcase).
- Generate 2–3 variations and pick the one whose tones match the navy palette best.
- Source files can be large; `pnpm images` compresses the variants the site serves.
