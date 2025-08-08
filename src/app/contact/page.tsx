export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900">
        Contact Us
      </h1>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <p className="text-lg text-gray-700 mb-6">
          Have questions, feedback, or need support? Feel free to reach out to
          us using the information below or fill out the contact form.
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Details
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:support@aistore.com"
              className="text-blue-600 hover:underline"
            >
              support@test.com
            </a>
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Phone:</strong> +49 (xxx) 123-4567
          </p>
          <p className="text-gray-700">
            <strong>Address:</strong> 123 Germany, Berlin City, AI 90210
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Send Us a Message
        </h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
