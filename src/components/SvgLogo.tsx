export default function SvgLogo({
    src,
    className,
    alt,
}: {
    src: string;
    className: string;
    alt: string;
}) {
    return <img src={src} className={className} alt={alt} />;
}
