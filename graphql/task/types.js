module.exports.task = `
  type Task {
      _id: String
      title:  String
      listId: List
      description: String
      category: String
      order: Int
      author: User
      assignees: [User]
  }
`;

