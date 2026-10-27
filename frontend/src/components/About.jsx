import { useNavigate } from "react-router-dom";
import {
  Building2,
  Target,
  Eye,
  Award,
  Users,
  HardHat,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Quote,
  ShieldCheck,
  Landmark,
} from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Building2, number: "50+", label: "Projects Completed" },
    { icon: Users, number: "1000+", label: "Happy Families" },
    { icon: Award, number: "28+", label: "Years of Experience" },
    { icon: HardHat, number: "50+", label: "Expert Professionals" },
    { icon: Landmark, number: "Bank of India", label: "Business Partner", wrap: true },
  ];

  const values = [
    "Quality construction with premium materials",
    "Transparent and trustworthy business practices",
    "Modern designs with thoughtful planning",
    "Timely project delivery",
  ];

  const features = [
    {
      title: "Premium Quality",
      text: "High-quality materials and trusted construction practices.",
    },
    {
      title: "Modern Design",
      text: "Thoughtfully planned spaces for modern lifestyles.",
    },
    {
      title: "Trusted Team",
      text: "Experienced professionals dedicated to excellence.",
    },
    {
      title: "Customer First",
      text: "Transparent communication throughout every journey.",
    },
  ];

  return (
    <main className="bg-white overflow-hidden">
      {/* ============ HERO (FULL SCREEN) ============ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=90"
          alt="Vindhayavasini Construction"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
          <div className="max-w-2xl">
            <p className="text-[#d6a85f] uppercase tracking-[3px] text-[11px] md:text-xs font-semibold mb-3">
              About Our Company
            </p>
            <h1 className="font-elsie text-white text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-4">
              Building Spaces.
              <br />
              <span className="text-[#d6a85f]">Building Trust.</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl">
              Vindhayavasini Construction work is committed to creating exceptional
              residential and commercial spaces where quality, innovation and
              trust come together.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#d6a85f]" />
      </section>

      {/* ============ INTRO ============ */}
      <section className="py-10 md:py-14 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=90"
                alt="Construction Project"
                className="w-full h-[280px] md:h-[340px] object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-3 md:-right-5 bg-[#1d1d1d] text-white px-5 py-4 shadow-xl">
              <p className="font-elsie text-2xl text-[#d6a85f]">28+</p>
              <p className="text-[11px] uppercase tracking-wider text-gray-300 mt-0.5">
                Years of Excellence
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-[#b88742] uppercase tracking-[2.5px] text-[11px] font-bold mb-3">
              Who We Are
            </p>
            <h2 className="font-elsie text-2xl md:text-3xl text-[#222] leading-tight mb-4">
              Creating Landmarks
              <br />
              For A Better Tomorrow.
            </h2>
            <div className="w-12 h-[2px] bg-[#d6a85f] mb-4" />
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              At Vindhayavasini Construction work, we believe that a building is
              more than just bricks and concrete. It is a space where dreams
              take shape, communities grow, and businesses thrive.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              With a strong commitment to quality, transparency and modern
              construction practices, we strive to deliver thoughtfully
              designed spaces that offer comfort, functionality and long-term
              value.
            </p>

            <div className="space-y-2.5">
              {values.map((value, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#b88742] shrink-0" />
                  <span className="text-gray-700 text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="bg-[#1b1b1b] py-9 md:py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center lg:border-r lg:border-white/10 lg:last:border-0"
              >
               
<div className={`flex justify-center ${stat.wrap ? "mb-4" : "mb-2"}`}>
  <Icon size={22} strokeWidth={1.5} className="text-[#d6a85f]" />
</div>

                
<h3
  className={`font-elsie text-white mb-1 leading-tight ${
    stat.wrap
      ? "text-lg md:text-xl"
      : "text-2xl md:text-3xl"
  }`}
>
  {stat.number}
</h3>

                <p className="text-gray-400 text-[11px] md:text-xs">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ MESSAGE FROM THE BOARD ============ */}
      <section className="bg-[#f7f7f6] py-10 md:py-14 px-6 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] items-center gap-8 lg:gap-12">
          {/* Chairman Image */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[340px]">
              <div className="absolute inset-0 bg-[#d6a85f]/10 blur-3xl scale-90 rounded-full" />

              <img
                src="https://res.cloudinary.com/wcimdxco/image/upload/v1793081299/IMG_8338.jpg"
                alt="Ravi Dubey, Chairman of Vindhayavasini Constructions"
                className="relative z-10 w-full h-[280px] sm:h-[340px] md:h-[400px] object-contain object-bottom"
              />

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-6 bg-black/20 blur-2xl rounded-full" />
            </div>
          </div>

          {/* Content */}
          <div className="max-w-2xl">
            {/* Label */}
            <div className="inline-flex items-center gap-2.5 border border-[#263243] px-3.5 py-2 md:px-4 md:py-2.5 mb-5">
              <Quote size={15} strokeWidth={1.5} className="text-[#b88742]" />
              <span className="text-[#263243] uppercase tracking-[3px] text-[10px] font-semibold">
                Message From The Board
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-elsie text-2xl md:text-3xl lg:text-4xl text-[#263243] leading-[1.15] mb-4">
              Building Today.
              <br />
              <span className="text-[#b88742]">Creating Tomorrow.</span>
            </h2>

            {/* Message */}
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl mb-6">
              At Vindhayavasini Construction work, we believe that every structure is more
              than concrete and steel—it is the foundation of someone's future. Our
              journey is driven by a commitment to thoughtful design, reliable
              construction, and spaces that bring lasting value to the people who call
              them Home / Office.
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-[#d6c7ad]/70 mb-5" />

            {/* Signature & Designation */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="md:pr-6">
                <h3 className="font-elsie italic text-xl md:text-2xl text-[#263243] whitespace-nowrap">
                  Ravi Shankar Dubey
                </h3>
              </div>

              <div className="hidden md:block w-px h-[46px] bg-gray-300" />

              <div className="md:text-right">
                <p className="text-[#263243] text-sm font-medium mb-1">
                  Mr. Ravi Shankar Dubey
                </p>
                <p className="text-[#b88742] uppercase tracking-[2.5px] text-[10px] leading-relaxed font-semibold">
                  Vindhayavasini Constructions
                  <br />
                  Chairman
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MISSION & VISION ============ */}
      <section className="py-10 md:py-14 px-6 md:px-10 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <p className="text-[#b88742] uppercase tracking-[2.5px] text-[11px] font-bold mb-2">
              Our Purpose
            </p>
            <h2 className="font-elsie text-2xl md:text-3xl text-[#222]">
              Driven By Purpose.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Mission */}
            <div className="bg-white p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-lg transition duration-500">
              <div className="w-10 h-10 flex items-center justify-center bg-[#f4eadb] mb-4">
                <Target size={20} className="text-[#b88742]" />
              </div>
              <h3 className="font-elsie text-xl md:text-2xl text-[#222] mb-3">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Our mission is to deliver high-quality construction projects
                that combine innovative design, modern technology and strong
                engineering standards while maintaining complete transparency
                with our customers.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-[#222] p-6 md:p-8 text-white shadow-lg">
              <div className="w-10 h-10 flex items-center justify-center bg-[#d6a85f] mb-4">
                <Eye size={20} className="text-[#222]" />
              </div>
              <h3 className="font-elsie text-xl md:text-2xl mb-3">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Our vision is to become a trusted name in the construction
                industry by developing inspiring spaces that enhance communities
                and provide lasting value for generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="py-10 md:py-14 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div>
              <p className="text-[#b88742] uppercase tracking-[2.5px] text-[11px] font-bold mb-3">
                Why Choose Us
              </p>
              <h2 className="font-elsie text-2xl md:text-3xl text-[#222] leading-tight mb-4">
                Built On Trust.
                <br />
                Designed For Life.
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Every project we undertake reflects our commitment to quality,
                attention to detail and customer satisfaction.
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                {features.map((item, index) => (
                  <div key={index} className="border-l-2 border-[#d6a85f] pl-3.5">
                    <h4 className="font-elsie text-base text-[#222] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[13px] text-gray-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=90"
                alt="Modern Architecture"
                className="w-full h-[300px] md:h-[380px] object-cover"
              />
              <div className="absolute inset-0 border-[8px] border-white/20 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>
<section className="relative overflow-hidden bg-[#151515] px-5 py-14 sm:px-6 md:py-20 lg:px-8">
  {/* Decorative background */}
  <div aria-hidden="true" className="pointer-events-none absolute inset-0">
    <div className="absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-[#c49a32]/40 to-transparent" />
    <div className="absolute left-1/2 top-0 h-64 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c49a32]/[0.06] blur-3xl" />
  </div>

  <div className="relative mx-auto max-w-7xl">
    {/* Heading */}
    <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
      <p className="flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[#c49a32] sm:text-xs">
        <span aria-hidden="true" className="block h-1.5 w-1.5 shrink-0 rotate-45 bg-[#c49a32]" />
        Our Partner
        <span aria-hidden="true" className="block h-1.5 w-1.5 shrink-0 rotate-45 bg-[#c49a32]" />
      </p>

      <h2 className="mt-4 font-elsie text-2xl leading-tight text-white sm:text-3xl md:text-4xl">
        Proudly Associated With
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-[13px] leading-7 text-white/50 md:text-sm">
        A trusted financial collaboration that strengthens every project we deliver.
      </p>
    </div>

    {/* Partner card */}
    <div className="mx-auto max-w-4xl">
      <div className="group relative flex flex-col items-center gap-7 border border-white/10 bg-white/[0.02] px-6 py-8 text-center transition-colors duration-300 hover:border-[#c49a32]/50 hover:bg-white/[0.035] sm:px-8 sm:py-10 md:flex-row md:items-center md:gap-10 md:px-10 md:py-10 md:text-left">
        {/* Gold accent line */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#c49a32] via-[#e0be6a] to-transparent transition-transform duration-500 group-hover:scale-x-100"
        />

        {/* Logo */}
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden border border-[#c49a32]/40 bg-white p-3 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-36 lg:w-36 lg:p-4">
          <img
            src="https://companieslogo.com/img/orig/BANKINDIA.NS-e3d88e01.png?t=1720244490"
            alt="Bank of India logo"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Divider — desktop only */}
        <span aria-hidden="true" className="hidden h-20 w-px shrink-0 bg-white/10 md:block" />

        {/* Text */}
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#c49a32] sm:text-[11px] md:text-xs">
            Business Partner
          </p>

          <h3 className="mt-2 font-elsie text-xl text-white sm:text-2xl md:text-3xl">
            Bank of India
          </h3>

          <p className="mx-auto mt-3 max-w-md text-[13px] leading-7 text-white/60 md:mx-0 md:text-sm">
            Backed by one of India&apos;s leading public sector banks — ensuring
            financial reliability and trust across every development.
          </p>

          {/* Feature chips */}
          <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start md:gap-3">
            {["Trusted Finance", "Secure Backing", "Nationwide Presence"].map((item) => (
              <span
                key={item}
                className="flex items-center gap-1.5 border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-white/60 transition-colors duration-300 hover:border-[#c49a32]/40 hover:text-white/80 sm:text-[11px]"
              >
                <ShieldCheck size={12} className="shrink-0 text-[#c49a32]" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="w-full shrink-0 sm:w-auto">
          <a
            href="https://www.bankofindia.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 border border-[#c49a32]/40 px-5 py-3 text-[11px] uppercase tracking-[0.14em] text-[#c49a32] transition-colors duration-300 hover:bg-[#c49a32] hover:text-[#151515] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c49a32] focus-visible:ring-offset-2 focus-visible:ring-offset-[#151515] sm:w-auto sm:text-[12px] md:text-[13px]"
          >
            Visit Website
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ============ QUOTE ============*/}
      <section className="relative py-12 md:py-14 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#b88742]" />
        <div className="relative max-w-3xl mx-auto text-center text-white">
          <Quote size={32} strokeWidth={1} className="mx-auto mb-4 text-white/70" />
          <h2 className="font-elsie text-xl md:text-3xl leading-tight mb-4">
            We Don't Just Build Structures.
            <br />
            We Build The Country's Future.
          </h2>
          <p className="text-white/80 max-w-xl mx-auto leading-relaxed text-sm">
            Our commitment is to transform your vision into spaces that stand
            strong, inspire confidence and create lasting memories.
          </p>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-10 md:py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto bg-[#1d1d1d] px-6 py-8 md:p-10 text-center">
          <p className="text-[#d6a85f] uppercase tracking-[2.5px] text-[11px] font-bold mb-3">
            Let's Build Together
          </p>
          <h2 className="font-elsie text-xl md:text-3xl text-white mb-4">
            Have A Vision In Mind?
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-6 text-sm">
            Let's create something exceptional together. Explore our projects
            and discover the spaces built by Vindhayavasini Construction work.
          </p>
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-2.5 bg-[#d6a85f] text-[#222] px-5 py-3 font-semibold text-sm hover:bg-white transition-all duration-300"
          >
            Explore Our Projects
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
};

export default About;