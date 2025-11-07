import React, { useState } from "react";
import {
  Send,
  Phone,
  MapPin,
  Mail,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("Please fill in all required fields correctly.");
      return;
    }

    const form = new FormData();
    form.append("access_key", "4a059e1c-e775-4e79-a769-59c338b21b38");
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("subject", formData.subject || "New Contact Form Submission");
    form.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        setStatus(result.message || "There was an error sending your message.");
      }
    } catch (error) {
      setStatus("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <main className="pt-20 bg-[#04081A] text-white min-h-screen overflow-x-hidden">
      <section className="hero min-h-screen flex items-center relative px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-screen-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Get in Touch
                </h2>
                <p className="text-gray-300 text-lg">
                  Have a question or want to work together? Drop a message!
                </p>
              </div>

              <div className="space-y-6 break-words">
                {[
                  {
                    icon: <Mail className="w-6 h-6 text-purple-400" />,
                    title: "Email",
                    content: "palavaladineshkumarreddy17@gmail.com",
                  },
                  {
                    icon: <Phone className="w-6 h-6 text-green-400" />,
                    title: "Phone",
                    content: "+917989604033",
                  },
                  {
                    icon: <Linkedin className="w-6 h-6 text-blue-400" />,
                    title: "LinkedIn",
                    content:
                      "https://www.linkedin.com/in/palavala-dinesh-kumar-reddy/",
                    link: true,
                  },
                  {
                    icon: <Github className="w-6 h-6 text-gray-400" />,
                    title: "GitHub",
                    content: "https://github.com/dineshreddy8742?tab=repositories",
                    link: true,
                  },
                  {
                    icon: <MapPin className="w-6 h-6 text-pink-400" />,
                    title: "LeetCode",
                    content: "https://leetcode.com/u/chintuvignu17/",
                    link: true,
                  },
                  {
                    icon: <MapPin className="w-6 h-6 text-pink-400" />,
                    title: "GeeksforGeeks",
                    content: "https://www.geeksforgeeks.org/user/chintuvignu17/",
                    link: true,
                  },
                  {
                    icon: <MapPin className="w-6 h-6 text-pink-400" />,
                    title: "Location",
                    content: "Chittoor, AP, India",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      {item.icon}
                    </div>
                    <div className="w-full">
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.link ? (
                        <a
                          href={item.content}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white underline break-words"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-gray-400 break-words">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 p-6 sm:p-8 rounded-lg shadow-lg space-y-6 w-full"
            >
              {["name", "email", "subject"].map((field, idx) => (
                <div key={idx}>
                  <input
                    type={field === "email" ? "email" : "text"}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    className="w-full p-3 rounded bg-white/10 text-white placeholder-gray-400"
                  />
                  {errors[field] && (
                    <p className="text-red-400 text-sm mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}

              <div>
                <textarea
                  rows="4"
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full p-3 rounded bg-white/10 text-white placeholder-gray-400"
                ></textarea>
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>

              {status && (
                <p
                  className={`text-center text-sm mt-2 ${status.includes("success")
                    ? "text-green-400"
                    : "text-red-400"
                    }`}
                >
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
