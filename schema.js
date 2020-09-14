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

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        return Axios.post('http://localhost:3000/customers', {
          name: args.name,
          email: args.email,
          age: args.age,
        }).then((res) => res.data);
      },
    },
    updateCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return Axios.patch(
          `http://localhost:3000/customers/${args.id}`,
          args
        ).then((res) => res.data);
      },
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Axios.delete(`http://localhost:3000/customers/${args.id}`).then(
          (res) => res.data
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
