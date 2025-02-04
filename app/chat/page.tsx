// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { MainNav } from "@/components/main-nav"

// export default function ChatPage() {
//   return (
//     <div className="min-h-screen bg-background">
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-14 items-center">
//           <MainNav />
//         </div>
//       </header>
      
//       <main className="container mx-auto px-6 py-12">
//         <Card>
//           <CardHeader>
//             <CardTitle>AI Chat</CardTitle>
//             <CardDescription>AI-powered development assistant</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <p className="text-muted-foreground">AI Chat integration coming soon...</p>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   )
// }

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BrowserPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return null; // Yönlendirme yapılırken boş sayfa göster
}