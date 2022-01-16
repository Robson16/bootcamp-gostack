import ICreateICreateNotificationDTOUserDTO from '../dtos/ICreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(data: ICreateICreateNotificationDTOUserDTO): Promise<Notification>;
}
