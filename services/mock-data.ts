import { FamilyMember, EventFolder } from '@/lib/family-data';

// Mock family members data for admin
export const MOCK_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: "sarah",
    name: "Sarah Johnson",
    role: "Mother",
    thumbnail: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
    bio: "Sarah is the heart of our family. She's a dedicated teacher who loves gardening, cooking, and spending quality time with her loved ones.",
    carouselImages: [
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    gallery: [
      { url: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2023, caption: "Family vacation at the beach" },
      { url: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2023, caption: "Cooking together in the kitchen" },
      { url: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2022, caption: "Birthday celebration" },
      { url: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2022, caption: "Garden party with friends" },
      { url: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2021, caption: "Holiday traditions" }
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
    thumbnail: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    bio: "Jake is our family's adventurer and tech enthusiast. As a software engineer, he loves solving problems and building things.",
    carouselImages: [
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    gallery: [
      { url: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2023, caption: "Hiking adventure in the mountains" },
      { url: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2023, caption: "Building a treehouse with the kids" },
      { url: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2022, caption: "Guitar performance at local venue" },
      { url: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2022, caption: "Tech conference presentation" },
      { url: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2021, caption: "Family camping trip" }
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
    thumbnail: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150",
    bio: "Emma is our creative and ambitious teenager. She's passionate about art, music, and environmental causes.",
    carouselImages: [
      "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    gallery: [
      { url: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2023, caption: "Art exhibition showcase" },
      { url: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2023, caption: "School play lead role" },
      { url: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2022, caption: "Environmental club president" },
      { url: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2022, caption: "Piano recital performance" },
      { url: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2021, caption: "Summer art camp" }
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
    thumbnail: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150",
    bio: "Tin is our energetic and curious young explorer. He loves sports, science experiments, and making everyone laugh.",
    carouselImages: [
      "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1620653/pexels-photo-1620653.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    gallery: [
      { url: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2023, caption: "Soccer championship game" },
      { url: "https://images.pexels.com/photos/1620653/pexels-photo-1620653.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2023, caption: "Science fair project winner" },
      { url: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2022, caption: "Birthday party with friends" },
      { url: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2022, caption: "First bike ride without training wheels" },
      { url: "https://images.pexels.com/photos/1620653/pexels-photo-1620653.jpeg?auto=compress&cs=tinysrgb&w=600", year: 2021, caption: "Beach vacation sandcastle" }
    ],
    timeline: [
      { year: 2023, title: "Soccer Team Captain", description: "Chosen as captain of school soccer team", type: "achievement" },
      { year: 2022, title: "Science Fair Winner", description: "Won first place in regional science fair", type: "achievement" },
      { year: 2021, title: "Learned to Ride Bike", description: "Mastered riding without training wheels", type: "milestone" },
      { year: 2020, title: "Started Joke Collection", description: "Began collecting and telling family jokes", type: "memory" },
    ]
  }
];

// Mock event folders data for admin
export const MOCK_EVENT_FOLDERS: EventFolder[] = [
  {
    id: "birthday-2023",
    name: "Birthday Celebrations",
    description: "Family birthday parties and celebrations from 2023",
    year: 2023,
    color: "bg-pink-100 text-pink-700",
    icon: "Cake",
    images: [
      "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1857157/pexels-photo-1857157.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=600"
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
      "https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=600"
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
      "https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1303098/pexels-photo-1303098.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1303095/pexels-photo-1303095.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=600"
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
      "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    createdAt: "2022-06-15T00:00:00Z"
  },
  {
    id: "wedding-anniversary-2023",
    name: "Wedding Anniversary",
    description: "Sarah and Jake's 20th wedding anniversary celebration",
    year: 2023,
    color: "bg-rose-100 text-rose-700",
    icon: "Heart",
    images: [
      "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1024994/pexels-photo-1024994.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1024995/pexels-photo-1024995.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    createdAt: "2023-09-10T00:00:00Z"
  },
  {
    id: "sports-day-2023",
    name: "School Sports Day",
    description: "Tin's school sports day and competitions",
    year: 2023,
    color: "bg-orange-100 text-orange-700",
    icon: "Star",
    images: [
      "https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1618268/pexels-photo-1618268.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1618267/pexels-photo-1618267.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1618266/pexels-photo-1618266.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    createdAt: "2023-05-20T00:00:00Z"
  }
];