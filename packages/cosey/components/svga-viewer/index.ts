import { enhanceComponent, type EnhancedComponent } from '../utils';
import SvgaViewer from './svga-viewer';

export * from './svga-viewer';

const _SvgaViewer: EnhancedComponent<typeof SvgaViewer> = enhanceComponent(SvgaViewer);

export { _SvgaViewer as SvgaViewer };
export default _SvgaViewer;
