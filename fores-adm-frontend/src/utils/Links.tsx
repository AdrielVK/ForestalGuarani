import { useState } from "react";
import { MenuItem } from "./items-links-constants"
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { ROLE } from "../models/interfaces/auth.interfaces";

interface Props {
  staticLinks: MenuItem[];
  toogleMenu?: () => void;
  userRole: ROLE
}

function Links ({staticLinks, toogleMenu, userRole}: Props) {
  const [expandedItems , setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (title: string) => {
    setExpandedItems(prev => ({ ...prev, [title]: !prev[title] }));
  };
  

  return (
    <nav className="flex-grow p-4">
      {staticLinks.map((item) => (
        <div key={item.title} className="mb-2">
          <button
            onClick={() => toggleItem(item.title)}
            className="flex items-center font-semibold justify-between w-full p-2 hover:bg-lime-700 transition-colors duration-200"
          >
            <span>{item.title}</span>
            {expandedItems[item.title] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {expandedItems[item.title] && (
            <div className="ml-4">
              {item.links.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block p-2 hover:bg-lime-700 transition-colors duration-200"
                  onClick={toogleMenu}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
      {
        userRole === ROLE.ADMIN 
        &&
        <>
          <div className="mb-2" key={"users"}>
            <button
              onClick={() => toggleItem("users")}
              className="flex items-center font-semibold justify-between w-full p-2 hover:bg-lime-700 transition-colors duration-200"
            >
              <span>
                Usuarios
              </span>
              {expandedItems["users"] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedItems["users"] && (
              <div className="ml-4">
                
                <Link
                  key={"users/alta"}
                  to={"/usuarios/alta"}
                  className="block p-2 hover:bg-lime-700 transition-colors duration-200"
                  onClick={toogleMenu}
                >
                  Alta
                </Link>
                <Link
                  key={"users/listado"}
                  to={"/usuarios/lista"}
                  className="block p-2 hover:bg-lime-700 transition-colors duration-200"
                  onClick={toogleMenu}
                >
                  Lista
                </Link>
              </div>
            )}
          </div>
          
        </>
        
      }
    </nav>
  )
}

export default Links;