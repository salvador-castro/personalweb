"use client";

import { ReactNode } from "react";
import { track } from "@vercel/analytics";

interface TrackClickProps {
  event: string;
  properties?: Record<string, string>;
  children: ReactNode;
}

export const TrackClick = ({ event, properties, children }: TrackClickProps) => (
  <span onClick={() => track(event, properties)} style={{ display: "contents" }}>
    {children}
  </span>
);
