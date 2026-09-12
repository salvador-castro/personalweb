"use client";

import { ReactNode } from "react";
import { gaEvent } from "@/app/utils/gtag";

interface TrackClickProps {
  event: string;
  properties?: Record<string, string>;
  children: ReactNode;
}

export const TrackClick = ({ event, properties, children }: TrackClickProps) => (
  <span onClick={() => gaEvent(event, properties)} style={{ display: "contents" }}>
    {children}
  </span>
);
