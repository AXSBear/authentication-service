import { Session } from '../../Models/Entities/Session';
import { User } from '../../Models/Entities/User';

/**
 * Описние сервиса управления сессиями пользоватлей
 */
export interface ISessionService {

  /**
   * Сохраниь сессию пользоваеля
   * @param session - сессия
   */
  saveSession(session: Session): Promise<boolean>;

  /**
   * Закрыть сессию пользователя
   * @param session
   */
  closeSession(session: Session): Promise<boolean>;

  /**
   * Получить сессию пользователя
   * @param user - пользователь
   */
  getUserSessions(user: User): Promise<Session>;
}
