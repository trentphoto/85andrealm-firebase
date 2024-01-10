import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {

    const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM!);

    if (state.succeeded) {
      return <p className='font-bold text-green-600'>Success! Thank you for the message.</p>;
    }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col max-w-xl gap-2'>
      <input
        id="email"
        type="email" 
        name="email"
        placeholder='Your email address'
        className='mb-4 p-4 rounded-lg bg-gray-100'
        />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <textarea
        id="message"
        name="message"
        placeholder='Message'
        className='mb-4 p-4 rounded-lg bg-gray-100'
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button 
        type="submit" 
        disabled={state.submitting}
        className='bg-gray-800 text-white p-4 rounded-lg'
      >
        Submit
      </button>
    </form>
  );
}
