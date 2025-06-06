import React, { useState, useId } from 'react';

interface EmailFormProps {
  placeholder?: string;
  onSubmit?: (email: string) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ 
  placeholder = "Enter your email", 
  onSubmit 
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  // Use useId to generate unique IDs for each form instance
  const emailId = useId();
  const formId = useId();
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Call the optional onSubmit callback
    if (onSubmit) {
      onSubmit(email);
    }
    
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 3000);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };
  
  if (isSubmitted) {
    return (
      <div className="email-form success">
        <div className="success-message">
          ✓ Email submitted successfully!
        </div>
        <div className="submitted-email">
          {email}
        </div>
      </div>
    );
  }
  
  return (
    <form id={formId} className="email-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor={emailId} className="email-label">
          Email Address
        </label>
        <input
          id={emailId}
          type="email"
          value={email}
          onChange={handleChange}
          placeholder={placeholder}
          className={`email-input ${error ? 'error' : ''}`}
          aria-describedby={error ? `${emailId}-error` : undefined}
        />
        {error && (
          <div id={`${emailId}-error`} className="error-message" role="alert">
            {error}
          </div>
        )}
      </div>
      
      <button 
        type="submit" 
        className="submit-button"
        disabled={!email.trim()}
      >
        Submit
      </button>
    </form>
  );
};

export default EmailForm;