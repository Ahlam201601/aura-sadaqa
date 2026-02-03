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
        <div className="container mx-auto p-4 h-[calc(100vh-4rem)]">
            <div className="flex flex-col lg:flex-row gap-4 h-full">
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
    )
}
