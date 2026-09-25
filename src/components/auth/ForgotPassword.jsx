import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2 } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.resetPassword(email);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center space-y-4 py-4">
        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Instructions Dispatched
        </h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          If an account exists for <span className="font-semibold text-zinc-900 dark:text-zinc-200">{email}</span>, you will receive password reset instructions within 2 minutes.
        </p>
        <Link to="/auth/login">
          <Button variant="outline" size="sm" className="mt-4">
            Return to Sign In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        Enter the email address associated with your syndicate member account and we will send you a recovery link.
      </p>

      <Input
        label="Account Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={Mail}
        placeholder="founder@company.com"
        required
      />

      <Button
        type="submit"
        variant="gold"
        size="md"
        loading={loading}
        className="w-full"
      >
        Send Recovery Link
      </Button>

      <div className="text-center text-xs text-zinc-500 pt-2">
        Remembered your password?{' '}
        <Link to="/auth/login" className="font-semibold text-amber-600 hover:underline">
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default ForgotPassword;
