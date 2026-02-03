export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-muted/40">
            <div className="w-full max-w-md p-4">
                {children}
            </div>
        </div>
    )
}
