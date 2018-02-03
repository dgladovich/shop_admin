import UserType from '../types/UserType';
import db from '../../db/models';

const me = {
  type: UserType,
  resolve({ request }) {
    return (
        db.shop_user.findAll().then((users)=>{
            return users;
        })
    );
  },
};

export default me;
