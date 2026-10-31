import type { Genre } from "./types";
// Editable taxonomy. Replace or extend from the database later.
export const genres: Genre[] = [
  { slug: "fiction", name: "Fiction", description: "Stories that take you somewhere new.", image: "/img/library.jpg" },
  { slug: "fantasy", name: "Fantasy", description: "Worlds shaped by imagination and wonder.", parent: "fiction", image: "/img/round.jpg" },
  { slug: "mystery-thriller", name: "Mystery & Thriller", description: "Secrets, suspense, and unexpected turns.", parent: "fiction", image: "/img/dark.jpg" },
  { slug: "romance", name: "Romance", description: "Stories about love, connection, and the human heart.", parent: "fiction", image: "/img/coffee.jpg" },
  { slug: "literary-fiction", name: "Literary Fiction", description: "Distinctive voices and thoughtful storytelling.", parent: "fiction", image: "/img/grass.jpg" },
  { slug: "horror-short-stories", name: "Horror / Short Stories", description: "Unsettling tales that linger after the light goes out.", parent: "fiction", image: "/img/dark.jpg" },
  { slug: "biblical-fiction", name: "Biblical Fiction", description: "Stories drawn from scripture and faith.", parent: "fiction", image: "/img/open.jpg" },
  { slug: "urban-fiction", name: "Urban Fiction", description: "City stories with grit, heart and hustle.", parent: "fiction", image: "/img/coffee.jpg" },
  { slug: "classics", name: "Classics", description: "Enduring works that have shaped literature and imagination.", parent: "fiction", image: "/img/spines.jpg" },
  { slug: "childrens-books", name: "Children's Books", description: "Stories that inspire young imaginations.", image: "/img/leaf.jpg" },
  { slug: "middle-grade-young-readers", name: "Middle Grade / Young Readers", description: "Adventures for readers growing into bigger stories.", parent: "childrens-books", image: "/img/leaf.jpg" },
  { slug: "nonfiction", name: "Nonfiction", description: "Ideas, experiences, and knowledge from the real world.", image: "/img/stack.jpg" },
  { slug: "science", name: "Science", description: "Discovery, inquiry, and the stories behind how we understand the world.", parent: "nonfiction", image: "/img/open.jpg" },
  { slug: "history", name: "History", description: "The people, events, and ideas that shaped the world we inherit.", parent: "nonfiction", image: "/img/spines.jpg" },
  { slug: "poetry", name: "Poetry", description: "Language, emotion, and meaning in every line.", image: "/img/note.jpg" },
];
