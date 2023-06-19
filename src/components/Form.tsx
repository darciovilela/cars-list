import { useState, useEffect, ChangeEvent } from 'react';
import { Item } from '../interfaces/car';

interface FormProps {
	items: Item[];
	addItem: Function;
	updateItem: Function;
	activeItem: null | Item;
}

export const Form: React.FC<FormProps> = ({
	items,
	addItem,
	updateItem,
	activeItem,
}) => {
	const [make, setMake] = useState('');
	const [model, setModel] = useState('');
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		if (activeItem) {
			setMake(activeItem.make);
			setModel(activeItem.model);
		} else {
			setMake('');
			setModel('');
		}
	}, [activeItem]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage(null);

		if (activeItem) {
			updateItem(activeItem.id, {
				make: make,
				model: model,
			});
		} else {
			const itemExists = items.map((item) => item.model).includes(model);

			if (itemExists) {
				setErrorMessage(`Item ${model} already exists.`);
				return;
			}

			addItem({
				make: make,
				model: model,
			});
		}

		setMake('');
		setModel('');
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		if (name === 'make') {
			setMake(value);
		} else if (name === 'model') {
			setModel(value);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<fieldset>
				{errorMessage && <div className="error">{errorMessage}</div>}
				<legend>Cars</legend>
				<input
					type="text"
					name="make"
					placeholder="Insert make"
					value={make}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="model"
					placeholder="Insert model"
					value={model}
					onChange={handleChange}
				/>
				<input
					className="form-submit"
					type="submit"
					value={activeItem ? 'Update' : 'Add'}
				/>
			</fieldset>
		</form>
	);
};
