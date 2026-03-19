type Props = {
    children: React.ReactNode;
}

export function Container({ children }: Props) {
    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-6">
            {children}
        </div>
    );
}