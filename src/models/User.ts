export default interface User {
  userId: string;
  auth: Auth | null;
}

export interface Auth {
  authId: string;
  access_token: string;
}
