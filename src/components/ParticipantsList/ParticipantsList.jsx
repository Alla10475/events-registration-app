import ParticipantItem from "../ParticipantItem/ParticipantItem";
import css from './ParticipantsList.module.css'

const ParticipantsList = ({participants}) => {
  return (
    <div>
      <ul className={css.participList}>
        {participants.map(item => (
          <ParticipantItem key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}

export default ParticipantsList