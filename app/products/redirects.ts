import { permanentRedirect } from "next/navigation";
import {
  controllerCatalog,
  indoorCatalog,
  ledAccessoriesCatalog,
  outdoorCatalog,
  powerSupplyCatalog,
  receivingCardCatalog,
  rentalCatalog,
} from "@/lib/productsCatalog";

export function redirectProductsRoot() {
  permanentRedirect("/led-display/");
}

export function redirectIndoorRoot() {
  permanentRedirect("/led-display/indoor-led/");
}

export function redirectOutdoorRoot() {
  permanentRedirect("/led-display/outdoor/");
}

export function redirectRentalRoot() {
  permanentRedirect("/led-display/rental-display/");
}

export function redirectAccessoriesRoot() {
  permanentRedirect("/led-display/accessories/");
}

export function redirectReceivingCardRoot() {
  permanentRedirect("/led-display/accessories/receiving-card/");
}

export function redirectControllerRoot() {
  permanentRedirect("/led-display/accessories/controller/");
}

export function redirectPowerSupplyRoot() {
  permanentRedirect("/led-display/accessories/power-supply/");
}

export function redirectLedAccessoriesRoot() {
  permanentRedirect("/led-display/accessories/led-accessories/");
}

export function redirectIndoorSlug(slug: string) {
  permanentRedirect(`/led-display/indoor-led/${slug}/`);
}

export function redirectOutdoorSlug(slug: string) {
  permanentRedirect(`/led-display/outdoor/${slug}/`);
}

export function redirectRentalSlug(slug: string) {
  permanentRedirect(`/led-display/rental-display/${slug}/`);
}

export function redirectReceivingCardSlug(slug: string) {
  permanentRedirect(`/led-display/accessories/receiving-card/${slug}/`);
}

export function redirectControllerSlug(slug: string) {
  permanentRedirect(`/led-display/accessories/controller/${slug}/`);
}

export function redirectPowerSupplySlug(slug: string) {
  permanentRedirect(`/led-display/accessories/power-supply/${slug}/`);
}

export function redirectLedAccessoriesSlug(slug: string) {
  permanentRedirect(`/led-display/accessories/led-accessories/${slug}/`);
}

export function generateIndoorStaticParams() {
  return indoorCatalog.map((item) => ({ slug: item.slug }));
}

export function generateOutdoorStaticParams() {
  return outdoorCatalog.map((item) => ({ slug: item.slug }));
}

export function generateRentalStaticParams() {
  return rentalCatalog.map((item) => ({ slug: item.slug }));
}

export function generateReceivingCardStaticParams() {
  return receivingCardCatalog.map((item) => ({ slug: item.slug }));
}

export function generateControllerStaticParams() {
  return controllerCatalog.map((item) => ({ slug: item.slug }));
}

export function generatePowerSupplyStaticParams() {
  return powerSupplyCatalog.map((item) => ({ slug: item.slug }));
}

export function generateLedAccessoriesStaticParams() {
  return ledAccessoriesCatalog.map((item) => ({ slug: item.slug }));
}
