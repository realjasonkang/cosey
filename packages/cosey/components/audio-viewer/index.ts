import { enhanceComponent, type EnhancedComponent } from '../utils';
import AudioViewer from './audio-viewer';

export * from './audio-viewer.api';

const _AudioViewer: EnhancedComponent<typeof AudioViewer> = enhanceComponent(AudioViewer);

export { _AudioViewer as AudioViewer };
export default _AudioViewer;
