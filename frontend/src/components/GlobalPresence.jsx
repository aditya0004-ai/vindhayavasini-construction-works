import { Globe2 } from "lucide-react";

const GlobalPresence = () => {
  const contactData = [
    {
      number: "01",
      label: "CORPORATE OFFICE",
      title: "Headquarters",
      details: [
        "BBD Viraj Towers, Vibhuti Khand",
        "Gomti Nagar, Lucknow - 226010",
        "Uttar Pradesh, India",
      ],
    },
    {
      number: "02",
      label: "NEW ENQUIRIES",
      title: "Sales",
      details: [
        "+91 9696333555",
        "saleshead@virajconstructions.co.in",
      ],
    },
    {
      number: "03",
      label: "CUSTOMER CARE",
      title: "Support",
      details: [
        "+91 9696333555",
        "saleshead@virajconstructions.co.in",
        "Mon - Sat: 9:30 AM - 6:30 PM",
      ],
    },
    {
      number: "04",
      label: "HR DEPARTMENT",
      title: "Careers",
      details: [
        "hr@virajconstructions.co.in",
        "Mon - Sat: 9:30 AM - 6:30 PM",
      ],
    },
  ];

  return (
    <section className="bg-[#f7f7f6] px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1650px]">

        {/* Header */}
        <div className="mb-12 text-center md:mb-16">

          {/* Badge */}
          <div className="inline-flex items-center gap-3 border border-[#283442]/50 px-7 py-2.5">
            <Globe2
              size={16}
              strokeWidth={1.6}
              className="text-[#b28a35]"
            />

            <span className="text-[11px] font-semibold tracking-[0.32em] text-[#283442]">
              GLOBAL PRESENCE
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-elsie font-light mt-6 text-[38px] leading-tight text-[#283442] md:text-[50px]">
            Always at your{" "}
            <span className="text-[#b28a35]">
              Service.
            </span>
          </h2>
        </div>

        {/* Contact Grid */}
        <div className="border-y border-[#283442]/15">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">

            {contactData.map((item, index) => (
              <div
                key={item.number}
                className={`
                  relative overflow-hidden px-7 py-9 md:px-10 md:py-10
                  ${
                    index !== contactData.length - 1
                      ? "border-b border-[#283442]/15 xl:border-b-0 xl:border-r"
                      : ""
                  }
                `}
              >
                {/* Background Number */}
                <span className="absolute right-7 top-6 select-none text-[100px] font-light leading-none text-[#283442]/[0.045] md:text-[115px]">
                  {item.number}
                </span>

                {/* Top Content */}
                <div className="relative z-10 min-h-[120px]">

                  <p className="mb-2 text-[11px] font-bold tracking-[0.28em] text-[#a98235]">
                    {item.label}
                  </p>

                  <h3 className="font-elsie text-[30px] text-[#283442] md:text-[34px]">
                    {item.title}
                  </h3>
                </div>

                {/* Divider */}
                <div className="relative z-10 my-6 h-px w-full bg-[#283442]/15" />

                {/* Details */}
                <div className="relative z-10 space-y-3">
                  {item.details.map((detail, detailIndex) => (
                    <p
                      key={detailIndex}
                      className="text-[15px] leading-relaxed text-[#4f5964] md:text-[16px]"
                    >
                      {detail}
                    </p>
                  ))}
                </div>

              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalPresence;