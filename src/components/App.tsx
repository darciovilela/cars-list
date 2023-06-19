import { useState } from 'react';
import { Item } from '../interfaces/car';
import { Car } from '../interfaces/car';
import { cars } from '../data/cars';
import { ItemList } from './ItemList';
import { Form } from './Form';

const getNextId = (item: Item[]) => {
	return Math.max(...item.map((item) => item.id)) + 1;
};

export const App: React.FC = () => {
	const [item, setItem] = useState(cars);
	const [idCounter, setIdCounter] = useState(getNextId(item));
	const [activeItem, setActiveItem] = useState<Item | null>(null);

	const addItem = (sample: Item) => {
		const newItem = {
			id: idCounter,
			make: sample.make,
			model: sample.model,
		};

		setIdCounter(idCounter + 1);
		setItem([...item, newItem]);
		setActiveItem(null);
	};

	const updateItem = (id: number, car: Car) => {
		setItem(
			item.map((item) =>
				item.id === id
					? {
							id,
							...car,
					  }
					: item
			)
		);
	};

	const completeItem = (itemNameToDelete: number) => {
		const remainingItems = item.filter((item) => item.id !== itemNameToDelete);
		setItem(remainingItems);
	};

	return (
		<div>
			<Form
				items={item}
				addItem={addItem}
				updateItem={updateItem}
				activeItem={activeItem}
			/>

			{item.map((item) => (
				<ItemList
					key={item.id}
					item={item}
					completeItem={completeItem}
					setActiveItem={setActiveItem}
				/>
			))}
		</div>
	);
};
