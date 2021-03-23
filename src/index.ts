import {GraphQLServer} from 'graphql-yoga';
import {loadSchemaSync} from '@graphql-tools/load';
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader';
import {addResolversToSchema} from '@graphql-tools/schema';
import {join} from 'path';
import {resolvers} from './resolvers';
import {createConnection} from 'typeorm';

const schema = loadSchemaSync(join(__dirname, 'schema.graphql'), {loaders: [new GraphQLFileLoader()]});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const server = new GraphQLServer({schema: schemaWithResolvers});
createConnection().then(() => {
  server.start(() => console.log('Server is running on localhost:4000'));
});
