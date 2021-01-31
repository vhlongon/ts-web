import axios, { AxiosResponse } from 'axios';

export interface ApiSyncInterface<T> {
  fetch(id: number): Promise<AxiosResponse>;
  save(data: T): Promise<AxiosResponse>;
}

export interface WithIdInterface {
  id?: number;
}

export const ApiSync = <T extends WithIdInterface>(
  baseURL: string
): ApiSyncInterface<T> => ({
  fetch: async (id: number): Promise<AxiosResponse> => {
    return await axios.get(`${baseURL}/${id}`);
  },
  save: async (data: T): Promise<AxiosResponse> => {
    const { id } = data;
    // if there is alrady an object with the id yet we update its value
    if (id) {
      return await axios.put(`${baseURL}/${id}`, data);

      // otherwise we create a new object with the data provided
    } else {
      return await axios.post(`${baseURL}`, data);
    }
  },
});
