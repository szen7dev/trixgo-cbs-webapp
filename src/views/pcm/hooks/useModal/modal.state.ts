const modalState = {
  isShow: false,

  type: "relation",
};

export type StateProps = Omit<typeof modalState, "type"> & {
  type: "relation" | "email";
};
export default modalState;
