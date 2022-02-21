export const modalState = {
  isShow: false,
  title: "",
  documentID: "",
  departmentId: "",
  departmentInfo: {} as {
    company?: {
      _id: string;
    };
  },
  onSubmit: (values: any) => values,
  initialValues: {} as Record<string, any>,
};

export type StateProps = typeof modalState;
