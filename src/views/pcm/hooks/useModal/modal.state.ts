const modalState = {
  isShow: false,
  type: "relation",
};

export type StateProps = Omit<typeof modalState, "type"> & {
  type: "relation" | "email" | 'move-task-to-parent' | 'move-task-to-group' | 'update-milestone';
};
export default modalState;
