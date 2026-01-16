import { cn } from "@/lib/utils";

type Props = {
  name: string;
  size?: number;
  className?: string;
  alt?: string;
};

export function ApiAvatar({ name, size = 96, className, alt }: Props) {
  const params = new URLSearchParams();
  params.set("name", name);
  params.set("size", String(size));

  const src = `/api/avatar?${params.toString()}`;

  return <img src={src} className={cn("inline-block", className)} alt={alt ?? name} />;
}
