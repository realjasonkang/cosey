import { enhanceComponent, type EnhancedComponent } from '../utils';
import PagViewer from './pag-viewer';

export * from './pag-viewer';

const _PagViewer: EnhancedComponent<typeof PagViewer> = enhanceComponent(PagViewer);

export { _PagViewer as PagViewer };
export default _PagViewer;
