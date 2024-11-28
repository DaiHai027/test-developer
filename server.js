require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

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

// Define GraphQL schema
const schema = buildSchema(`
  type User {
    fullName: String
    specialties: [String]
    dayRate: Int
    availability: Boolean
    color: String
  }

  type Query {
    users: [User]
    user(fullName: String): User
  }
`);

// Define resolvers
const root = {
  users: () => users,
  user: ({ fullName }) => users.find(user => user.fullName === fullName)
};

// Set up GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true // Enables GraphiQL interface for testing
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`GraphQL endpoint available at http://localhost:${PORT}/graphql`);
});
