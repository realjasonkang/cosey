import { enhanceComponent, type EnhancedComponent } from '../utils';
import VideoViewer from './video-viewer';

export * from './video-viewer.api';

const _VideoViewer: EnhancedComponent<typeof VideoViewer> = enhanceComponent(VideoViewer);

export { _VideoViewer as VideoViewer };
export default _VideoViewer;
