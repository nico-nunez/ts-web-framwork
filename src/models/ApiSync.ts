import axios, { AxiosPromise, AxiosError } from 'axios';
import { UserProps } from './User';


interface HasId {
  id?: number;
}

export class ApiSync<T extends HasId> {
  constructor(public baseURL: string) {};
  fetch = (id: number): AxiosPromise => {
    return axios.get(`${this.baseURL}/${id}`);
  }

  save = (data: T): AxiosPromise => {
    const { id } = data;
    if(id) {
      return axios.put(`${this.baseURL}/${id}`, data);
    };
    return axios.post(this.baseURL, data);
  }
}