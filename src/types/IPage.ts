export interface IPage {
  path: string;
  Component: React.ComponentType<any>;
  requireAuth: boolean;
  // userType: USER_TYPE_ENUM
}
