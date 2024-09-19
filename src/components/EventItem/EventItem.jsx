import css from "./EventItem.module.css"
import { Link } from 'react-router-dom';
import { FcCalendar } from 'react-icons/fc';

const EventItem = ({ title, description, event_date, organizer, image }) => {
  return (
    <div>
      <li className={css.item}>
        <div className={css.imgWrap}>
          <img className={css.itemImg} src={image} alt={title} />
        </div>

        <div className={css.itemInfo}>
          <h2 className={css.itemTitle}>{title}</h2>
          <p className={css.itemDesc}>{description}</p>

          <div className={css.organizerWrap}>
            <span>{organizer}</span>
            <span className={css.date}>
              <FcCalendar size={22} /> {event_date}
            </span>
          </div>
          <ul className={css.linkList}>
            <li>
              <Link className={css.linkItem} to="/register">Register</Link>
            </li>
            <li>
              <Link className={css.linkItem} to="/view">View</Link>
            </li>
          </ul>

          
        </div>
      </li>
    </div>
  );
};

export default EventItem;
