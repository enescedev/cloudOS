import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Terminal, Code2, Chrome, MessageSquare, Layout, Database } from "lucide-react"
import { SimpleChat } from "@/components/simple-chat"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <MainNav />
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-12">
        <div className="grid gap-6">
          {/* <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Terminal className="w-8 h-8" />
                <div>
                  <CardTitle>Terminal</CardTitle>
                  <CardDescription>Cloud Terminal Erişimi</CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Code2 className="w-8 h-8" />
                <div>
                  <CardTitle>VSCode</CardTitle>
                  <CardDescription>Entegre Geliştirme Ortamı</CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Chrome className="w-8 h-8" />
                <div>
                  <CardTitle>Firefox</CardTitle>
                  <CardDescription>Gömülü Web Tarayıcı</CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <MessageSquare className="w-8 h-8" />
                <div>
                  <CardTitle>AI Chat</CardTitle>
                  <CardDescription>AI Destekli Geliştirme Asistanı</CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Layout className="w-8 h-8" />
                <div>
                  <CardTitle>GUI</CardTitle>
                  <CardDescription>Linux Masaüstü Ortamı</CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Database className="w-8 h-8" />
                <div>
                  <CardTitle>S3 Manager</CardTitle>
                  <CardDescription>Cloud Depolama Yönetimi</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </section> */}

          <section className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>AI Chat</CardTitle>
                <CardDescription>AI asistanınızla hızlı sohbet</CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleChat />
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}