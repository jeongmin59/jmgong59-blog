/* eslint-disable @next/next/no-img-element */

export function MdxImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img {...props} alt={props.alt} className="my-8 h-auto w-full" />;
}
