import { enhanceComponent, type EnhancedComponent } from '../utils';
import Editor from './editor';

export * from './editor.api';

const _Editor: EnhancedComponent<typeof Editor> = enhanceComponent(Editor);

export { _Editor as Editor };
export default _Editor;
