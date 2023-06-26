import React, { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

interface PasswordFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ onChange, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      margin="normal"
      fullWidth
      required
      id="password"
      label="Password"
      variant="outlined"
      type={showPassword ? 'text' : 'password'}
      name={name}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
