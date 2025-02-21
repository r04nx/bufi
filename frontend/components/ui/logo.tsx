import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  variant?: "default" | "white" | "black"
  size?: "sm" | "md" | "lg"
  withText?: boolean
}

export function Logo({ variant = "default", size = "md", withText = true }: LogoProps) {
  const sizes = {
    sm: { width: 24, height: 24, textSize: "text-lg" },
    md: { width: 32, height: 32, textSize: "text-xl" },
    lg: { width: 40, height: 40, textSize: "text-2xl" },
  }

  const logoSrc = variant === "white" 
    ? "/assets/logo-white-bg.svg"
    : variant === "black" 
      ? "/assets/logo-black-bg.svg" 
      : "/assets/logo-no-bg.png"

  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={logoSrc}
        alt="BUFI Logo"
        width={sizes[size].width}
        height={sizes[size].height}
        className={variant === "white" ? "invert" : "dark:invert"}
      />
      {withText && (
        <span className={`font-bold ${sizes[size].textSize} text-primary`}>
          BUFI
        </span>
      )}
    </Link>
  )
} 