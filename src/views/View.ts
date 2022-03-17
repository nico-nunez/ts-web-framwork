import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
	regions: { [key: string]: Element } = {};
	constructor(public parent: Element, public model: T) {
		this.model.on('change', () => this.render());
	}

	abstract eventsMap(): { [key: string]: () => void };
	abstract template(): string;

	regionsMap(): { [key: string]: string } {
		return {};
	}

	bindEvents(fragment: DocumentFragment): void {
		const eventsMap = this.eventsMap();
		for (let event in eventsMap) {
			const [eventName, selector] = event.split(':');
			fragment.querySelectorAll(selector).forEach((element) => {
				element.addEventListener(eventName, eventsMap[event]);
			});
		}
	}

	mapRegions(fragment: DocumentFragment): void {
		const regionsMap = this.regionsMap();

		for (let key in regionsMap) {
			const selector = regionsMap[key];
			const element = fragment.querySelector(selector);
			if (element) this.regions[key] = element;
		}
	}

	render(): void {
		this.parent.innerHTML = '';
		const templateElement = document.createElement('template');
		templateElement.innerHTML = this.template();
		this.bindEvents(templateElement.content);
		this.parent.append(templateElement.content);
	}
}
