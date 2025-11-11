import { useState } from 'react';

type ValidationErrors = {
  [key: string]: string;
};

export const useFormValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'topic':
        return !value ? 'Topic is required' : '';
      case 'name':
        return !value ? 'Presenter name is required' : '';
      case 'email':
        return !value
          ? 'Email is required'
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? 'Invalid email format'
          : '';
      case 'duration': {
        if (!value) return 'Duration is required';
        const num = parseInt(value, 10);
        if (isNaN(num)) return 'Duration must be a number';
        if (num < 10 || num > 120) return 'Duration must be between 10 and 120';
        return '';
      }
      default:
        return '';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  const hasErrors = Object.keys(errors).some((key) => errors[key]);

  return {
    errors,
    handleBlur,
    hasErrors
  };
};
