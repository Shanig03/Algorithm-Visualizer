export const DEFAULT_TREE = {
  id: "5",
  value: 5,
  left: {
    id: "3",
    value: 3,
    left: {
      id: "1",
      value: 1,
      left: {
        id: "0",
        value: 0
      },
      right: {
        id: "2",
        value: 2
      }
    },
    right: {
      id: "4",
      value: 4
    }
  },
  right: {
    id: "8",
    value: 8,
    left: {
      id: "6",
      value: 6,
      right: {
        id: "7",
        value: 7
      }
    },
    right: {
      id: "10",
      value: 10,
      left: {
        id: "9",
        value: 9
      }
    }
  }
};

export const DEFAULT_TREE_JSON = JSON.stringify(DEFAULT_TREE, null, 2);
