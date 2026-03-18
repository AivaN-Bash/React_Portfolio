// ============================================================
// ✏️  WORK & TRAVEL STORY — Edit your story here
// ============================================================

const BASE = process.env.PUBLIC_URL || "";

const TRAVEL = {
  title:    "Work & Travel USA 🇺🇸",
  title_th: "Work & Travel สหรัฐอเมริกา 🇺🇸",
  year:     "2022",
  arcana:   "THE WORLD",

  intro:    "One of the most memorable chapters of my life — working, exploring, and growing across the United States. From the mountains of Tennessee to the neon lights of Las Vegas, every moment shaped who I am today.",
  intro_th: "หนึ่งในบทที่จำไม่ลืมของชีวิต ได้ทำงาน เดินทาง และเติบโตทั่วสหรัฐอเมริกา ตั้งแต่ภูเขาในเทนเนสซีถึงแสงไฟลาสเวกัส ทุกช่วงเวลาหล่อหลอมให้ผมเป็นแบบนี้",

  photos: [
    { src: `${BASE}/photos/dollywood-work.jpg`,  caption: "Working at Dollywood Theme Park, Tennessee 🎡", caption_th: "ทำงานที่ Dollywood Theme Park รัฐเทนเนสซี 🎡" },
    { src: `${BASE}/photos/gallery1.jpg`,         caption: "Part-time at the Thai Restaurant 🍜",           caption_th: "พาร์ทไทม์ที่ร้านอาหารไทย 🍜" },
    { src: `${BASE}/photos/gallery2.jpg`,         caption: "Beautiful Tennessee mountains 🏔️",              caption_th: "ภูเขาสวยงามในเทนเนสซี 🏔️" },
    { src: `${BASE}/photos/gallery3.jpg`,         caption: "Lights of Las Vegas, Nevada 🎰",               caption_th: "แสงไฟลาสเวกัส รัฐเนวาดา 🎰" },
    { src: `${BASE}/photos/restaurant-work.jpg`,  caption: "Sunny Los Angeles, California ☀️",             caption_th: "แสงแดดแอลเอ รัฐแคลิฟอร์เนีย ☀️" },
    { src: `${BASE}/photos/WAT.jpg`,              caption: "Golden Gate Bridge, San Francisco 🌉",          caption_th: "สะพาน Golden Gate ซานฟรานซิสโก 🌉" },
  ],

  locations:    ["Tennessee", "Las Vegas", "Los Angeles", "San Francisco"],
  locations_th: ["เทนเนสซี", "ลาสเวกัส", "ลอสแองเจลิส", "ซานฟรานซิสโก"],

  story_title:    "My Story",
  story_title_th: "เรื่องของผม",

  chapters: [
    {
      icon: "🎡", title: "Dollywood Theme Park", title_th: "Dollywood Theme Park",
      location: "Pigeon Forge, Tennessee", location_th: "Pigeon Forge, เทนเนสซี",
      color: "#00c8ff",
      story:    "My main job during the program was at Dollywood — one of the most famous theme parks in America. I worked with an incredible international team, learned to handle guests, manage operations, and adapt to a completely different work culture. Every day was something new.",
      story_th: "งานหลักของผมในโปรแกรมคือที่ Dollywood สวนสนุกชื่อดังของอเมริกา ทำงานกับทีมนานาชาติที่เยี่ยมมาก ได้เรียนรู้การดูแลแขก บริหารงาน และปรับตัวกับวัฒนธรรมการทำงานที่ต่างออกไป ทุกวันมีอะไรใหม่เสมอ",
    },
    {
      icon: "🍜", title: "Thai Restaurant", title_th: "ร้านอาหารไทย",
      location: "Tennessee", location_th: "เทนเนสซี",
      color: "#ffd700",
      story:    "Part-time work at a local Thai restaurant gave me a home away from home. Connecting with the Thai community in Tennessee was heartwarming — sharing food, language, and culture with people far from home, just like me.",
      story_th: "งานพาร์ทไทม์ที่ร้านอาหารไทยทำให้รู้สึกเหมือนมีบ้านอีกหลัง ได้เจอชาวไทยในเทนเนสซี รู้สึกอบอุ่นมาก แชร์ข้าว ภาษา และวัฒนธรรมกับคนที่ห่างบ้านเหมือนกัน",
    },
    {
      icon: "🏔️", title: "Tennessee", title_th: "เทนเนสซี",
      location: "The Volunteer State", location_th: "The Volunteer State",
      color: "#7b61ff",
      story:    "Tennessee is breathtaking — rolling mountains, country music, and genuinely warm people. I explored the Great Smoky Mountains, wandered downtown Nashville, and found so many hidden gems. A place I'll never forget.",
      story_th: "เทนเนสซีสวยมาก ทั้งภูเขา ดนตรีคันทรี และคนที่ใจดีจริงๆ ได้ไปสำรวจ Great Smoky Mountains เดินเล่นย่าน Nashville และค้นพบสถานที่น่ารักอีกมากมาย ไม่มีวันลืม",
    },
    {
      icon: "🎰", title: "Las Vegas", title_th: "ลาสเวกัส",
      location: "Nevada", location_th: "เนวาดา",
      color: "#ff6b9d",
      story:    "Las Vegas was unlike anything I'd seen. The lights, the energy, the sheer scale — overwhelming in the best way. I explored the Strip, watched incredible shows, and just soaked in that one-of-a-kind atmosphere.",
      story_th: "ลาสเวกัสต่างจากทุกที่ที่เคยเห็น แสงไฟ พลังงาน ความยิ่งใหญ่ — ถล่มทลายในแบบที่ดีมาก ได้เดินบน Strip ดูโชว์สุดอลังการ และซึมซับบรรยากาศที่ไม่มีที่ไหนเหมือน",
    },
    {
      icon: "☀️", title: "Los Angeles", title_th: "ลอสแองเจลิส",
      location: "California", location_th: "แคลิฟอร์เนีย",
      color: "#ffd700",
      story:    "LA was a city of dreams. Hollywood, Santa Monica beach, In-N-Out for the first time — everything felt iconic. The mix of people and cultures made it feel electric at every corner.",
      story_th: "แอลเอเป็นเมืองแห่งความฝัน ทั้ง Hollywood หาด Santa Monica และ In-N-Out ครั้งแรก ทุกอย่างรู้สึกเป็น icon หมด ความหลากหลายของผู้คนและวัฒนธรรมทำให้เมืองมีชีวิตตลอดเวลา",
    },
    {
      icon: "🌉", title: "San Francisco", title_th: "ซานฟรานซิสโก",
      location: "California", location_th: "แคลิฟอร์เนีย",
      color: "#00c8ff",
      story:    "San Francisco stole my heart — hilly streets, Golden Gate in the fog, and that unmistakable tech energy in the air. Walking SoMa and seeing where so many tech companies were born was genuinely inspiring.",
      story_th: "ซานฟรานซิสโกขโมยใจผมไป ถนนเนิน สะพาน Golden Gate ห่มหมอก และพลังงาน tech ที่รู้สึกได้ทุกที่ เดินใน SoMa แล้วได้เห็นถิ่นกำเนิดของบริษัท tech มากมาย แรงบันดาลใจมากจริงๆ",
    },
  ],
};

export default TRAVEL;
