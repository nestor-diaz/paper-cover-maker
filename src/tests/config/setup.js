import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import postCSSPlugins from '../../../postcss.plugins';

Enzyme.configure({ adapter: new Adapter() });

require('css-modules-require-hook')({
  generateScopedName: '[local]',
  camelCase: true,
  prepend: postCSSPlugins
});
