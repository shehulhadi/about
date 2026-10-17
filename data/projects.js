// EDIT THIS FILE to add or update projects. The catalogue, filters and detail views are built from it.
// Only fill in `demoUrl` or `screenshot` when they really exist. Empty = the button/image is not shown.
// status: "Live product" | "Working prototype" | "Concept" | "Available for customization"
// category: "Web Applications" | "E-commerce" | "Business Systems" | "Mobile Applications" | "Desktop Applications"
window.PROJECTS = [
  {
    id: "pxdynasty",
    name: "PXDynasty",
    category: "E-commerce",
    platform: "Web",
    status: "Working prototype", // TODO: verify against the live site before publishing
    summary: "A multi-vendor marketplace for local businesses, covering listings, carts, orders and delivery workflows.",
    problem: "Small vendors need one place to list products and receive orders without building their own store.",
    solution: "A marketplace where vendors manage products and orders, and customers browse, add to cart and place orders.",
    features: ["Product listings", "Shopping cart", "Order handling", "Business management", "Delivery workflow", "Payment integration (confirm scope)"],
    customization: "Branding, vendor rules, categories, delivery options and payment setup can be adapted to your market.",
    demoUrl: "https://shehulhadi.github.io/pxdynasty/",
    screenshot: ""
  },
  {
    id: "matric",
    name: "Matric",
    category: "Web Applications",
    platform: "Web",
    status: "Concept", // TODO: update if a working version exists
    summary: "A university platform concept for verified student identities, communities, notices and learning resources.",
    problem: "Student communication is scattered across informal channels with no verified identity or official notices.",
    solution: "One closed platform where verified students join academic communities and receive official notices and resources.",
    features: ["Verified student identities", "Academic communities", "Notices", "Learning resources", "Administration tools"],
    customization: "Can be scoped for a specific institution, faculty or department.",
    demoUrl: "",
    screenshot: ""
  },
  {
    id: "legiscore",
    name: "LegisCore",
    category: "Business Systems",
    platform: "Web",
    status: "Working prototype", // TODO: verify
    summary: "A legal document-management and office workflow prototype for law firms.",
    problem: "Law offices struggle to keep case documents organised and track who is doing what.",
    solution: "A central system for storing documents and moving work through the office.",
    features: ["Document management", "Office workflow", "Role-based access (confirm scope)"],
    customization: "Workflows and document types can be adapted to a firm's practice.",
    demoUrl: "",
    screenshot: ""
  }
];
