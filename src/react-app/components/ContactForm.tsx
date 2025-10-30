import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button, Form, Card, Spinner } from "react-bootstrap";
// import wireblock from "../assets/media/wireblocks/contact-wireblock.svg";

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  eventDate: string;
  service: string;
  venue: string;
  hearAboutUs: string;
  // wireblock?: string; // optional
  importance: string;
  additionalInfo: string;
  "g-recaptcha-response": string;
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ContactFormData>();

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Load reCAPTCHA script dynamically
  useEffect(() => {
    if (!(window as any).grecaptcha) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?render=6LdTcNMrAAAAAPf8b1L4ABIuyXtNlbZSeSxbTEgO";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  // Submit function
  const onSubmit = async (data: ContactFormData) => {
    try {
      setErrorMessage("");

      if (!(window as any).grecaptcha) {
        setErrorMessage("reCAPTCHA not loaded. Please refresh the page.");
        return;
      }

      // Execute reCAPTCHA v3
      const token: string = await (window as any).grecaptcha.execute(
        "6LdTcNMrAAAAAPf8b1L4ABIuyXtNlbZSeSxbTEgO", // Replace with your site key
        { action: "contact_form" }
      );

      // Add token to form data
      const payload = { ...data, "g-recaptcha-response": token };
      setValue("g-recaptcha-response", token);

      // Submit to Formspree
      const res = await fetch("https://formspree.io/f/xzzjbldj", {
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
    <section>
   

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

                  <Form.Group className="mb-3" controlId="eventDate">
                    <Form.Label>Event Date *</Form.Label>
                    <Form.Control
                      type="date"
                      {...register("eventDate", { required: true })}
                      isInvalid={!!errors.eventDate}
                    />
                    <Form.Control.Feedback type="invalid">
                      This field is required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="service">
                    <Form.Label>Service *</Form.Label>
                    <Form.Select
                      {...register("service", { required: true })}
                      isInvalid={!!errors.service}
                    >
                      <option value="">Select an option</option>
                      <option value="wedding">Wedding</option>
                      <option value="engagement">Engagement</option>
                      <option value="family">Family</option>
                      <option value="portrait">Portrait</option>
                      <option value="other">Other</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      This field is required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="venue">
                    <Form.Label>Venue *</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("venue", { required: true })}
                      isInvalid={!!errors.venue}
                    />
                    <Form.Control.Feedback type="invalid">
                      This field is required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="hearAboutUs">
                    <Form.Label>How did you hear about us? *</Form.Label>
                    <Form.Select
                      {...register("hearAboutUs", { required: true })}
                      isInvalid={!!errors.hearAboutUs}
                    >
                      <option value="">Select an option</option>
                      <option value="instagram">Instagram</option>
                      <option value="friend">Friend</option>
                      <option value="google">Google</option>
                      <option value="other">Other</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      This field is required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="additionalInfo">
                    <Form.Label>What else should we know?</Form.Label>
                    <Form.Control as="textarea" rows={3} {...register("additionalInfo")} />
                  </Form.Group>

                  {/* Hidden reCAPTCHA token */}
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
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
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

              {/* Wireblock container only if wireblock exists */}
    
       {/* {wireblock && (
        <div className="container h-100 d-flex justify-content-center align-items-center position-relative">
          <img
            src={wireblock}
            alt="Wireblock overlay"
            className="media-hero-wireblock position-absolute"
            style={{ zIndex: 2 }}
          />
        </div>
      )}  */}

    </section>
  );
}
