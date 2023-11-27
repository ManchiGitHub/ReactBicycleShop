interface ContentContainerProps {
    children: React.ReactNode;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children }) => {
    return (
        <main className="flex-1 antialiased"> {children}</main>
    );
}

export { ContentContainer }