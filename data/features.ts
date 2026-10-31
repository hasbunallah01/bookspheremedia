import type { Feature } from "./types";
// DEMO CONTENT: layout examples only. Not real interviews. Publish genuine features only with permission and accurate attribution.
export const features: Feature[] = [
  { slug: "the-story-behind-the-story", title: "The Story Behind the Story: Getting to Know the Author", category: "Author Stories", excerpt: "Every writer begins somewhere. Explore the experiences, inspirations, and ideas that influence an author's work and discover the story behind the pages.", body: ["This is a sample feature layout. Genuine author stories will be published here only with the author's permission and accurate attribution."], image: "/img/pen.jpg", demo: true },
  { slug: "a-closer-look-at-a-new-release", title: "A Closer Look at a New Release", category: "Book Spotlights", excerpt: "An introduction to a book's themes, its world, and the questions it leaves with its readers.", body: ["This is a sample feature layout for a book spotlight."], image: "/img/open.jpg", bookSlug: "the-salt-orchard", demo: true },
  { slug: "from-first-draft-to-final-page", title: "From First Draft to Final Page", category: "Writing Journeys", excerpt: "How a story takes shape, told through the choices that bring an idea to the page.", body: ["This is a sample feature layout for a writing journey."], image: "/img/desk.jpg", demo: true },
];
