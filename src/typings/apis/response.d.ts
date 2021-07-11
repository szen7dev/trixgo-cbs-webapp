enum StatusCode {
  400 = 400,
  401 = 401,
  403 = 403,
  500 = 500,
}

export type APIResponse = {
  error: boolean;
  status: StatusCode;
  message: string;
};
