// import css from './RegistrationForm.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const UserRegisterSchema = Yup.object().shape({
  fullName: Yup.string().min(3, 'Too Short!').max(50, 'Too long!'),
  email: Yup.string()
    .email('Must be a valid email!')
    .required('Email is required'),
  dateOfBirth: Yup.date()
    .required('Date of Birth is required')
    .max(
      new Date(Date.now() - 567648000000),
      'You must be at least 18 years old'
    ),
});

const INITIAL_FORM_DATA = {
    fullName: "",
    email: "",
    dateOfBirth: null,
}

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
      resolver: yupResolver(UserRegisterSchema), defaultValues: INITIAL_FORM_DATA,
  });
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const onSubmit = data => {
    console.log(data);
    alert('Form submitted successfully!');
  };

  const handleDateChange = date => {
    setDateOfBirth(date);
    setValue('dateOfBirth', date, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Event registration</p>
      <div>
        <label htmlFor="fullName">Full name</label>
        <input
          id="fullName"
          {...register('fullName', { required: 'Full name is required' })}
          placeholder="Den Brown"
        />
        {errors.fullName && <p>{errors.fullName.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required!',
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: 'Invalid email address',
            },
          })}
          placeholder="denbrown@example.com"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="dateOfBirth"></label>
        <DatePicker
          id="dateOfBirth"
          selected={dateOfBirth}
          onChange={handleDateChange}
          dateFormat="yyy/MM/dd"
          placeholderText="Select your date of birth"
        />
        {errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}
      </div>

      <div>
        <label>Where did you hear about this event?</label>
        <div>
          <label>
            <input
              type="radio"
              value="social_media"
              {...register('eventSource', {
                required: 'Choose one of the options!',
              })}
            />
            Social media
          </label>
        </div>

        <div>
          <label>
            <input
              type="radio"
              value="friends"
              {...register('eventSource', {
                required: 'Choose one of the options!',
              })}
            />
            Friends
          </label>
        </div>

        <div>
          <label>
            <input
              type="radio"
              value="found_myself"
              {...register('eventSource', {
                required: 'Choose one of the options!',
              })}
            />
            Found myself
          </label>
        </div>
      </div>

      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default RegistrationForm;
