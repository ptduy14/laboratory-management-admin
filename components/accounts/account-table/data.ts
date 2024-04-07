interface Role {
  id: number;
  name: string;
  status: number;
  value: string;
}

export interface Account {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  password: string;
  photo: string | null;
  refresh_token: string | null;
  repass_token: string | null;
  roles: Role[];
  status: number;
  token: string;
  updatedAt: string;
}

export const columns = [
  {
    key: "firstName",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "actions",
    label: "ACTION",
  },
];

export const statusOptions = [
  {name: "Active", uid: 0},
  {name: "Not Active", uid: 1},
];

export const roleOptions = [
  {name: "USER", uid: 'USER'},
  {name: "MANAGER", uid: 'MANAGER'},
  {name: "ADMIN", uid: 'ADMIN'},
];