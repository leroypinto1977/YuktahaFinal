"use client";

import WorkshopGrid from "./WorkshopGrid";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const WorkshopGroups = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(false);

  const groups = [
    { id: 1, name: "AI and Machine Learning", image: "/workshop/tech.png" },
    {
      id: 2,
      name: "Software Development and Web Technologies",
      image: "/workshop/design.png",
    },
    {
      id: 3,
      name: "Cybersecurity & Ethical Hacking",
      image: "/workshop/business.png",
    },
    {
      id: 4,
      name: "IoT, Embedded Systems & Microcontrollers",
      image: "/workshop/marketing.png",
    },
    { id: 5, name: "VLSI & Circuit Design", image: "/workshop/dev.png" },
    {
      id: 6,
      name: "Renewable energy & Smart Infrastructure",
      image: "/workshop/creative.png",
    },
    {
      id: 7,
      name: "Civil Engineering & Geographic Data",
      image: "/workshop/creative.png",
    },
  ];

  useEffect(() => {
    if (selectedGroup) {
      const fetchWorkshops = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/workshop/getGroup/${selectedGroup.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch workshops");
          }
          const data = await response.json();
          setWorkshops(data);
        } catch (error) {
          console.error("Error fetching workshops:", error);
        }
        setLoading(false);
      };

      fetchWorkshops();
    }
  }, [selectedGroup]);

  const handleModalClose = () => {
    setSelectedGroup(null);
    setWorkshops([]);
  };

  const WorkshopCard = ({ group, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden h-full border-3 rounded-3xl hover:border-zinc-700 transition-all duration-300">
        <CardHeader className="p-0">
          <motion.div
            className="relative w-full rounded-t-xl overflow-hidden pt-4 px-4"
            whileHover={{ scale: 1.25 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={group.image}
              alt={group.name}
              width={400}
              height={300}
              className="object-cover aspect-video w-full h-full rounded-t-2xl"
            />
          </motion.div>
          <div className="px-6 py-2">
            <CardTitle className="text-white text-center min-h-[60px] flex items-center justify-center">
              {group.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-center pb-6">
          <Button
            className="group items-center pt-2 pb-2"
            onClick={() => setSelectedGroup(group)}
          >
            View Workshops
            <ArrowRight
              className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
              size={16}
              strokeWidth={2}
            />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );

  return (
    <section className="w-full bg-gradient-to-br from-neutral-800 to-neutral-900">
      <div className="py-16">
        <motion.h2
          className="text-4xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Workshop Groups
        </motion.h2>

        <div className="max-w-[90rem] mx-auto px-4 space-y-8">
          {/* Container for both rows with consistent widths */}
          <div className="grid grid-cols-1 gap-8">
            {/* Top row - 4 cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {groups.slice(0, 4).map((group, index) => (
                <WorkshopCard key={group.id} group={group} index={index} />
              ))}
            </div>

            {/* Bottom row - 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto w-full max-w-[75%]">
                {groups.slice(4).map((group, index) => (
                  <WorkshopCard
                    key={group.id}
                    group={group}
                    index={index + 4}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleModalClose}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-[70vw] h-[70vh] bg-zinc-900 rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full flex flex-col">
                <div className="relative h-1/3">
                  <motion.div
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={selectedGroup.image}
                      alt={selectedGroup.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </motion.div>
                  <Button
                    variant="ghost"
                    className="absolute top-4 right-4 text-black bg-white"
                    onClick={handleModalClose}
                  >
                    <X size={24} />
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-900">
                    <h2 className="text-3xl font-bold text-white">
                      {selectedGroup.name} Workshops
                    </h2>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {loading ? (
                    <div className="text-center text-white p-6">
                      Loading workshops...
                    </div>
                  ) : (
                    <WorkshopGrid
                      workshops={workshops}
                      isModalView={true}
                      groupId={selectedGroup.id}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorkshopGroups;
