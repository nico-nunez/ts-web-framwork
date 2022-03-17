import { UserForm } from './views/UserForm';
import { User } from './models/User';

const root = document.querySelector('#root');

if (root) {
	const user = User.buildUser({ name: 'Jane', age: 25 });
	const userForm = new UserForm(root, user);
	userForm.render();
} else {
	throw new Error('Root element not found');
}
