import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useAlert } from '@/UseHook/useAlert';
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/context/AuthContext';
import { User } from 'lucide-react';
import { useOnClickOutside } from '@/UseHook/UseonclickOutside';
import { EventBus } from '../watcher/eventBus';


export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null)
  const { success } = useAlert();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [click, setonclick] = useState(false);

  useOnClickOutside(menuRef, () => {
    if (click) setonclick(false);
  });




  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout()
    EventBus.publish('logout', null, true)
    success(`${user?.username}님 로그아웃 되었습니다! `);
    navigate('/');

  }

  return (
    <header
      ref={menuRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  
   
  bg-white
        px-10
        ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1 md:px-6 ">
        <div className="flex 
       
        items-center justify-between h-16 lg:h-19">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img
              className='h-5'
              src="/assets/Companylogo.svg"></img>
          </a>

          {/* Desktop Navigation 
          
             <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                  isScrolled ? 'text-gray-700' : 'text-gray-700'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>   
          
          
          
          */}

          {/**여기 리펙토링 하기.. 그니까 CSR 규칙이아닌듯.. */}

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              onClick={() => navigate("/contact")}
              variant="ghost"
              className={`text-sm font-medium
                px-8
                ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-gray-700 hover:text-gray-900'
                }`}
            >
              문의하기
            </Button>
            {!isAuthenticated ?

              <Button
                onClick={() => navigate("/login")}
                className=" bg-white text-black hover:bg-orange-600  px-8">
                로그인
              </Button>
              :
              <div className="relative">
                <button onClick={() => setonclick((el) => !el)}>
                  <div className="flex items-center gap-2">
                    <div className="rounded-3xl bg-gray-500 p-1">
                      <User className="text-white" />
                    </div>
                    <p>{user?.username}</p>
                  </div>
                </button>

                {click && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                    <div className="flex flex-col p-2 text-sm">
                      <button
                        onClick={() => {

                             if(user?.role?.roleName === 'ADMIN') {
                              navigate('/admin/dashboard');
                            } else {
                              navigate('/mypage');
                            }
                          //navigate('/mypage')


                          //여기 권환을 다르게 줘도 괜찮을거같은데... 

                          setonclick((el) => !el)

                        }}
                        className="text-left px-3 py-2 hover:bg-gray-100 rounded-md">
                        {user?.role?.roleName === 'ADMIN' ? '관리자 대시보드' : '마이페이지'}
                      </button>
                      <button
                        onClick={handleLogout}
                        className="text-left px-3 py-2 hover:bg-gray-100 rounded-md">
                        로그아웃
                      </button>
                    </div>
                  </div>
                )}
              </div>


            }

          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`} />
            )}
          </button>
        </div>

        


      </div>
      
{/* Mobile Menu */}
{isMobileMenuOpen && (
  <div className="lg:hiddenborder-t border-gray-100 py-4 shadow-lg">
    <nav className="flex flex-col gap-2 px-4">
      <Button 
        variant="ghost" 
        onClick={() => {
          navigate("/contact");
          setIsMobileMenuOpen(false);
        }}
        className="w-full justify-start text-gray-700"
      >
        문의하기
      </Button>

      <div className="h-px bg-gray-100 my-2" />

      {!isAuthenticated ? (
        <Button 
          onClick={() => {
            navigate("/login");
            setIsMobileMenuOpen(false);
          }}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          로그인
        </Button>
      ) : (
        <div className="flex flex-col gap-2">
          {/* 유저 정보 표시 */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md mb-2">
            <div className="rounded-full bg-gray-500 p-1">
              <User size={16} className="text-white" />
            </div>
            <p className="text-sm font-medium text-gray-700">{user?.username}님</p>
          </div>
          
          <Button 
            variant="outline"
            onClick={() => {
              // 권한에 따른 이동 로직 추가 가능
              const targetPath = user?.role === 'ADMIN' ? '/admin/dashboard' : '/mypage';
              navigate(targetPath);
              setIsMobileMenuOpen(false);
            }}
            className="w-full justify-start"
          >
            {user?.role === 'ADMIN' ? '관리자 대시보드' : '마이페이지'}
          </Button>
          
          <Button 
            variant="destructive"
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
            className="w-full justify-start bg-red-50 text-red-600 hover:bg-red-100 border-none"
          >
            로그아웃
          </Button>
        </div>
      )}
    </nav>
  </div>
)}

    </header>
  );
}
