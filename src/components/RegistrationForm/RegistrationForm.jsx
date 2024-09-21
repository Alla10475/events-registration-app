import css from './RegistrationForm.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FcCalendar } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const INITIAL_FORM_DATA = {
  fullName: '',
  email: '',
  dateOfBirth: null,
};

const UserRegisterSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too long!')
    .required('Full name is required'),
  email: Yup.string()
    .email('Must be a valid email!')
    .required('Email is required'),
  dateOfBirth: Yup.date()
    .required('Date of Birth is required')
    .max(
      new Date(Date.now() - 567648000000), // Вік мінімум 18 років
      'You must be at least 18 years old'
    ),
  eventSource: Yup.string().required(
    'Please select an option'
  ),
});

const RegistrationForm = ({ eventId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(UserRegisterSchema),
    defaultValues: INITIAL_FORM_DATA,
  });

  const [dateOfBirth, setDateOfBirth] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async data => {
    try {
      const payload = {
        ...data,
        eventId,
      };

      const response = await axios.post(
        'https://66edc695380821644cddf724.mockapi.io/api/v1/register',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        alert(`Registration successful for event ID: ${eventId}`);
        navigate('/');
      } else {
        alert('Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleDateChange = date => {
    setDateOfBirth(date);
    setValue('dateOfBirth', date, { shouldValidate: true });
  };

  return (
    <form className={css.registerForm} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.registerFormTitle}>Event registration</h2>

      <div className={css.inputWrap}>
        <label className={css.formLabel} htmlFor="fullName">
          Full name
        </label>
        <input
          id="fullName"
          {...register('fullName')}
          placeholder="Den Brown"
        />
        {errors.fullName && <p>{errors.fullName.message}</p>}
      </div>

      <div className={css.inputWrap}>
        <label className={css.formLabel} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          placeholder="denbrown@example.com"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div className={css.inputWrap}>
        <label className={css.formLabel} htmlFor="dateOfBirth">
          Date of birth
        </label>
        <DatePicker
          className={css.dateInput}
          id="dateOfBirth"
          selected={dateOfBirth}
          onChange={handleDateChange}
          dateFormat="yyy/MM/dd"
          placeholderText="Select your date of birth"
        />
        <FcCalendar className={css.calendarSvg} size={26} />
        {errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}
      </div>

      <div>
        <label className={css.formLabel}>
          Where did you hear about this event?
        </label>
        <div className={css.radioWrap}>
          <div>
            <label>
              <input
                type="radio"
                value="social_media"
                {...register('eventSource')}
              />
              Social media
            </label>
          </div>

          <div>
            <label>
              <input
                type="radio"
                value="friends"
                {...register('eventSource')}
              />
              Friends
            </label>
          </div>

          <div>
            <label>
              <input
                type="radio"
                value="found_myself"
                {...register('eventSource')}
              />
              Found myself
            </label>
          </div>
        </div>
        {errors.eventSource && <p>{errors.eventSource.message}</p>}
      </div>

      <div>
        <button className={css.registerBtn} type="submit">
          Register
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
