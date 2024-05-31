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
        title: "Backend Api Node js - Auth python",
        description: "Api para obtener los datos de GitHub segun parametros de user, sort, order, per_page ",
    },
    {
        title: "Seguridad en API",
        description: "Configuración de Rated - slow limit, Compresion en headers",
    },
    {
        title: "Frontend React - Typescript",
        description: "Mas información sera enviada por correo",
    },
    {
        title: "Infraestructura",
        description: "Kubernetes cluster - Docker images en Docker Hub - Servicios para backend API, backend Auth, Frontend, Base de datos en RDS AWS",
    },
    {
        title: "Información Detallada",
        description: "Será enviada por correo",
    },
]

type CardProps = React.ComponentProps<typeof Card>

    const  InformationPage = ({ className, ...props }: CardProps) => {
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
                                            {notification.title}
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
