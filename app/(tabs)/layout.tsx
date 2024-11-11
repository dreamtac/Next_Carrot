import TabBar from '@/components/tab-bar';

export default function TabLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
            <div className="h-14"></div>
            <TabBar />
        </div>
    );
}
