import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {
	eventsMap(): { [key: string]: () => void } {
		return {
			'click:.set-name': this.onChangeName.bind(this),
			'click:.set-age': this.onSetRandomAge,
			'click:.save-user': this.onSaveUser,
		};
	}

	onChangeName(): void {
		const input: HTMLInputElement | null =
			this.parent.querySelector('.name-input');
		if (input) {
			this.model.set({ name: input.value });
		}
	}

	onSetRandomAge = (): void => {
		this.model.set({ age: Math.floor(Math.random() * 99) });
		// this.render();
	};

	onSaveUser = (): void => {
		this.model.save();
	};

	template(): string {
		return `
      <div>
        <h1>User Form</h1>
        <div>
          <p>User Name: ${this.model.get('name')}</p>
          <input class="name-input" />
          <button class="set-name">Change Name</button>
        </div>
        <br>
        <div>
          <label>User Age: ${this.model.get('age')}</label>
          <button class="set-age">Random Age</button>
        </div>
        <br>
        <button class="save-user">Save User</button>
      </div>
    `;
	}
}
