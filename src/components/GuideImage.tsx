interface GuideImageProps {
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
}

export default function GuideImage({
  src,
  alt,
  caption,
  priority = false,
}: GuideImageProps) {
  return (
    <figure className="my-6 overflow-hidden rounded-3xl border border-border bg-surface/50 shadow-xl shadow-black/10">
      <picture>
        <source srcSet={src} type="image/webp" />
        <img
          src={src}
          alt={alt}
          width={1200}
          height={630}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          className="aspect-[1200/630] w-full object-cover"
        />
      </picture>
      <figcaption className="border-t border-border px-4 py-3 text-sm text-text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
