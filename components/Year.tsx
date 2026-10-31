"use client";
import { useEffect, useState } from "react";
export function Year() { const [y, setY] = useState(""); useEffect(() => setY(String(new Date().getFullYear())), []); return <span suppressHydrationWarning>{y}</span>; }
