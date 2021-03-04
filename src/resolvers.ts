import * as bcrypt from 'bcryptjs';
import {User} from './entity/User';
import {ResolverMap} from './types/graphql-utils';

export const resolvers: ResolverMap = {
  Query: {
    hello: (_: any, {name}: GQL.IHelloOnQueryArguments) => `Hello ${name || 'World'}`,
  },
  Mutation: {
    register: async (_, {name, email, password, age}: GQL.IRegisterOnMutationArguments) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = User.create({
        name,
        email,
        password: hashedPassword,
        age,
      });

      await user.save();
      return `Welcome new user!\nName: ${name}\nAge: ${age}\nEmail: ${email}\nPassword: ${password}`;
    },
  },
};
