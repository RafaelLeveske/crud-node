import { AccessControl } from 'accesscontrol';

const ac = new AccessControl();

export default (() => {
  ac.grant('basic')
    .readOwn('profile')
    .updateOwn('profile')
    .deleteOwn('profile')
    .readOwn('company-profile')
    .updateOwn('company-profile')
    .deleteOwn('company-profile')
    .readOwn('product-profile')
    .updateOwn('product-profile')
    .deleteOwn('product-profile');

  ac.grant('admin')
    .extend('basic')
    .readAny('profile')
    .updateAny('profile')
    .deleteAny('profile')
    .readAny('company-profile')
    .updateAny('company-profile')
    .deleteAny('company-profile')
    .readAny('product-profile')
    .updateAny('product-profile')
    .deleteAny('product-profile');

  return ac;
})();
