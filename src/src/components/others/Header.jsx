'use client'
import { useState, useEffect } from 'react'
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react'
import { AcademicCapIcon, ClipboardDocumentListIcon, CpuChipIcon, 
  RocketLaunchIcon, GlobeAltIcon, BuildingOffice2Icon, UserCircleIcon, ArrowRightStartOnRectangleIcon  } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

const cursos = [
  { name: "Graduação", href: "#", icon: AcademicCapIcon },
  { name: "Pós-Graduação", href: "#", icon: ClipboardDocumentListIcon },
  { name: "Cursos Técnicos", href: "#", icon: CpuChipIcon },
  { name: "Cursos Livres", href: "#", icon: RocketLaunchIcon },
  { name: "EAD", href: "#", icon: GlobeAltIcon },
  { name: "Presenciais", href: "#", icon: BuildingOffice2Icon },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { usuario, logout } = useAuth()

  // GSAP animação para dropdown
  useEffect(() => {
    if (open) {
      gsap.fromTo(
        ".curso-link",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }
      )
    }
  }, [open])

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">

        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2 transition-transform duration-300 hover:scale-105">
            <span className="font-bold text-primary text-xl tracking-wide">
              StudyConnect
            </span>
          </Link>
        </div>

        {/* Menu desktop */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-10">
          <Link to="/" className="text-sm font-medium text-primary hover:text-accent relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full transition-all">
            Home
          </Link>

          <Popover 
            className="relative flex items-center gap-x-1"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <Link to="/catalogo" className="text-sm font-medium text-primary hover:text-accent relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full transition-all">
              Catálogo de Cursos
            </Link>

            <PopoverButton className="p-1 text-primary hover:text-accent transition-colors">
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${open ? 'rotate-180 text-accent' : 'text-secondary'}`} />
              <span className="sr-only">Abrir menu de cursos</span>
            </PopoverButton>

            {open && (
              <PopoverPanel 
                static
                className="absolute left-0 top-full z-10 w-48 rounded-md bg-white shadow-lg ring-1 ring-secondary/20"
              >
                <div className="p-2">
                  {cursos.map((item) => (
                    <Link key={item.name} to={item.href} className="curso-link flex items-center gap-2 rounded-md px-3 py-2 text-sm text-primary transition-colors hover:bg-primary/10 hover:font-bold">
                      <item.icon className="h-5 w-5 text-secondary" /> 
                      {item.name}
                    </Link>
                  ))}
                </div>
              </PopoverPanel>
            )}
          </Popover>

          <Link to="/instituicoes" className="text-sm font-medium text-primary hover:text-accent relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full transition-all">
            Instituições de Ensino
          </Link>

          <Link to="/sobre-nos" className="text-sm font-medium text-primary hover:text-accent relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full transition-all">
            Sobre Nós
          </Link>

          <Link to="/contato" className="text-sm font-medium text-primary hover:text-accent relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full transition-all">
            Contato
          </Link>
        </PopoverGroup>

        {/* Área do usuário / CTAs */}
        <div className="hidden lg:flex lg:flex-1 gap-3 lg:justify-end">
          {usuario ? (
            // Menu de usuário
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-100 transition-all">
                <UserCircleIcon className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">{usuario.name}</span>
                <ChevronDownIcon className="h-4 w-4 text-primary" />
              </PopoverButton>
              <PopoverPanel className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-md p-2 flex flex-col gap-2 z-50">
                <Link to="/perfil" className="text-sm text-gray-700 hover:bg-gray-100 rounded-md px-2 py-1">Meu Perfil</Link>
                <button
                  onClick={logout}
                  className="flex items-center text-sm text-red-600 hover:bg-red-50 rounded-md px-2 py-1 text-left"
                >
                  Sair
                  <ArrowRightStartOnRectangleIcon className="h-5 w-7 text-red-600" />
                </button>
              </PopoverPanel>
            </Popover>
          ) : (
            // Botões de login/cadastro
            <>
              <Link to="/login" className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all">
                Login
              </Link>
              <Link to="/cadastro" className="text-sm font-medium border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition-all">
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
