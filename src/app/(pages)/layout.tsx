// src/app/layout.tsx

import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { ApolloProvider } from '@/lib/apolloClient';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body >
        <Navbar />
       <ApolloProvider>
          {children}
        </ApolloProvider>

        <Footer />
      </body>
    </html>
  );
}
