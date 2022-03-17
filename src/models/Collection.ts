import axios, { AxiosResponse } from 'axios';
import { User, UserProps } from './User';
import { Eventing } from './Eventing';

export class Collection<T, K> {
	models: T[] = [];
	events: Eventing = new Eventing();

	constructor(public baseURL: string, public deserilize: (props: K) => T) {}

	get on() {
		return this.events.on;
	}

	get trigger() {
		return this.events.trigger;
	}

	fetch(): void {
		axios.get(this.baseURL).then((res: AxiosResponse) => {
			res.data.forEach((item: K) => {
				this.models.push(this.deserilize(item));
			});
			this.trigger('change');
		});
	}
}
