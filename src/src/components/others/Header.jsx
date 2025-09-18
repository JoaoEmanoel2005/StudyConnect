'use client'
import { useState, useEffect } from 'react'
import { Dialog, DialogPanel, Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, AcademicCapIcon, ClipboardDocumentListIcon, CpuChipIcon, 
  RocketLaunchIcon, GlobeAltIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [open, setOpen] = useState(false) 
  const [mobileCursosOpen, setMobileCursosOpen] = useState(false)


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

        {/* Botão hamburguer (mobile) */}
        <div className="flex lg:hidden">
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(true)} 
            className="p-2.5 text-primary rounded-md transition-all duration-300 hover:bg-primary/10 hover:text-accent"
          >
            <span className="sr-only">Abrir menu</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
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

        {/* CTAs */}
        <div className="hidden lg:flex lg:flex-1 gap-3 lg:justify-end">
          <Link to="/login" className="text-sm font-medium text-secondary border border-secondary px-6 py-2 rounded-lg transition-all duration-300 hover:bg-secondary hover:text-white">
            Entrar
          </Link>

          <Link to="/cadastro" className="text-sm font-medium text-white bg-accent px-6 py-2 rounded-lg transition-all duration-300 hover:bg-orange-600">
            Cadastrar
          </Link>
        </div>

      </nav>

      {/* Menu mobile */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />
        <DialogPanel className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-lg p-6 transform transition-transform duration-500 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          
          <div className="flex items-center justify-between">
            <Link to="/" className="font-bold text-primary text-lg">
              StudyConnect
            </Link>
            <button 
              type="button" 
              onClick={() => setMobileMenuOpen(false)} 
              className="p-2 text-primary rounded-md transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 space-y-2">
            <Link to="/" className="block rounded-md px-3 py-3 text-sm text-primary transition-colors hover:bg-primary/10 hover:text-secondary hover:font-bold">
              Home
            </Link>

            {/* Cursos com toggle */}
            <div>
              <div 
                className="flex justify-between items-center px-3 py-3 rounded-md hover:bg-primary/10 hover:text-secondary hover:font-bold cursor-pointer transition-colors"
                onClick={() => setMobileCursosOpen(!mobileCursosOpen)}
              >
                <Link to="/cursos" className="text-sm text-primary" onClick={(e) => e.stopPropagation()}>
                  Catálogo de Cursos
                </Link>
                <ChevronDownIcon 
                  className={`h-5 w-5 transition-transform ${mobileCursosOpen ? "rotate-180 text-accent" : "text-secondary"}`} 
                />
              </div>

              <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${mobileCursosOpen ? "max-h-96" : "max-h-0"}`}>
                <div className="pl-6 mt-2 space-y-1">
                  {cursos.map((item) => (
                    <Link key={item.name} to={item.href} className="curso-link flex items-center gap-2 rounded-md px-3 py-2 text-sm text-primary transition-colors hover:bg-primary/10 hover:font-bold">
                      <item.icon className="h-5 w-5 text-secondary" /> 
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/instituicoes" className="block rounded-md px-3 py-3 text-sm text-primary transition-colors hover:bg-primary/10 hover:text-secondary hover:font-bold">
              Instituições de Ensino
            </Link>

            <Link to="/sobre-nos" className="block rounded-md px-3 py-3 text-sm text-primary transition-colors hover:bg-primary/10 hover:text-secondary hover:font-bold">
              Sobre Nós
            </Link>

            <Link to="/contato" className="block rounded-md px-3 py-3 text-sm text-primary transition-colors hover:bg-primary/10 hover:text-secondary hover:font-bold">
              Contato
            </Link>

            <Link to="/login" className="block rounded-md px-3 py-3 text-sm text-center font-medium text-secondary border border-secondary transition-colors hover:bg-secondary hover:text-white">
              Entrar
            </Link>

            <Link to="/cadastro" className="block rounded-md px-3 py-3 text-sm text-center font-medium text-white bg-accent transition-colors hover:bg-orange-600">
              Cadastrar
            </Link>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
