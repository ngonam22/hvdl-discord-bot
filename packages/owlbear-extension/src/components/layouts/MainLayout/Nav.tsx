import { NavLink } from "react-router";

export default function Nav() {
    return (
        <div className="border-b border-gray-500 lg:border-0 lg:mx-0 bg-red-900 relative flex items-center">
            <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
                <ul className="flex">
                    <li>
                        <NavLink to="/" end
                            className={({ isActive }: { isActive: boolean }) =>
                                (isActive ? 'bg-red-950' : 'hover:bg-red-950 transition-colors') +
                                ` text-base px-4 py-3 lg:px-8 block`
                            }
                        >
                            Data
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
                </ul>
            </nav>
        </div>
    )
}