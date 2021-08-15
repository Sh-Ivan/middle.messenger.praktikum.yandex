import Store from '../helpers/store';

const initialState = {
  user: null,
};

const UserStore: Store = new Store(initialState);

export default UserStore;
