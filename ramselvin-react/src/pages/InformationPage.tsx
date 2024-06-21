import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import HeaderPage from "@/pages/HeaderPage"

const notifications = [
    {
        title: "Información general",
        description: "Repositorio de codigo utilizado",
        url: "https://github.com/elvingonzalezb/master-test"
    },
    {
        title: "Wiki general",
        description: "Repositorio de wiki con información general",
        url: "https://github.com/elvingonzalezb/master-test/wiki"
    },
    {
        title: "Documentación Servicio API Database",
        description: "Sera redirigido a la url de documentación de APIs Swagger",
        url: "http://44.218.139.126/api/docs"
    },
    {
        title: "Documentación Servicio Extract",
        description: "Sera redirigido a la url de documentación de APIs Swagger",
        url: "http://44.218.139.126/extract/docs"
    },
    {
        title: "Documentación Servicio Transform",
        description: "Sera redirigido a la url de documentación de APIs Swagger",
        url: "http://44.218.139.126/transform/docs"
    },
    {
        title: "Documentación Servicio Load",
        description: "Sera redirigido a la url de documentación de APIs Swagger",
        url: "http://44.218.139.126/load/docs"
    },
    {
        title: "Diagramas",
        description: "Mas información sera enviada por correo",
        url: "https://excalidraw.com/#json=LatqeuoY8C7DwbtcfBHFv,lZei8IuFHNUi2wSaASesfg"
    },
]

type CardProps = React.ComponentProps<typeof Card>

const InformationPage = ({ className, ...props }: CardProps) => {
    return (
        <>       
        <HeaderPage />
            <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <Card className={cn("w-[500px]", className)} {...props}>
                        <CardHeader>
                            <CardTitle>Backend</CardTitle>
                            <CardDescription>Autenticación - Consulta</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div>
                                {notifications.map((notification, index) => (
                                    <div
                                        key={index}
                                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                    >
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                <a href={notification.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                    {notification.title}
                                                </a>
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {notification.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>                      
                    </Card>
                </div>
            </div>
        </> 
    )
}

export default InformationPage
