export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  thumbnail: string;
  bio: string;
  carouselImages: string[];
  gallery: GalleryImage[];
  timeline: TimelineEvent[];
}

export interface GalleryImage {
  url: string;
  year: number;
  caption?: string;
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  type: 'milestone' | 'achievement' | 'memory' | 'celebration';
}

export interface EventFolder {
  id: string;
  name: string;
  description?: string;
  year: number;
  color: string;
  icon: string;
  images: string[];
  createdAt: string;
}

// Mock family members data
export const familyMembers: FamilyMember[] = [
  {
    id: "sarah",
    name: "Sarah Johnson",
    role: "Mother",
    thumbnail: "/images/family/sarah-thumb.svg",
    carouselImages: [
      "/images/carousel/sarah-1.svg",
      "/images/carousel/sarah-2.svg",
      "/images/carousel/sarah-3.svg"
    ],
    bio: "Sarah is the heart of our family. She's a dedicated teacher who loves gardening, cooking, and spending quality time with her loved ones. Her warm smile and caring nature make every family gathering special.",
    gallery: [
      { url: "/images/gallery/gallery-1.svg", year: 2023, caption: "Family vacation at the beach" },
      { url: "/images/gallery/gallery-2.svg", year: 2023, caption: "Cooking together in the kitchen" },
      { url: "/images/gallery/gallery-3.svg", year: 2022, caption: "Birthday celebration" },
      { url: "/images/gallery/gallery-4.svg", year: 2022, caption: "Garden party with friends" },
      { url: "/images/gallery/gallery-5.svg", year: 2021, caption: "Holiday traditions" }
    ],
    timeline: [
      { year: 2023, title: "Teacher of the Year", description: "Received recognition for outstanding dedication to education", type: "achievement" },
      { year: 2022, title: "Family Reunion Organizer", description: "Successfully organized the largest family reunion in decades", type: "milestone" },
      { year: 2021, title: "Master Gardener Certification", description: "Completed advanced gardening certification program", type: "achievement" },
      { year: 2020, title: "Started Family Blog", description: "Began documenting family memories and recipes", type: "memory" },
    ]
  },
  {
    id: "jake",
    name: "Jake Johnson",
    role: "Father",
    thumbnail: "/images/family/jake-thumb.svg",
    carouselImages: [
      "/images/carousel/jake-1.svg",
      "/images/carousel/jake-2.svg",
      "/images/carousel/jake-3.svg"
    ],
    bio: "Jake is our family's adventurer and tech enthusiast. As a software engineer, he loves solving problems and building things. When he's not coding, you'll find him hiking, playing guitar, or teaching the kids about technology.",
    gallery: [
      { url: "/images/gallery/gallery-6.svg", year: 2023, caption: "Hiking adventure in the mountains" },
      { url: "/images/gallery/gallery-7.svg", year: 2023, caption: "Building a treehouse with the kids" },
      { url: "/images/gallery/gallery-8.svg", year: 2022, caption: "Guitar performance at local venue" },
      { url: "/images/gallery/gallery-9.svg", year: 2022, caption: "Tech conference presentation" },
      { url: "/images/gallery/gallery-1.svg", year: 2021, caption: "Family camping trip" }
    ],
    timeline: [
      { year: 2023, title: "Promoted to Senior Engineer", description: "Advanced to senior software engineer position", type: "achievement" },
      { year: 2022, title: "Completed Marathon", description: "Finished first marathon in under 4 hours", type: "milestone" },
      { year: 2021, title: "Open Source Contributor", description: "Became active contributor to major open source project", type: "achievement" },
      { year: 2020, title: "Started Coding Bootcamp", description: "Began teaching weekend coding classes for kids", type: "memory" },
    ]
  },
  {
    id: "emma",
    name: "Emma Johnson",
    role: "Daughter",
    thumbnail: "/images/family/emma-thumb.svg",
    carouselImages: [
      "/images/carousel/emma-1.svg",
      "/images/carousel/emma-2.svg",
      "/images/carousel/emma-3.svg"
    ],
    bio: "Emma is our creative and ambitious teenager. She's passionate about art, music, and environmental causes. Her artistic talents and leadership skills make her a natural born leader among her peers.",
    gallery: [
      { url: "/images/gallery/gallery-2.svg", year: 2023, caption: "Art exhibition showcase" },
      { url: "/images/gallery/gallery-3.svg", year: 2023, caption: "School play lead role" },
      { url: "/images/gallery/gallery-4.svg", year: 2022, caption: "Environmental club president" },
      { url: "/images/gallery/gallery-5.svg", year: 2022, caption: "Piano recital performance" },
      { url: "/images/gallery/gallery-6.svg", year: 2021, caption: "Summer art camp" }
    ],
    timeline: [
      { year: 2023, title: "Art Scholarship Winner", description: "Received full scholarship for summer art program", type: "achievement" },
      { year: 2022, title: "Environmental Club President", description: "Elected president of school environmental club", type: "milestone" },
      { year: 2021, title: "First Piano Recital", description: "Performed solo piece at annual recital", type: "celebration" },
      { year: 2020, title: "Started Art Journal", description: "Began documenting artistic journey and inspirations", type: "memory" },
    ]
  },
  {
    id: "tin",
    name: "Tin Johnson",
    role: "Son",
    thumbnail: "/images/family/tin-thumb.svg",
    carouselImages: [
      "/images/carousel/tin-1.svg",
      "/images/carousel/tin-2.svg",
      "/images/carousel/tin-3.svg"
    ],
    bio: "Tin is our energetic and curious young explorer. He loves sports, science experiments, and making everyone laugh with his jokes. His enthusiasm and positive energy bring joy to every family moment.",
    gallery: [
      { url: "/images/gallery/gallery-7.svg", year: 2023, caption: "Soccer championship game" },
      { url: "/images/gallery/gallery-8.svg", year: 2023, caption: "Science fair project winner" },
      { url: "/images/gallery/gallery-9.svg", year: 2022, caption: "Birthday party with friends" },
      { url: "/images/gallery/gallery-1.svg", year: 2022, caption: "First bike ride without training wheels" },
      { url: "/images/gallery/gallery-2.svg", year: 2021, caption: "Beach vacation sandcastle" }
    ],
    timeline: [
      { year: 2023, title: "Soccer Team Captain", description: "Chosen as captain of school soccer team", type: "achievement" },
      { year: 2022, title: "Science Fair Winner", description: "Won first place in regional science fair", type: "achievement" },
      { year: 2021, title: "Learned to Ride Bike", description: "Mastered riding without training wheels", type: "milestone" },
      { year: 2020, title: "Started Joke Collection", description: "Began collecting and telling family jokes", type: "memory" },
    ]
  }
];

// Mock event folders data
export const eventFolders: EventFolder[] = [
  {
    id: "birthday-2023",
    name: "Birthday Celebrations",
    description: "Family birthday parties and celebrations from 2023",
    year: 2023,
    color: "bg-pink-100 text-pink-700",
    icon: "Cake",
    images: [
      "/images/gallery/gallery-1.svg",
      "/images/gallery/gallery-2.svg",
      "/images/gallery/gallery-3.svg",
      "/images/gallery/gallery-4.svg"
    ],
    createdAt: "2023-12-01T00:00:00Z"
  },
  {
    id: "vacation-2023",
    name: "Summer Vacation",
    description: "Our amazing family vacation to the mountains",
    year: 2023,
    color: "bg-blue-100 text-blue-700",
    icon: "Heart",
    images: [
      "/images/gallery/gallery-5.svg",
      "/images/gallery/gallery-6.svg",
      "/images/gallery/gallery-7.svg"
    ],
    createdAt: "2023-08-15T00:00:00Z"
  },
  {
    id: "holidays-2022",
    name: "Holiday Season",
    description: "Christmas and New Year celebrations",
    year: 2022,
    color: "bg-green-100 text-green-700",
    icon: "Star",
    images: [
      "/images/gallery/gallery-8.svg",
      "/images/gallery/gallery-9.svg",
      "/images/gallery/gallery-1.svg",
      "/images/gallery/gallery-2.svg"
    ],
    createdAt: "2022-12-25T00:00:00Z"
  },
  {
    id: "graduation-2022",
    name: "Graduation Day",
    description: "Emma's middle school graduation ceremony",
    year: 2022,
    color: "bg-purple-100 text-purple-700",
    icon: "Gift",
    images: [
      "/images/gallery/gallery-3.svg",
      "/images/gallery/gallery-4.svg"
    ],
    createdAt: "2022-06-15T00:00:00Z"
  }
];

// Utility functions
export function getFamilyMemberById(id: string): FamilyMember | undefined {
  return familyMembers.find(member => member.id === id);
}

export function getEventFolderById(id: string): EventFolder | undefined {
  return eventFolders.find(folder => folder.id === id);
}

export function getEventFoldersByYear(): Record<number, EventFolder[]> {
  return eventFolders.reduce((acc, folder) => {
    if (!acc[folder.year]) {
      acc[folder.year] = [];
    }
    acc[folder.year].push(folder);
    return acc;
  }, {} as Record<number, EventFolder[]>);
}