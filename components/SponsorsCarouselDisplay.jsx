"use client";

import { SponsorsCarousel } from "./SponsorsCarousel";

export function SponsorsCarouselDisplay() {
  const sponsors = [
    {
      quote:
        "TechCorp has been a proud platinum sponsor of Yuktaha for three consecutive years. As a leader in software solutions, we believe in fostering innovation among young minds. Our partnership with Yuktaha allows us to connect with the brightest engineering talent and contribute to the technological ecosystem of tomorrow.",
      name: "TechCorp",
      designation: "Platinum Sponsor",
      src: "/api/placeholder/400/320",
    },
    {
      quote:
        "InnovateX is committed to supporting educational initiatives that drive technological advancement. Our sponsorship of Yuktaha 2025 reflects our dedication to empowering the next generation of engineers and innovators. We look forward to witnessing the creative solutions presented during this prestigious technical festival.",
      name: "InnovateX",
      designation: "Gold Sponsor",
      src: "/api/placeholder/400/320",
    },
    {
      quote:
        "As a leading research and development company, NexGen Labs values the fresh perspectives that student competitions bring to the tech industry. We are excited to sponsor Yuktaha 2025 and provide resources that help transform theoretical knowledge into practical applications, bridging the gap between academia and industry needs.",
      name: "NexGen Labs",
      designation: "Silver Sponsor",
      src: "/api/placeholder/400/320",
    },
    {
      quote:
        "FutureTech Industries has been supporting Yuktaha since its inception. We believe in the potential of young engineers to revolutionize industries through innovative thinking. Our sponsorship aims to provide students with the tools and exposure they need to develop solutions for real-world challenges.",
      name: "FutureTech Industries",
      designation: "Technology Partner",
      src: "/api/placeholder/400/320",
    },
    {
      quote:
        "GlobalConnect Solutions is proud to be associated with Yuktaha 2025 as a connectivity partner. In today's digital world, robust networking infrastructure is essential for innovation to thrive. We are dedicated to supporting educational events that prepare students for the interconnected workplaces of the future.",
      name: "GlobalConnect Solutions",
      designation: "Connectivity Partner",
      src: "/api/placeholder/400/320",
    },
  ];

  return <SponsorsCarousel sponsors={sponsors} />;
}
