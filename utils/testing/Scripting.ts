import { convert } from "html-to-text";
export const stripHtml = (html: string) => {
  return convert(html, {
    wordwrap: false,
    selectors: [
      { selector: "a", options: { ignoreHref: true } },
      { selector: "img", format: "skip" },
    ],
  });
};
export const autoLink = (html: string) => {
  const urlRegex = /(?<!["'>])((https?:\/\/[^\s<]+))/g;
  return html.replace(urlRegex, (match) => {
    const href = match.startsWith("//")
      ? // || match.startsWith("(selengkapnya di https://")
        `https:${match}`
      : match;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${match}</a>`;
  });
};