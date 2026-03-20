export type User = {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  address: {
    city: string;
  };
  isLocal?: boolean;
};
