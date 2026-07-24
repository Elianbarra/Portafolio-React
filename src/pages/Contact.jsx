import { useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

function validate(values) {
  const errors = {};
  if (!values.firstName) errors.firstName = "First name is required";
  if (!values.lastName) errors.lastName = "Last name is required";
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
    errors.email = "Invalid email";
  }
  if (!values.phone) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{7,15}$/.test(values.phone.replace(/\D/g, ""))) {
    errors.phone = "Invalid phone number";
  }
  if (!values.message) errors.message = "This field is required";
  return errors;
}

const fields = [
  { name: "firstName", label: "First name", type: "text" },
  { name: "lastName", label: "Last name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
];

const Contact = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSent(true);
      setValues(initialValues);
      setTimeout(() => setSent(false), 4000);
    }
  };

  return (
    <div className="section">
      <SectionHeading
        eyebrow="Contact"
        title="Let's talk"
        description="Have a project in mind, or just want to say hi? Send me a message."
      />

      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <p className="text-slate-400">
            The fastest way to reach me is by email — I try to reply within a day.
          </p>
          <a
            href="mailto:elianbarra@gmail.com"
            className="card flex items-center gap-3 p-5 font-mono text-accent hover:border-accent/40"
          >
            elianbarra@gmail.com
          </a>
        </div>

        <form onSubmit={handleSubmit} noValidate className="card space-y-5 p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((field) => (
              <label key={field.name} className="block text-sm">
                <span className="mb-1.5 block text-slate-300">{field.label}</span>
                <input
                  type={field.type}
                  name={field.name}
                  value={values[field.name]}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-slate-100 outline-none transition focus:border-accent/60"
                />
                {errors[field.name] && (
                  <span className="mt-1 block text-xs text-rose-400">{errors[field.name]}</span>
                )}
              </label>
            ))}
          </div>

          <label className="block text-sm">
            <span className="mb-1.5 block text-slate-300">Message</span>
            <textarea
              name="message"
              rows={5}
              value={values.message}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-slate-100 outline-none transition focus:border-accent/60"
            />
            {errors.message && <span className="mt-1 block text-xs text-rose-400">{errors.message}</span>}
          </label>

          <button type="submit" className="btn-primary w-full sm:w-auto">
            Send message
          </button>
          {sent && <p className="text-sm text-accent">Message sent! (demo — no backend wired up yet)</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
