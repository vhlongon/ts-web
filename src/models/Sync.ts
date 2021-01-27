import axios from 'axios';

interface WithId {
  id?: number;
}

export const Sync = <T extends WithId>(baseURL: string) => {
  return {
    fetch: async (id: number): Promise<T> => {
      const response = await axios.get(`${baseURL}/${id}`);
      return response.data;
    },
    save: async (data: T): Promise<T> => {
      const { id } = data;
      // if there is alrady an object with the id yet we update its value
      if (id) {
        const response = await axios.put(`${baseURL}/${id}`, data);
        return response.data;
        // otherwise we create a new object with the data provided
      } else {
        const response = await axios.post(`${baseURL}`, data);
        return response.data;
      }
    },
  };
};
