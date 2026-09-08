# Rental project preview assets

These are fictional AI-generated sample setups, not photographs of completed Sasha Corporation projects. Created with the built-in imagegen tool. No existing asset was replaced.

## Saved website assets

- `public/assets/led-display/rental/projects/sample-corporate-led.webp`
- `public/assets/led-display/rental/projects/sample-concert-led.webp`
- `public/assets/led-display/rental/projects/sample-wedding-led.webp`

The PNG originals were retained in the image-generation output directory. Website copies are optimized 1280px-wide WebP images.

## Replacing previews with real work

Edit `modules/routes/catalog/rental/rentalProjects.ts`. Replace the image paths, alt text, descriptions and specifications with approved real project information. Set `isSample: false` only after verification, and add an existing `caseStudyHref` to enable the **View Project** link. Until then the cards show a **Sample setup** badge and **Discuss Setup** enquiry link. No sample was added to the verified project dataset or project structured data.

## Final generation prompts

### Corporate

Use case: photorealistic-natural. Asset type: sample corporate-event LED project card photo for a website, clearly identified as illustrative in surrounding UI. Generate a photorealistic panoramic hotel ballroom conference stage, large pristine blue LED presentation screen across the center and two narrow side screens, warm ceiling spotlights, dark stage platform, audience silhouettes and rows of chairs along the bottom edge. The central screen reads exactly "Together for a Brighter Future" in neat white type. Wide front-facing photograph, blue and cyan stage lighting contrasting warm neutral ballroom walls, professional natural photographic textures. Compose for a shallow approximately 3:1 banner crop, keep the complete stage and screens inside the central horizontal band. No real venue identifiers, no logos, no watermark, no UI, no border. This is a fictional illustrative event setup, not documentation of a real installation.

### Concert

Use case: photorealistic-natural. Asset type: sample concert LED project card photo for a website, explicitly illustrative in surrounding UI. Generate a photorealistic panoramic front-facing concert stage at night with a wide central LED wall showing energetic blue, magenta and cyan abstract light graphics, tall narrow side LED panels, overhead metal truss, cyan spotlights and a crowd of silhouettes in the lower foreground. Main screen reads exactly "MUSIC LIVES FOREVER" in clean expressive white lettering. Premium clear event photography, crisp hardware details, saturated stage lighting with controlled highlights. Shallow approximately 3:1 banner composition, keep the complete LED stage in the central horizontal band. No identifiable venue, no sponsor marks, no real performers, no watermark, no UI, no border. This is a fictional illustrative event setup.

### Wedding

Use case: photorealistic-natural. Asset type: sample wedding LED backdrop project card photo for a website, explicitly illustrative in surrounding UI. Generate a photorealistic panoramic front-facing luxury South Asian wedding reception stage. Broad central LED backdrop with a warm pink and champagne elegant floral pattern, framed by abundant white and blush flowers, delicate golden drapery, warm hanging fairy lights, softly lit chandeliers, a tasteful cream wedding loveseat centered in front with flower arrangements along the platform. No people needed. Premium clear wedding photography, refined warm peach-pink-gold palette. Shallow approximately 3:1 banner composition, full decorated stage fits across the central horizontal band. No text or monograms, no venue identifiers, no logos, no watermark, no UI, no border. This is a fictional illustrative event setup, not evidence of a completed client project.
