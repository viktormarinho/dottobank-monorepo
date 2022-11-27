import { useRouter } from 'next/router';
import { ReactNode } from 'react';


type ActiveLinkProps = {
  children: ReactNode
  href: string
  className: string
}

export const ActiveLink = ({ children, href, className }: ActiveLinkProps) => {
  const router = useRouter();

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(href);
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}