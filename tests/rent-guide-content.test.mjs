import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

test("rent guide stays aligned with the current rental catalog and package policy", () => {
  const guide = read("app/led-display/led-screen-rent-in-bangladesh/page.tsx");
  const rentalLanding = read("modules/routes/catalog/rental/page.tsx");

  for (const pitch of ["P2.6", "P3", "P3.91", "P4.81"]) {
    assert.ok(guide.includes(`recommendedPitch: "${pitch}"`));
    assert.ok(rentalLanding.includes(`pitch: "${pitch}"`));
  }

  assert.doesNotMatch(guide, /P2\.9\b|P3\.9(?!1)/);
  assert.ok(guide.includes('distance: "1-2.5 m (3-8 ft)"'));
  assert.ok(guide.includes('distance: "6 m+ (20 ft+)"'));

  assert.doesNotMatch(guide, /p\.cardPrice/);
  assert.match(guide, /Price: Based on requirements/);
  assert.match(guide, /quoted per project rather than as a fixed per-square-foot rental rate/);
  assert.match(rentalLanding, /Based on Requirements/);

  assert.match(guide, /Depending on the selected package/);
  assert.match(guide, /event-day support when included/);
  assert.match(rentalLanding, /depending on the package/);

  for (const step of ["Share the event date", "Review venue access", "Bill of Quantity (BOQ)", "Finalize screen size", "pre-event testing", "safely dismantle the system"]) {
    assert.ok(guide.includes(step));
  }
});
