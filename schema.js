const { default: Axios } = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const res = await Axios.get(
          `http://localhost:3000/customers/${args.id}`
        );
        const data = await res.data;
        return data;
      },
    },
    customers: {
      type: GraphQLList(CustomerType),
      async resolve(parent, args) {
        const customers = await Axios.get(`http://localhost:3000/customers`);
        return customers.data;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
