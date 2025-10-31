import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button, Form, Card, Spinner } from "react-bootstrap";

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  eventDate: string;
  service: string;
  venue: string;
  hearAboutUs: string;
  importance: string;
  additionalInfo: string;
  "g-recaptcha-response": string;
}

interface ContactFormProps {
  isSticky?: boolean; // <-- new prop
}

export default function ContactForm({ isSticky = true }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ContactFormData>();

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!(window as any).grecaptcha) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?render=6Le1qPwrAAAAAGBKLuJbv6ZA-igC9Ha11hKFr80q";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    try {
      setErrorMessage("");

      if (!(window as any).grecaptcha) {
        setErrorMessage("reCAPTCHA not loaded. Please refresh the page.");
        return;
      }

      const token: string = await (window as any).grecaptcha.execute(
        "6Le1qPwrAAAAAGBKLuJbv6ZA-igC9Ha11hKFr80q",
        { action: "contact_form" }
      );

      const payload = { ...data, "g-recaptcha-response": token };
      setValue("g-recaptcha-response", token);

      const res = await fetch("https://formspree.io/f/xjkpevqv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const text = await res.text();
        console.error("Formspree error:", text);
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className={isSticky ? "project-sticky-column" : "project-nonsticky-column"}>
      <Card className="project-form-container">
        {success ? (
          <h3 className="text-center text-success">
            Thank you! Your message has been sent.
          </h3>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h4 className="mb-4">Let's Chat</h4>
            <hr />
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name here"
                {...register("fullName", { required: true })}
                isInvalid={!!errors.fullName}
              />
              <Form.Control.Feedback type="invalid">
                This field is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                placeholder="E.g. myemail@email.com"
                {...register("email", { required: true })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                Valid email required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control
                type="tel"
                placeholder="E.g. 585-444-0755"
                {...register("phone", { required: true })}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                This field is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="additionalInfo">
              <Form.Label>What are you looking for?</Form.Label>
              <Form.Control as="textarea" rows={3} {...register("additionalInfo")} />
            </Form.Group>

            <input type="hidden" {...register("g-recaptcha-response")} />

            <small className="d-block mb-3 text-muted">
              This site is protected by reCAPTCHA and the Google{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>{' '}
              apply.
            </small>

            <div className="d-grid">
              <Button type="submit" variant="outline-dark" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                    Sending...
                  </>
                ) : (
                  "Send"
                )}
              </Button>
            </div>
          </Form>
        )}
      </Card>
    </section>
  );
}
