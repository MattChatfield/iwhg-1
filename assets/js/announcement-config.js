/*
  announcement-config.js - Settings for the announcement banner at the top of every page.
  THIS IS THE ONLY FILE YOU NEED TO EDIT to change the banner.
  (The code that builds the banner lives in iwhg.js, the styling in iwhg.css.)

  How to update:
    1. Edit the values below.
    2. Commit and push - GitHub Pages will publish it within a couple of minutes.

  How to preview before the start date (or while disabled):
    add ?announcement=preview to any page address, e.g.
    https://iwhg.org/index.html?announcement=preview
*/
const ANNOUNCEMENT = {
  // Master switch. Set to false to hide the banner whatever the dates are.
  enabled: true,

  // The banner shows from the start date to the end date, INCLUSIVE of both days.
  // Format must be YYYY-MM-DD (year-month-day, with leading zeros).
  // Dates are interpreted as UK time (Europe/London).
  start: "2026-11-01",
  end: "2026-11-15",

  // The text shown in the banner. Plain text only (no HTML).
  message: "Wight Nature Fund’s Autumn Hedgelaying Competition is on 14th November 2026",

  // Optional link shown after the message. Set linkText to "" for no link.
  // linkUrl is relative to the site root, so "competition.html" works from any page.
  linkText: "Find out more",
  linkUrl: "https://wnf.org.uk/wnf-hedgelaying-2026/"
};
