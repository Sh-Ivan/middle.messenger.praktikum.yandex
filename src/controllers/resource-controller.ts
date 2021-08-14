import ResourceAPI from '../api/resource-api';

const resourceAPIInstance = new ResourceAPI();

class ResorceController {
  sendFile<T>(data: { [key: string]: string }): Promise<T> {
    return resourceAPIInstance
      .sendFile(data)
      .then((result: XMLHttpRequest) => {
        console.log(result);
        if (result.status === 200) {
          //return JSON.parse(result.response);
        }
        return JSON.parse(result.response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default ResorceController;
