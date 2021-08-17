import ResourceAPI from '../api/resource-api';

const resourceAPIInstance = new ResourceAPI();

class ResorceController {
  sendFile<T>(data: { form: FormData }): Promise<T> {
    return resourceAPIInstance
      .sendFile(data)
      .then(({ response }) => JSON.parse(response))
      .catch(console.log);
  }
}

export default ResorceController;
