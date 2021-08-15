type Tobject = { [key: string]: unknown };

function getObjectValue<T>(obj: Tobject, path: string, defaultValue?: T): T | unknown {
  const objectKeys: string[] = path.split('.');
  let result: Tobject = obj;
  for (let i = 0; i < objectKeys.length; i += 1) {
    result = result[objectKeys[i]] as Tobject;

    if (result === undefined) {
      return defaultValue;
    }
  }
  return result;
}

export default getObjectValue;
