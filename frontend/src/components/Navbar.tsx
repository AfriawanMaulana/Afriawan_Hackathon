
export const SideNav = () => {
    return (
        <div className="w-62 h-screen fixed md:sticky top-0 left-0 shadow-sm shadow-black/50 flex flex-col space-y-4">
            <div className="p-4 shadow-sm shadow-black/50 rounded-lg text-center">
                <h1 className="font-black text-3xl italic">Absensi<span className="text-blue-500">Ku</span></h1>
            </div>
            <ul className="flex flex-col space-y-4 p-4">
                <li>
                    <a href="/absensi" className="font-semibold text-slate-700">Absensi</a>
                </li>
            </ul>
        </div>
    )
}