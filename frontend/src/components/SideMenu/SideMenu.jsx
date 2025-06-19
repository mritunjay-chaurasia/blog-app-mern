import { topMenu, bottomMenu } from "./sidebarMenuConfig.ts.jsx"
import { Outlet, useNavigate } from 'react-router-dom';

const SideMenu = () => {
    const navigate = useNavigate();

    return (
        <>
            <div style={{ width: '15%', borderRight: '1px solid #ccc' }}>
                <div className="flex flex-col justify-between h-100">
                    {/* Top menu */}
                    <ul style={{ listStyle: 'none', padding: '10px' }}>
                        {topMenu.map((menu) => (
                            <li
                                key={menu.title}
                                onClick={() => navigate(menu.path)}
                                style={{
                                    padding: '10px',
                                    marginBottom: '5px',
                                    backgroundColor: '#f5f5f5',
                                    cursor: 'pointer',
                                    borderRadius: '5px'
                                }}
                            >
                                <strong>{menu.icon}{" "}{menu.title}</strong>
                            </li>
                        ))}
                    </ul>
                    {/* Bottom menu */}
                    <ul style={{ listStyle: 'none', padding: '10px' }}>
                        {bottomMenu.map((menu) => (
                            <li
                                key={menu.title}
                                onClick={() => navigate(menu.path)}
                                style={{
                                    padding: '10px',
                                    marginBottom: '5px',
                                    backgroundColor: '#f5f5f5',
                                    cursor: 'pointer',
                                    borderRadius: '5px'
                                }}
                            >
                                <strong>{menu.icon}{" "}{menu.title}</strong>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Main content area */}
            <div style={{ width: '85%' }}>
                <Outlet />
            </div>
        </>
    )
}

export default SideMenu