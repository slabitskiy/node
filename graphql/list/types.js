module.exports.list = `
    type List {
        _id: String
        name: String!
        boardId: String!
        tasks: [Task]
    }
`;

