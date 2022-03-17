import { Model } from './Model';
import { Attributes } from './Attributes';
import { ApiSync } from './ApiSync';
import { Eventing } from './Eventing';
import { Collection } from './Collection';

const usersURL = 'http://localhost:3000/users';

export interface UserProps {
	name?: string;
	age?: number;
	id?: number;
}

export class User extends Model<UserProps> {
	static buildUser(props: UserProps): User {
		return new User(
			new Attributes<UserProps>(props),
			new Eventing(),
			new ApiSync<UserProps>(usersURL)
		);
	}

	static buildUserCollection(usersURL: string) {
		return new Collection<User, UserProps>(usersURL, this.buildUser);
	}
}
