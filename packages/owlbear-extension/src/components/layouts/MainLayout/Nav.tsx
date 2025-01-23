import { NavLink } from "react-router";

export default function Nav() {
    return (
        <div className="border-b border-gray-500 lg:border-0 lg:mx-0 bg-red-900 relative flex items-center">
            <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
                <ul className="flex text-white">
                    <li>
                        <NavLink to="/" end
                            className={({ isActive }: { isActive: boolean }) =>
                                (isActive ? 'bg-red-950' : 'hover:bg-red-950 transition-colors') +
                                ` text-base px-4 py-3 lg:px-8 block`
                            }
                        >
                            Roll
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/history"
                            end
                            className={({ isActive }: { isActive: boolean }) =>
                                (isActive ? 'bg-red-950' : 'hover:bg-red-950 transition-colors') +
                                ` text-base px-4 py-3 lg:px-8 block`
                            }
                        >
                            History
                        </NavLink>
                    </li>

                    {/* <li>
                        <NavLink
                            to="/init"
                            end
                            className={({ isActive }: { isActive: boolean }) =>
                                (isActive ? 'bg-red-950' : 'hover:bg-red-950 transition-colors') +
                                ` text-base px-4 py-3 lg:px-8 block`
                            }
                        >
                            Init
                        </NavLink>
                    </li> */}
                </ul>
            </nav>
        </div>
    )
}