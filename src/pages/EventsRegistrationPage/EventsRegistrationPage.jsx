import RegistrationForm from "../../components/RegistrationForm/RegistrationForm"
import { useParams } from "react-router-dom"

const EventsRegistrationPage = () => {
  const { id } = useParams(); 

  return (
    <div>
      <RegistrationForm eventId={ id} />
    </div>
  )
}

export default EventsRegistrationPage