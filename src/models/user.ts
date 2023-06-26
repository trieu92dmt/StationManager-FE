export interface User {
  data: {
    accountId: string;
    token: string;
    userName: string;
    role: string;
    webPermission: {
      pageModel:[
        {
          pageId: string;
          pageName: string;
          pageUrl: string;
        }
      ];
      pagePermissionModel: [
        {
          functionId: string;
          pageId: string;
        }
      ];
    };
  };
  isSuccess: boolean;
}

export interface UserRegister {
  fullname: string,
  username: string,
  password: string,
  email: string,
  phoneNumber: string
}