import Image from "next/image";
import type { SanityImage as SanityImageType } from "@/lib/sanity/types";

export default function SanityImage({
  image,
  alt,
  sizes,
  priority,
  className = "w-full h-auto",
}: {
  image: SanityImageType;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={image.url}
      alt={alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      className={className}
      {...(image.lqip ? { placeholder: "blur" as const, blurDataURL: image.lqip } : {})}
    />
  );
}
