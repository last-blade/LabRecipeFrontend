import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { MapPin, Mail, Phone, Users, BarChart2, Activity } from "lucide-react";

const CompanyDashboard = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6 md:p-12 font-sans text-gray-800">
      {/* Company Name */}
      <h1
        className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-10"
        data-aos="fade-down"
      >
        Jasmine Knitting Industries Pvt. Ltd.
      </h1>

      {/* About Section */}
      <section
        className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-10"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          🌟 Company Overview
        </h2>
        <p className="text-lg leading-relaxed">
          Jasmine Knitting Industries Pvt. Ltd., based in Gurugram, Haryana,
          India, is a leading textile manufacturer with over 40 years of
          expertise. Originating from “Nath Arts,” evolving into “Tex ‘n’ Nets,”
          the company now focuses on manufacturing, dyeing, and laminating
          fabrics for all age groups and fashion segments.
        </p>
      </section>

      {/* Contact + Directors */}
      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <div
          className="bg-indigo-100 p-6 rounded-2xl shadow-md"
          data-aos="fade-right"
        >
          <h3 className="text-xl font-semibold text-indigo-800 flex items-center gap-2 mb-3">
            <MapPin size={20} /> Contact Info
          </h3>
          <p className="mb-1">
            929/2 Behrampur Road, Gurgaon, Haryana 122101, India
          </p>
          <p className="mb-1 flex items-center gap-2">
            <Phone size={18} /> +91 7290079840
          </p>
          <p className="flex items-center gap-2">
            <Mail size={18} /> caapt98@gmail.com
          </p>
        </div>

        <div
          className="bg-pink-100 p-6 rounded-2xl shadow-md"
          data-aos="fade-left"
        >
          <h3 className="text-xl font-semibold text-pink-800 flex items-center gap-2 mb-3">
            <Users size={20} /> Key Directors
          </h3>
          <ul className="list-disc list-inside text-lg space-y-1">
            <li>Sandeep Behl – Director</li>
            <li>Parveen Behl – Director</li>
            <li>Kapil Behl – Director</li>
          </ul>
        </div>
      </section>

      {/* Financials */}
      <section
        className="bg-blue-100 p-6 md:p-8 rounded-2xl shadow-md mb-10"
        data-aos="fade-up"
      >
        <h3 className="text-xl font-semibold text-blue-800 flex items-center gap-2 mb-3">
          <BarChart2 size={20} /> Financial Overview
        </h3>
        <p className="text-lg leading-relaxed">
          As of March 31, 2022, the company reported revenue in the range of INR
          100 to 500 crore. EBITDA grew by 57.13% and net worth increased by
          6.77%, showcasing solid financial performance.
        </p>
      </section>

      {/* Developments */}
      <section
        className="bg-green-100 p-6 md:p-8 rounded-2xl shadow-md mb-10"
        data-aos="fade-up"
      >
        <h3 className="text-xl font-semibold text-green-800 flex items-center gap-2 mb-3">
          <Activity size={20} /> Recent Developments
        </h3>
        <p className="text-lg">
          Installed a fifth engineered mesh machine, boosting capacity to 3.6
          million pairs/year. Jasmine now stands as India’s largest and only
          manufacturer of engineered uppers.
        </p>
      </section>

      {/* Map */}
      <section
        className="bg-white p-4 md:p-6 rounded-2xl shadow-md"
        data-aos="fade-up"
      >
        <h3 className="text-xl font-semibold text-purple-700 mb-4">
          📍 Location Map
        </h3>
        <div className="w-full h-64 overflow-hidden rounded-xl border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14014.248358598696!2d77.0139317!3d28.426527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1803dda8cb77%3A0xd2ed02d33b4017fe!2sJasmine%20Knitting%20Industries%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1712478525686!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Jasmine Knitting Industries Location"
          />
        </div>
      </section>
    </div>
  );
};

export default CompanyDashboard;
