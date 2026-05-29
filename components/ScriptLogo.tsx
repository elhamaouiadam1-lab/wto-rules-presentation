import Image from 'next/image'

export function ScriptLogo() {
  return (
    <Image
      src="/logo.png"
      alt="R & Python Logo"
      width={40}
      height={32}
      className="shrink-0"
    />
  )
}
