const { GraphQLServer } = require("graphql-yoga");
const WizardList = require("./WizardList");

let list = WizardList.WizardList;
const typeDefs = `
  type Query {
    Wizards:[Characters!]
  }

  type Characters {

    name: String
    house : String
   wand : Wand
   ancestry: String
   image: String
   species: String
  }

  type Wand {
    wood: String
    core: String
    length: Int
  }
  type Mutation {
    createWizard(name: String,  image: String , species: String): Characters!
    updateWizard(name: String, species: String, image: String): Characters!
  }


`;

const resolvers = {
  Query: {
    Wizards: () => {
      return list;
    }
  },
  Mutation: {
    createWizard: (parent, args) => {
      console.log(args);
      const link = {
        name: args.name,
        species: args.species,
        image: args.image
      };
      list.push(link);
      return link;
    },
    updateWizard: (parent, args) => {
      const name = args.name;

      list.map(character => {
        if (character.name == name) {
          character.species = args.species;
          character.image = args.image;
        }
      });
      return args;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
