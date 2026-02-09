export default function DashboardLayout({
    children,
    explorer,
    chat,
}: {
    children: React.ReactNode
    explorer: React.ReactNode
    chat: React.ReactNode
}) {

    return (
        <div className="relative min-h-screen bg-[#020617]">

            {/* Ramadan Background Image - Islamic Pattern */}
            <div className="fixed inset-0 z-0">
                <img
                    src="/ramadan-islamic-pattern.png"
                    alt=""
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f1f]/85 via-[#042f2e]/80 to-[#020617]/85" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/50 via-transparent to-transparent" />
            </div>
            <div className="relative z-10 container mx-auto p-4 h-[calc(100vh)]">
                <div className="flex flex-col lg:flex-row gap-6 h-full">
                    <div className="w-full lg:w-1/2 h-full flex flex-col">
                        {explorer}
                    </div>
                    <div className="w-full lg:w-1/2 h-full flex flex-col">
                        {chat}
                    </div>
                </div>
                <div className="hidden">
                    {children}
                </div>
            </div>
        </div>
    )
}
