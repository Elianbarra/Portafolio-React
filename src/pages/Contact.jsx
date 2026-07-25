import { useState } from "react";
import { useTranslation } from "react-i18next";
import SectionHeading from "../components/SectionHeading.jsx";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

const Contact = () => {
  const { t } = useTranslation();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = (vals) => {
    const errs = {};
    if (!vals.firstName) errs.firstName = t("contact.errors.firstNameRequired");
    if (!vals.lastName) errs.lastName = t("contact.errors.lastNameRequired");
    if (!vals.email) {
      errs.email = t("contact.errors.emailRequired");
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(vals.email)) {
      errs.email = t("contact.errors.emailInvalid");
    }
    if (!vals.phone) {
      errs.phone = t("contact.errors.phoneRequired");
    } else if (!/^\d{7,15}$/.test(vals.phone.replace(/\D/g, ""))) {
      errs.phone = t("contact.errors.phoneInvalid");
    }
    if (!vals.message) errs.message = t("contact.errors.messageRequired");
    return errs;
  };

  const fields = [
    { name: "firstName", label: t("contact.fields.firstName"), type: "text" },
    { name: "lastName", label: t("contact.fields.lastName"), type: "text" },
    { name: "email", label: t("contact.fields.email"), type: "email" },
    { name: "phone", label: t("contact.fields.phone"), type: "tel" },
  ];

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
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        description={t("contact.description")}
      />

      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <p className="text-slate-400">{t("contact.reachOut")}</p>
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
            <span className="mb-1.5 block text-slate-300">{t("contact.fields.message")}</span>
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
            {t("contact.send")}
          </button>
          {sent && <p className="text-sm text-accent">{t("contact.sentMessage")}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
