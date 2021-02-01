import { ObjectID } from 'mongodb';

export default interface ICreateNotificationDTO {
  name: string;
  recipient_id: ObjectID;
}
