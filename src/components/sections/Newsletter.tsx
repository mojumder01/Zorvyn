import { useState, type FormEvent } from 'react';
import { Mail } from 'lucide-react';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [joined, setJoined] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setJoined(true); // Demo store: nothing is sent anywhere
  };

  return (
    <section aria-labelledby="newsletter-title" className="mx-auto max-w-6xl px-4 pb-14">
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-orange-50 px-6 py-10 text-center ring-1 ring-orange-100">
        <span className="grid size-12 place-items-center rounded-full bg-brand text-white">
          <Mail className="size-5" aria-hidden />
        </span>
        <h2 id="newsletter-title" className="text-2xl font-bold">
          Get 10% off your first order
        </h2>
        <p className="max-w-md text-sm text-slate-600">New drops, restocks and members-only deals. No spam — unsubscribe any time.</p>
        {joined ? (
          <p className="font-semibold text-emerald-700" role="status">
            Thanks for joining! (Demo store — no email will be sent.)
          </p>
        ) : (
          <form onSubmit={submit} noValidate className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              aria-invalid={!!error}
              aria-describedby="newsletter-error"
              className="flex-1 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            <button type="submit" className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800">
              Subscribe
            </button>
          </form>
        )}
        <p id="newsletter-error" className="text-sm text-red-600">
          {error}
        </p>
      </div>
    </section>
  );
}
