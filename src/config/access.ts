import { AccessControl } from 'accesscontrol';

const ac = new AccessControl();

export default (() => {
  ac.grant('basic')
    .readOwn('profile')
    .updateOwn('profile')
    .deleteOwn('profile');

  ac.grant('admin')
    .extend('basic')
    .readAny('profile')
    .updateAny('profile')
    .deleteAny('profile');

  return ac;
})();
