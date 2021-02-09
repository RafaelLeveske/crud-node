import { AccessControl } from 'accesscontrol';

const ac = new AccessControl();

export default (() => {
  ac.grant('basic')
    .readOwn('profile')
    .updateOwn('profile')
    .deleteOwn('profile');

  ac.grant('admin')
    .extend('basic')
    .extend('supervisor')
    .updateAny('profile')
    .deleteAny('profile');

  return ac;
})();
