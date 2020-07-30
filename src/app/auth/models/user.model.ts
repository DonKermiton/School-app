export interface Roles {
  admin?:boolean;
  editor?:boolean;
  sub?: boolean;
}

export interface User {
  uid: string;
  email: string;
  roles?: Roles;
  photoURL?: string;
  displayName?: string;
  group?: string
}
