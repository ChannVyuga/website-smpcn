"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type Staff = {
  id: number;
  name: string;
  label: string;
  photo: string;
};

export default function StaffPage() {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStaff() {
      try {
        const response = await fetch("/api/staff");

        if (!response.ok) {
          throw new Error("Gagal memuat data staff.");
        }

        const data: Staff[] = await response.json();
        setStaffList(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Terjadi kesalahan."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchStaff();
  }, []);