import css from './ParticipantItem.module.css'

const ParticipantItem = ({fullName, email}) => {
  return (
      <div className={css.cardWrap}>
          <h2>{fullName}</h2>
          <p>{email}</p>
    </div>
  )
}

export default ParticipantItem