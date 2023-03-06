const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in');
        }
  
        const user = await User.findById(context.user._id);
  
        return user;
      },
    },
    Mutation: {
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Invalid credentials');
        }
  
        const correctPassword = await user.isCorrectPassword(password);
  
        if (!correctPassword) {
          throw new AuthenticationError('Invalid credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
    },
  };
  