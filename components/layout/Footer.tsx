import Image from 'next/image'
import { Facebook, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white py-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-6">
          <a href="/">
            <Image
              src="/img/logo_white2.png"
              alt="SmarTeam3D"
              width={120}
              height={40}
              className="mx-auto h-10 w-auto"
            />
          </a>
        </div>

        <ul className="flex justify-center gap-5 mb-6">
          <li>
            <a
              href="https://www.facebook.com/SmarTeam3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors"
            >
              <Facebook size={20} />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/SmarTeam3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors"
            >
              <Twitter size={20} />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/channel/UC99BoLYeomoBYe_x4QhLNnw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors"
            >
              <Youtube size={20} />
            </a>
          </li>
        </ul>

        <p className="text-sm text-body">
          Copyright &copy; SmarTeam3D {year}. All Rights Reserved
        </p>
        <p className="text-sm text-body mt-1">Powered by WEBGL3D SOFT</p>
      </div>
    </footer>
  )
}
