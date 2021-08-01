import AuthAPI from '../api/auth-api';

const authAPIInstance = new AuthAPI();

const signupController = (data: { [key: string]: string }): void => {
  authAPIInstance.create(data).then((result) => console.log(result));
};

export default signupController;
