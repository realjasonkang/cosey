import { withInstall } from '../utils';
import PagViewer from './pag-viewer';

export * from './pag-viewer';

const _PagViewer = withInstall(PagViewer);

export { _PagViewer as PagViewer };
export default _PagViewer;
