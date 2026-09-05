import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolveRentalInquiry } from "../app/contact/rentalInquiry.ts";

const resolve = (query, products) => resolveRentalInquiry(new URLSearchParams(query), products);
const rentalPage = readFileSync(new URL("../modules/routes/catalog/rental/page.tsx", import.meta.url), "utf8");

test("the concert quote URL prefills the Rental project and readable package", () => {
  const context = resolve("project=rental-led-display&package=concert-live-show-package");
  assert.equal(context.projectType, "Rental LED Display");
  assert.equal(context.projectKey, "rental-led-display");
  assert.deepEqual(context.packageInquiry, { key: "concert-live-show-package", label: "Concert & Live Show" });
  assert.match(context.message, /Package inquiry: Concert & Live Show/);
  assert.match(context.message, /Event date, venue\/location, screen size, rental duration/);
  assert.doesNotMatch(context.message, /Conference System|participant count/);
});

test("every existing rental package and event CTA has a matching label", () => {
  for (const [field, start, end] of [
    ["package", "const rentalPackages", "function PackageDetail"],
    ["event", "const rentalOccasions", "function RentalOccasionShowcase"],
  ]) {
    const startIndex = rentalPage.indexOf(start);
    const endIndex = rentalPage.indexOf(end, startIndex);
    assert.ok(startIndex >= 0 && endIndex > startIndex);
    const entries = [...rentalPage.slice(startIndex, endIndex).matchAll(/title: "([^"]+)"[\s\S]*?query: "([^"]+)"/g)];
    assert.equal(entries.length, field === "package" ? 5 : 6);
    for (const [, title, key] of entries) {
      assert.equal(resolve(`project=rental-led-display&${field}=${key}`)[`${field}Inquiry`]?.label, title);
    }
  }
});

test("all rental project aliases and service CTAs preserve their context", () => {
  for (const key of ["rental-led-display", "complete-rental-led-package", "custom-rental-led-package"]) {
    const context = resolve(`project=${key}`);
    assert.equal(context.projectKey, key);
    assert.equal(context.projectType, "Rental LED Display");
    assert.ok(context.message);
  }
  const services = [...new Set([...rentalPage.matchAll(/service=([a-z-]+)/g)].map((match) => match[1]))];
  assert.equal(services.length, 4);
  for (const key of services) assert.equal(resolve(`project=rental-led-display&service=${key}`).serviceInquiry?.key, key);
});

test("rental model context comes only from the supplied product catalog", () => {
  const products = [{ slug: "p2-6-rental-led-display", title: "P2.6 Rental LED Display" }];
  const context = resolve("project=rental-led-display&model=p2-6-rental-led-display", products);
  assert.deepEqual(context.modelInquiry, { key: products[0].slug, label: products[0].title });
  assert.match(context.message, /Model inquiry: P2.6 Rental LED Display/);
  assert.equal(resolve("project=rental-led-display&model=unknown", products).modelInquiry, null);
});

test("plain contact and unrelated projects do not become Rental inquiries", () => {
  for (const query of ["", "project=conference-system&package=10-person-boardroom", "project=hybrid-conference-room", "project=indoor-led-display", "project=outdoor-led-display", "package=concert-live-show-package", "project=unknown"]) {
    assert.equal(resolve(query), null, query);
  }
});

test("unknown or injected context is not echoed into the inquiry", () => {
  const query = new URLSearchParams({ project: "rental-led-display", package: "<script>alert(1)</script>", model: "__proto__", event: "constructor", service: "toString" });
  const context = resolveRentalInquiry(query);
  for (const field of ["packageInquiry", "modelInquiry", "eventInquiry", "serviceInquiry"]) assert.equal(context[field], null);
  assert.doesNotMatch(context.message, /script|alert|__proto__|constructor|toString/);
});

test("recognized rental details can be combined and whitespace is normalized", () => {
  const context = resolve("project=%20rental-led-display%20&package=concert-live-show-package&event=concert-live-show&service=event-planning");
  assert.equal(context.projectKey, "rental-led-display");
  assert.match(context.message, /Package inquiry: Concert & Live Show/);
  assert.match(context.message, /Event type: Concert & Live Show/);
  assert.match(context.message, /Service inquiry: Event Planning \/ BOQ/);
});
