import { enhanceComponent, type EnhancedComponent } from '../utils';
import Upload from './upload';

export * from './upload.api';

const _Upload: EnhancedComponent<typeof Upload> = enhanceComponent(Upload);

export { _Upload as Upload };
export default _Upload;
