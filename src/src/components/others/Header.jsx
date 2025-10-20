'use client'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  CpuChipIcon,
  RocketLaunchIcon,
  GlobeAltIcon,
  BuildingOffice2Icon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from "../../context/AuthContext";
import { Link } from 'react-router-dom'

const cursos = [
  { name: "Graduação", href: "/catalogo?tipo=graduacao", icon: AcademicCapIcon },
  { name: "Pós-Graduação", href: "/catalogo?tipo=pos", icon: ClipboardDocumentListIcon },
  { name: "Cursos Técnicos", href: "/catalogo?tipo=tecnico", icon: CpuChipIcon },
  { name: "Cursos Livres", href: "/catalogo?tipo=livres", icon: RocketLaunchIcon },
  { name: "EAD", href: "/catalogo?modalidade=ead", icon: GlobeAltIcon },
  { name: "Presenciais", href: "/catalogo?modalidade=presencial", icon: BuildingOffice2Icon },
]

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Catálogo de Cursos", href: "/catalogo", hasDropdown: true },
  { name: "Instituições de Ensino", href: "/instituicoes" },
  { name: "Sobre Nós", href: "/sobre-nos" },
  { name: "Contato", href: "/contato" },
]

export default function Header() {
  const { usuario, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
              <span className="font-bold text-primary text-xl tracking-wide">StudyConnect</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <Popover key={link.name} className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent">
                        <Link to={link.href}>{link.name}</Link>
                        <ChevronDownIcon className={`h-4 w-4 transition-transform ${open ? 'rotate-180 text-accent' : 'text-secondary'}`} />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-150"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute left-0 mt-3 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5">
                          <div className="p-2">
                            {cursos.map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-primary hover:bg-primary/5"
                              >
                                <item.icon className="h-5 w-5 text-secondary" />
                                <span>{item.name}</span>
                              </Link>
                            ))}
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-primary hover:text-accent relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* Right side: user / CTAs */}
          <div className="hidden lg:flex lg:items-center lg:space-x-3">
            {usuario ? (
              <Popover className="relative">
                <Popover.Button className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50 transition">
                  <UserCircleIcon className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">{usuario.name}</span>
                  <ChevronDownIcon className="h-4 w-4 text-primary" />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-150"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-md p-2 z-50">
                    <Link to="/perfil" className="block text-sm text-gray-700 px-2 py-1 rounded-md hover:bg-gray-50">Meu Perfil</Link>
                    <button
                      onClick={logout}
                      className="w-full text-left text-sm text-red-600 px-2 py-1 rounded-md hover:bg-red-50 flex items-center gap-2"
                    >
                      Sair <ArrowRightStartOnRectangleIcon className="h-5 w-5 text-red-600" />
                    </button>
                  </Popover.Panel>
                </Transition>
              </Popover>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition">
                  Login
                </Link>
                <Link to="/cadastro" className="text-sm font-medium border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition">
                  Cadastrar
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Popover className="relative">
              <Popover.Button className="p-2 rounded-md bg-white border border-gray-200">
                <Bars3Icon className="h-6 w-6 text-primary" />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel className="absolute right-0 mt-2 w-72 rounded-md bg-white shadow-lg ring-1 ring-black/5 z-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-primary">Menu</span>
                      <Popover.Button className="p-1 rounded-md">
                        <XMarkIcon className="h-5 w-5 text-primary" />
                      </Popover.Button>
                    </div>

                    <nav className="space-y-2">
                      {navLinks.map((link) =>
                        link.hasDropdown ? (
                          <div key={link.name}>
                            <div className="text-sm font-medium text-primary mb-1">Catálogo</div>
                            <div className="grid grid-cols-1 gap-1">
                              {cursos.map((item) => (
                                <Link key={item.name} to={item.href} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-primary hover:bg-primary/5">
                                  <item.icon className="h-4 w-4 text-secondary" />
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link key={link.name} to={link.href} className="block px-3 py-2 rounded-md text-sm text-primary hover:bg-primary/5">
                            {link.name}
                          </Link>
                        )
                      )}

                      <div className="pt-3 border-t mt-3">
                        {usuario ? (
                          <>
                            <Link to="/perfil" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">Meu Perfil</Link>
                            <button onClick={logout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">Sair</button>
                          </>
                        ) : (
                          <>
                            <Link to="/login" className="block px-3 py-2 text-sm bg-primary text-white rounded-md text-center">Login</Link>
                            <Link to="/cadastro" className="block mt-2 px-3 py-2 text-sm border border-primary text-primary rounded-md text-center">Cadastrar</Link>
                          </>
                        )}
                      </div>
                    </nav>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </div>
      </nav>
    </header>
  )
}
