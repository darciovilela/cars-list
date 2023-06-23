import { Item } from '../interfaces/car';
import { getImageName } from '../helpers/getImageName';

interface ItemProps {
	item: Item;
	completeItem(itemNameToDelete: number): void;
	setActiveItem: Function;
}

export const ItemList: React.FC<ItemProps> = ({
	item,
	completeItem,
	setActiveItem,
}) => {
	return (
		<div>
			<div className="flex-container">
				{item.id} - {item.make} - {item.model}
				<img src={`./${getImageName(item.model)}.png`} alt="" />
			</div>
			<button className="edit" onClick={() => setActiveItem(item)}>
				Edit
			</button>
			<button className="remove" onClick={() => completeItem(item.id)}>
				Delete
			</button>
		</div>
	);
};
