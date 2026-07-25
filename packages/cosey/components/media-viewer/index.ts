import { enhanceComponent, type EnhancedComponent } from '../utils';
import MediaViewer from './media-viewer';
import MediaViewerDialog from './media-viewer-dialog';

export * from './media-viewer.api';
export * from './media-viewer-dialog.api';

const _MediaViewer: EnhancedComponent<typeof MediaViewer> = enhanceComponent(MediaViewer);
const _MediaViewerDialog: EnhancedComponent<typeof MediaViewerDialog> =
  enhanceComponent(MediaViewerDialog);

export { _MediaViewer as MediaViewer, _MediaViewerDialog as MediaViewerDialog };
export default _MediaViewer;
