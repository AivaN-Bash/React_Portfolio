// ============================================================
// ✏️  WORK & TRAVEL STORY — Edit your story and photos here
// ============================================================
// 📸 PHOTOS: Put your images inside the public/photos/ folder
//    Then reference them as "./photos/yourfile.jpg"
// ============================================================
const TRAVEL = {
  title:  "Work & Travel USA 🇺🇸",
  year:   "2022",
  arcana: "THE WORLD",
  intro:  "One of the most memorable chapters of my life — working, exploring, and growing across the United States. From the mountains of Tennessee to the neon lights of Las Vegas, every moment shaped who I am today.",

  // 🔧 YOUR PHOTOS — add/remove as many as you want!
  photos: [
    { src: "/photos/dollywood-work.jpg",  caption: "Working at Dollywood Theme Park, Tennessee 🎡" },
    { src: "/photos/gallery1.jpg",         caption: "Part-time at the Thai Restaurant 🍜" },
    { src: "/photos/gallery2.jpg",         caption: "Exploring the beautiful Tennessee mountains 🏔️" },
    { src: "/photos/gallery3.jpg",         caption: "Lights of Las Vegas, Nevada 🎰" },
    { src: "/photos/restaurant-work.jpg",  caption: "Sunny Los Angeles, California ☀️" },
    { src: "/photos/WAT.jpg",              caption: "Golden Gate Bridge, San Francisco 🌉" },
  ],

  // 🔧 YOUR CHAPTER STORIES — edit the story text for each one
  chapters: [
    {
      icon:     "🎡",
      title:    "Dollywood Theme Park",
      location: "Pigeon Forge, Tennessee",
      color:    "#00c8ff",
      story:    "My main job during the program was at Dollywood — one of the most famous theme parks in America. I worked with an amazing international team, learned how to handle guests, manage operations, and adapt to a completely new work culture. Every single day was a new experience.",
    },
    {
      icon:     "🍜",
      title:    "Thai Restaurant",
      location: "Tennessee",
      color:    "#ffd700",
      story:    "Part-time work at a local Thai restaurant gave me a home away from home. Connecting with the Thai community in Tennessee was heartwarming — sharing food, language, and culture with people who were far from home just like me.",
    },
    {
      icon:     "🏔️",
      title:    "Tennessee",
      location: "The Volunteer State",
      color:    "#7b61ff",
      story:    "Tennessee is breathtaking — rolling mountains, country music, and the warmest people. I explored the Great Smoky Mountains, downtown Nashville, and so many hidden gems in between. A place I'll never forget.",
    },
    {
      icon:     "🎰",
      title:    "Las Vegas",
      location: "Nevada",
      color:    "#ff6b9d",
      story:    "Las Vegas was unlike anything I'd ever seen. The lights, the energy, the scale of everything — it was overwhelming in the best way. I explored the Strip, watched incredible shows, and soaked in that one-of-a-kind atmosphere.",
    },
    {
      icon:     "☀️",
      title:    "Los Angeles",
      location: "California",
      color:    "#ffd700",
      story:    "LA was a city of dreams. Hollywood, Santa Monica beach, In-N-Out Burger for the first time — everything felt iconic. The diversity of people and cultures made it feel exciting and alive at every corner.",
    },
    {
      icon:     "🌉",
      title:    "San Francisco",
      location: "California",
      color:    "#00c8ff",
      story:    "San Francisco stole my heart with its hilly streets, the Golden Gate Bridge wrapped in fog, and the incredible tech energy in the air. Walking around SoMa and seeing the birthplace of so many tech companies was inspiring as a developer.",
    },
  ],
};

export default TRAVEL;
