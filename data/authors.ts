export interface Author {
  id: string;
  name: string;
  book: string;
  genre: string;
  summary: string;
  quote: string;
  tags: string[];
  image: string;
  articleUrl: string;
  year?: number;
}

export const authors: Author[] = [
  {
    id: "daniel-whitmore",
    name: "Daniel Whitmore",
    book: "The Weight of Tomorrow",
    genre: "Contemporary Fiction",
    year: 2024,
    summary:
      "The Weight of Tomorrow is a moving contemporary novel by Daniel Whitmore, an author known for writing heartfelt stories about resilience, forgiveness, and second chances. Drawing inspiration from everyday life, Daniel creates emotionally rich characters and meaningful narratives that encourage readers to find hope, healing, and the courage to move forward even in life's most difficult moments.",
    quote:
      "Being featured by Booksphere Media was one of the most rewarding experiences of my publishing journey. The conversation felt genuine and thoughtful, allowing me to share not only my book but also the inspiration behind it. The team's engaging questions and welcoming approach made the experience truly memorable. I'm grateful to have connected with readers through such a passionate literary community.",
    tags: ["Resilience", "Forgiveness", "Second Chances", "Healing"],
    image: "/authors/daniel-whitmore.png",
    articleUrl: "/articles/daniel-whitmore",
  },
  {
    id: "elizabeth-marlowe",
    name: "Elizabeth Marlowe",
    book: "The Light We Carry",
    genre: "Contemporary Fiction",
    year: 2024,
    summary:
      "The Light We Carry is a story I wrote to remind readers that hope can still be found, even in life's most difficult moments. As an author, I'm passionate about writing heartfelt stories centered on healing, resilience, and new beginnings. Through relatable characters and authentic emotions, I hope my books encourage readers to find strength, embrace change, and believe that brighter days are always ahead.",
    quote:
      "Being featured on Booksphere Media was a truly memorable experience. The interview was thoughtful, engaging, and gave me the opportunity to share the heart behind my book. The team created such a welcoming atmosphere, and connecting with readers through their platform was both meaningful and inspiring. I'm grateful to have been part of the Booksphere Media community.",
    tags: ["Hope", "Healing", "Resilience", "New Beginnings"],
    image: "/authors/elizabeth-marlowe.png",
    articleUrl: "/articles/elizabeth-marlowe",
  },
  {
    id: "claire-bennett",
    name: "Claire Bennett",
    book: "Whispers of Tomorrow",
    genre: "Contemporary Fiction",
    year: 2024,
    summary:
      "Whispers of Tomorrow is a novel I wrote for anyone who has ever struggled to let go of the past while holding on to hope for the future. As an author, I love creating emotionally driven stories about family, healing, courage, and second chances. My greatest joy is knowing that my books encourage readers to keep believing in themselves, even through life's most challenging seasons.",
    quote:
      "Being featured on Booksphere Media was such a meaningful experience for me. From the moment the conversation began, I felt welcomed and genuinely heard. It wasn't just about promoting my book, it was about sharing the heart behind my writing and connecting with readers on a personal level. I'm truly grateful to the Booksphere Media team for creating a space where authors and their stories are celebrated with authenticity and care.",
    tags: ["Family", "Healing", "Courage", "Second Chances"],
    image: "/authors/claire-bennett.png",
    articleUrl: "/articles/claire-bennett",
  },
];
