// import Vue from 'vue';
// // ts识别vue
// declare module '*.vue' {
//   import Vue from 'vue';
//   export default Vue;
// }

import * as lodash from 'lodash';
declare global {
  const _: typeof lodash;
}

import * as underscore from 'underscore';
declare global {
  const _underscore: typeof underscore;
}