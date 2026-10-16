// Single source of truth for product data.
export const products = [
  { id: "1", name: "Habesha Kemis", price: 4500, category: "Clothing", image: "/images/habesha-kemis.svg", description: "Hand-woven cotton dress with traditional tilet embroidery.", available: true },
  { id: "2", name: "Netela Scarf", price: 850, category: "Clothing", image: "/images/netela-scarf.svg", description: "Light cotton scarf with a colourful woven border.", available: true },
  { id: "3", name: "Gabi Shawl", price: 1800, category: "Clothing", image: "/images/gabi-shawl.svg", description: "Thick, warm cotton shawl made on a traditional loom.", available: true },
  { id: "4", name: "Jebena Coffee Pot", price: 650, category: "Home & Kitchen", image: "/images/jebena.svg", description: "Clay pot for the traditional Ethiopian coffee ceremony.", available: true },
  { id: "5", name: "Mesob Basket Table", price: 2200, category: "Home & Kitchen", image: "/images/mesob.svg", description: "Hand-woven grass basket table used for sharing injera.", available: true },
  { id: "6", name: "Coffee Cup Set", price: 900, category: "Home & Kitchen", image: "/images/coffee-cups.svg", description: "Set of six small ceramic cups with a serving tray.", available: true },
  { id: "7", name: "Lalibela Silver Cross", price: 3200, category: "Jewelry", image: "/images/lalibela-cross.svg", description: "Silver cross pendant inspired by the churches of Lalibela.", available: true },
  { id: "8", name: "Beaded Necklace", price: 1200, category: "Jewelry", image: "/images/beaded-necklace.svg", description: "Colourful hand-strung bead necklace.", available: true },
  { id: "9", name: "Parchment Painting", price: 2800, category: "Art & Decor", image: "/images/parchment-painting.svg", description: "Traditional painting on parchment, ready to frame.", available: true },
  { id: "10", name: "Berchuma Stool", price: 3500, category: "Art & Decor", image: "/images/berchuma-stool.svg", description: "Carved wooden stool, a classic Ethiopian craft.", available: false },
];

export const categories = ["All", ...new Set(products.map((p) => p.category))];
