"use client";

import React, { useState, useEffect, forwardRef } from "react";
import { SpacingToken } from "../types";
import styles from "./RevealFx.module.scss";
import { Flex } from ".";

interface RevealFxProps extends React.ComponentProps<typeof Flex> {
  children: React.ReactNode;
  speed?: "slow" | "medium" | "fast";
  delay?: number;
  revealedByDefault?: boolean;
  translateY?: number | SpacingToken;
  trigger?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const RevealFx = forwardRef<HTMLDivElement, RevealFxProps>(
  (
    {
      children,
      speed = "medium",
      delay = 0,
      revealedByDefault = false,
      translateY,
      trigger,
      style,
      className,
      ...rest
    },
    ref,
  ) => {
    const [isRevealed, setIsRevealed] = useState(revealedByDefault);
    // Without an external trigger, reveal purely with CSS so content paints before hydration
    const cssOnly = trigger === undefined && !revealedByDefault;

    useEffect(() => {
      if (cssOnly) return;
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }, [delay, cssOnly]);

    useEffect(() => {
      if (trigger !== undefined) {
        setIsRevealed(trigger);
      }
    }, [trigger]);

    const getSpeedDuration = () => {
      switch (speed) {
        case "fast":
          return "1s";
        case "medium":
          return "2s";
        case "slow":
          return "3s";
        default:
          return "2s";
      }
    };

    const getTranslateYValue = () => {
      if (typeof translateY === "number") {
        return `${translateY}rem`;
      } else if (typeof translateY === "string") {
        return `var(--static-space-${translateY})`;
      }
      return undefined;
    };

    const translateValue = getTranslateYValue();

    const revealStyle: React.CSSProperties = cssOnly
      ? ({
          animationDuration: getSpeedDuration(),
          animationDelay: `${delay}s`,
          ...(translateValue ? { "--reveal-translate-y": translateValue } : {}),
          ...style,
        } as React.CSSProperties)
      : {
          transitionDuration: getSpeedDuration(),
          transform: isRevealed ? "translateY(0)" : `translateY(${translateValue})`,
          ...style,
        };

    const stateClass = cssOnly ? styles.animate : isRevealed ? styles.revealed : styles.hidden;

    return (
      <Flex
        fillWidth
        horizontal="center"
        ref={ref}
        style={revealStyle}
        className={`${styles.revealFx} ${stateClass} ${className || ""}`}
        {...rest}
      >
        {children}
      </Flex>
    );
  },
);

RevealFx.displayName = "RevealFx";
export { RevealFx };
