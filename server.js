require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const users = [
  {
    fullName: "Sarah Johnson",
    specialties: ["Pediatrics", "Family Medicine"],
    dayRate: 4500,
    availability: true,
    color: "#4287f5",
  },
  {
    fullName: "Michael Chen",
    specialties: ["Orthopedics", "Sports Medicine"],
    dayRate: 6000,
    availability: true, 
    color: "#42f548",
  },
  {
    fullName: "Emily Williams",
    specialties: ["Dermatology", "Cosmetic Surgery"],
    dayRate: 8000,
    availability: false,
    color: "#f542f2",
  },
  {
    fullName: "James Wilson",
    specialties: ["Psychiatry", "Neurology"],
    dayRate: 5500,
    availability: true,
    color: "#f54242",
  },
  {
    fullName: "Maria Garcia",
    specialties: ["Internal Medicine", "Endocrinology", "Pediatrics"],
    dayRate: 7000,
    availability: false,
    color: "#42f5f5",
  },
  {
    fullName: "David Kim",
    specialties: ["Cardiology", "Critical Care", "Pediatrics", "Neurology"],
    dayRate: 9000,
    availability: true,
    color: "#f5a442",
  },
];

app.get("/users", (req, res) => {
  res.json(users);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
