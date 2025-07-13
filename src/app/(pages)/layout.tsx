// src/app/layout.tsx

import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { ApolloProvider } from '@/lib/apolloClient';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div className="">
        <Navbar />
        <ApolloProvider>{children}</ApolloProvider>

        <Footer />
      </div>
    </div>
  );
}
