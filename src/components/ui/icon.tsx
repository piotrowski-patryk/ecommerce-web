type IconProps = {
  name: string;
  className?: string;
};

export async function Icon({ name, className = "" }: IconProps) {
  
  const svg = (await import(`../../assets/icons/${name}.svg?raw`)).default;

  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-6 fill-none stroke-current stroke-2 [&>svg]:size-full ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}