import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      await emailjs.send(
        "service_ph2mt8m",
        "template_y2fe6j6",
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "inANt-lxyMnymCxtM"
      );

      setStatus("MESSAGE TRANSMITTED ✓");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("TRANSMISSION FAILED ✗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-10 h-full">

      {/* FORM */}

      <div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="
              w-full
              bg-transparent
              border
              border-green-500
              px-4
              py-3
              rounded
              text-green-400
            "
          />

          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="
              w-full
              bg-transparent
              border
              border-green-500
              px-4
              py-3
              rounded
              text-green-400
            "
          />

          <input
            required
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="
              w-full
              bg-transparent
              border
              border-green-500
              px-4
              py-3
              rounded
              text-green-400
            "
          />

          <textarea
            required
            rows="7"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            className="
              w-full
              bg-transparent
              border
              border-green-500
              px-4
              py-3
              rounded
              text-green-400
            "
          />

          <button
            disabled={loading}
            type="submit"
            className="
              border
              border-green-500
              text-green-400
              px-8
              py-3
              rounded
              hover:bg-green-500
              hover:text-black
              transition-all
              cursor-pointer
            "
          >
            {loading
              ? "TRANSMITTING..."
              : "SEND MESSAGE"}
          </button>

          {status && (
            <p className="text-green-400 font-bold mt-4">
              {status}
            </p>
          )}

        </form>
      </div>

      {/* INFO */}

      <div className="space-y-8">

        <div>
          <h3 className="text-green-400 text-2xl mb-2">
            Email
          </h3>

          <a
            href="mailto:shubhamppandey1084@gmail.com"
            className="text-gray-300 hover:text-green-400 transition"
          >
            shubhamppandey1084@gmail.com
          </a>
        </div>

        <div>
          <h3 className="text-green-400 text-2xl mb-2">
            Phone
          </h3>

          <a
            href="tel:+919373148088"
            className="text-gray-300 hover:text-green-400 transition"
          >
            +91 93731 48088
          </a>
        </div>

        <div>
          <h3 className="text-green-400 text-2xl mb-2">
            LinkedIn
          </h3>

          <a
            href="https://www.linkedin.com/in/shubham-pandey-6a65a524a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-green-400 transition"
          >
            linkedin.com/in/shubham-pandey
          </a>
        </div>

        <div>
          <h3 className="text-green-400 text-2xl mb-2">
            GitHub
          </h3>

          <a
            href="https://github.com/Shubhampandey1git"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-green-400 transition"
          >
            github.com/Shubhampandey1git
          </a>
        </div>

        <div>
          <span className="text-green-400 font-semibold">
            ● Available for AI / ML Opportunities
          </span>
        </div>

      </div>

    </div>
  );
}