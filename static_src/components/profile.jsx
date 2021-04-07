import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeName } from '../store/profile/actions';

const Profile = () => {
  const profile = useSelector(state => state.profile);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    setValue(evt.target.value);
  }

  const handleChangeName = () => {
    dispatch(changeName(value));
    setValue('');
  }

  return <>
    <h1>Profile Page: {profile.name}</h1>
    <h3>Change Name</h3>
    <input type="text" name="name" value={value} onChange={handleChange} />
    <button onClick={handleChangeName}>Change</button>
  </>;
}

export default Profile;