const createShareVariables = (): Map<"open" | "close", () => void> => {
  const actions = new Map();
  actions.set("open", () => alert("not implemented"));
  actions.set("close", () => alert("not implemented"));

  return actions;
};

export default createShareVariables;
