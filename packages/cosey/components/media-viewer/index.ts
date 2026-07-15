import { enhanceComponent, type EnhancedComponent } from '../utils';
import MediaViewer from './media-viewer';

export * from './media-viewer.api';

const _MediaViewer: EnhancedComponent<typeof MediaViewer> = enhanceComponent(MediaViewer);

export { _MediaViewer as MediaViewer };
export default _MediaViewer;
