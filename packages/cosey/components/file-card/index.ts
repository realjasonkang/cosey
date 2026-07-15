import { enhanceComponent, type EnhancedComponent } from '../utils';
import FileCard from './file-card';

export * from './file-card.api';

const _FileCard: EnhancedComponent<typeof FileCard> = enhanceComponent(FileCard);

export { _FileCard as FileCard };
export default _FileCard;
