import EventItem from "../EventItem/EventItem"
import css from './EventsList.module.css'

const EventsList = ({events}) => {
  return (
    <div>
      <ul className={css.eventList}>
        {events.map(item => <EventItem key={item.id} {...item} />)}
      </ul>
    </div>
  )
}

export default EventsList