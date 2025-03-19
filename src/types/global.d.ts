interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string[];
  };
}

