const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { _id }) => {
            return await User.findById(id);
        },
        users: async () => {
            return await User.find({});
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = User({ username, email, password });
            const token = signToken(user);
            return {user, token};
        },
        updateUser: async (parent, { _id, email, password }) => {
            const user = await User.findByIdAndUpdate(id, { email, password }, { new: true });
            return user;
        },
        deleteUser: async (parent, { id }) => {
            const user = await User.findByIdAndDelete(id);
            return user;
        }
    }
};

module.exports = resolvers;