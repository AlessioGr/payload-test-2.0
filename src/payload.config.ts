import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import { adapter } from './adapter';

export default buildConfig({
  admin: {
    user: Users.slug,
    webpack: (config) => {
      const newConf = {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,

            [path.resolve(__dirname, './adapter.js')]: path.resolve(__dirname, './mock.js'),
          },
        },
      };

      return newConf;
    },
  },
  db: adapter,
  collections: [
    Users,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
