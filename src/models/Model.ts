import { AxiosPromise, AxiosResponse, AxiosError } from 'axios';

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(updateProps: T): void;
  getAll(): T;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ){};

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(updateData: T): void {
    this.attributes.set(updateData);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.attributes.get('id');
    if(typeof id !== 'number') {
      throw new Error('User id does not exist.');
    }
    this.sync.fetch(id)
      .then((res: AxiosResponse): void => {
          this.set(res.data);
      })
      .catch((err: AxiosError) => console.log(err))
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
      .then((res: AxiosResponse) => {
        this.trigger('save');
      });
  }
}