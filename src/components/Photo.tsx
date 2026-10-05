/**
 * The one image element used anywhere on this site.
 *
 * Encapsulating it means width/height are always supplied (which reserves
 * layout space and prevents content jumping), and everything below the fold is
 * lazy-loaded. The one above the fold is eager with high priority.
 */
export function Photo({
  src,
  width,
  height,
  alt,
  className = '',
  priority = false,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
}