import React , { useRef, useEffect , useState} from 'react';

const Nav = () => {

    const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const spanElement = document.createElement('span');
      spanElement.className = 'menu-trigger';
      spanElement.innerHTML = '<i class="fal fa-angle-down"></i>';
      containerRef.current.appendChild(spanElement);
    }
  }, []);

  const [menuItems, setMenuItems] = useState([
    {
        label: 'Home',
        link: '#',
        class: 'current',
        submenu: [
          { label: 'Home One', link: '/' },
          { label: 'Home Two', link: '/home-2'},
        ],
        submenuOpen: false, 
    },
    {
        label: 'About',
        link: '/about',
        
    },
    {
      label: 'Courses',
      link: '#',
      submenu: [
        { label: 'Courses', link: '/course-1' },
        { label: 'Course Grid 2 ', link: '/course-2' },
        { label: 'Course Grid 3', link: '/course-3' },
        { label: 'Course Grid 4', link: '/course-4' },
        { label: 'Course List', link: '/course-list' },
        { label: 'Course Single 1', link: '/course-details/1' },
        { label: 'Course Single 2', link: '/course-details-two/2' },
      ],
    },
    {
        label: 'Pages',
        link: '#',
        submenu: [
          { label: 'Instructors', link: '/instructors'},
          { label: 'Login', link: '/login' },
          { label: 'Register', link: '/register' },
        ],
        submenuOpen: false, 
    },
    {
        label: 'Blog',
        link: '/blog',
        
    },
    {
        label: 'Contact',
        link: '/contact',
        
    },

  
    // Add more menu items as needed
  ]);
  useEffect(() => {
    setMenuItems((prevMenuItems) =>
      prevMenuItems.map((item) =>
        item.submenu && item.submenu.length > 0
          ? { ...item, hasSubmenu: true }
          : item
      )
    );
  }, []);

const handleSubmenuToggle = (index) => {
    setMenuItems((prevMenuItems) => {
      const newMenuItems = [...prevMenuItems];
      newMenuItems[index].submenuOpen = !newMenuItems[index].submenuOpen;
      return newMenuItems;
    });
  };

    return (
        
        <ul className="primary-menu">
            {menuItems.map((item, index) => (
          <li key={index}>

            <a href={item.link}>
              {item.label}
            </a>

            {item.submenu && (
              <span
                className={`menu-trigger ${item.submenuOpen ? 'open' : ' '}`}
                onClick={() => handleSubmenuToggle(index)}
              >
            
                <i 
                className={`submenu-icon ${item.submenuOpen ? 'fal fa-angle-up' : 'fal fa-angle-down'}`}>
              </i>
              </span>
            )}
            {item.submenu && (
              <ul className={`submenu ${item.submenuOpen ? 'open' : ''}`}
              
              >
                {item.submenu.map((subitem, subindex) => (
                   <li key={subindex} >
                    <a href={subitem.link}>{subitem.label}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}

    </ul>

    )
}
export default Nav;
