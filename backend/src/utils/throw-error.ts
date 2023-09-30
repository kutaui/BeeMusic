import { GraphQLError } from 'graphql/index.js';

export const throwError = (message:string, code:string) => {
    return new GraphQLError(message, {
        extensions: {
            code: code
        }
    });
};