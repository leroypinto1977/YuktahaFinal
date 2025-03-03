import { AnimatedTestimonials } from "@/components/acertinity_ui/animated-testimonials";

export function AnimatedTestimonialsDisplay() {
  const testimonials = [
    {
      quote:
        "Yuktaha 2025 offers a series of hands-on workshops designed to bridge the gap between academic concepts and real-world applications. Participants can delve into areas like Auto-Drive automation and Aero Design, gaining practical insights from industry experts. These sessions aim to equip attendees with the skills necessary to tackle contemporary engineering challenges.",
      name: "Technical Workshops",
      designation: "Bridging Theory and Practice",
      // src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      src: "/workshop/main.png",
    },
    {
      quote:
        "Beyond the technical realm, Yuktaha 2025 celebrates cultural diversity through vibrant performances and artistic showcases. Attendees can immerse themselves in music concerts, dance performances, and theatrical acts, reflecting the rich tapestry of Indian traditions and contemporary arts. This cultural segment fosters unity and appreciation among participants from various backgrounds.",
      name: "Cultural Extravaganza",
      designation: "A Celebration of Diversity",
      // src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      src: "/home/card2.webp",
    },
    {
      quote:
        "The fest features numerous technical competitions, including CAD Design challenges and Mr. Machinist contests, where budding engineers can demonstrate their creativity and problem-solving skills. These events encourage participants to think critically and innovate, fostering a spirit of healthy competition and learning.",
      name: "Competitive Technical Events",
      designation: "Showcasing Engineering Excellence",
      // src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      src: "/home/Designer.jpeg",
    },
    {
      quote:
        "Yuktaha 2025 invites distinguished professionals to share their knowledge through guest lectures and panel discussions. These sessions provide attendees with valuable industry insights, emerging trends, and career guidance, enriching their academic journey and professional aspirations.",
      name: "Expert Talks and Panel Discussions",
      designation: "Insights from Industry Leaders",
      // src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      src: "/logo/yukta_logo.jpeg",
    },
    {
      quote:
        "With participation from over 250 colleges nationwide, Yuktaha 2025 serves as a melting pot of ideas and talents. Attendees have the opportunity to network with peers, academicians, and industry professionals, fostering collaborations that can lead to future innovations and career advancements.",
      name: "Networking Opportunities",
      designation: "Building Professional Connections",
      // src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      src: "/event/groups/1.png",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
