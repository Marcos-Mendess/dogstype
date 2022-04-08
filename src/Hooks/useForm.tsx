import { useState } from 'react';

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um email válido',
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message:
      'A senha precisa ter no mínimo um dígito, uma letra maiúscula, uma letra minúscula. Com no mínimo 8 caracteres',
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize números apenas',
  },
};

const useForm = (type: 'password' | 'email' | 'number' | null) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<null | string>(null);

  function validate(value: string) {
    if (value.length === 0) {
      setError('Preencha um valor.');
      return false;
    } else if (typeof type === 'string') {
      if (types[type] && !types[type].regex.test(value)) {
        setError(types[type].message);
        return false;
      }
    } else {
      setError(null);
      return true;
    }
  }

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (error) validate(target.value);
    setValue(target.value);
  };

  return {
    value,
    onChange,
    error,
    onBlur: () => validate(value),
  };
};

export default useForm;
