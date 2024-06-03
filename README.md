# CostaMotors
Costa Motors, empresa que desarrolla vehículos impulsados por hidrógeno, la empresa nace de la combinación del amor de sus creadores por los vehículos y e medio ambiente, ya que los vehículos diseñados por Costa Motors son todos impulsados por energías limpias y los diseños y nombres de sus vehículos están inspirados en la fauna Costarricense.
Para consultar los enlaces de documentación, diagramas UML y otra información reelevante, consulte los enlaces en el archivo EnlacesDeInteres.md

Enlace a la documentación online del proyecto: https://docs.google.com/document/d/1y7A2-j_UEmVVMl9DIO0Y-17B5kRsCbC1of41EK-oCmI/edit?usp=sharing

Enlace al repositorio de GitHub del proyecto: https://github.com/EscalanteWizard/CostaMotors.git

Enlace a los prototipos de Figma: https://www.figma.com/file/vE87OYbHnURVxfY4d9H6jN/Learning-Management-System-(Community)?type=design&node-id=4802%3A8127&mode=design&t=6PtYRnqfVTF8YVWw-1

Enlace del vídeo de YouTube de la primera etapa de prototipado: https://youtu.be/slEf61pl2qI


Instalar el proyecto y dependencias:

Clone el proyecto desde el repositorio de GitHub mencionado anteriormente mediante el comando "git clone" + url

Ubíquese en el directorio del server y use el comando "npm install" para instalar todas las dependencias del proyecto backEnd.
Ubíquese en el directorio del frontEnd y use el comando "npm install" para instalar todas las dependencias del proyecto frontEnd.

Para que el proyecto funcione adecuadamente debe usar la base de datos MySQL, instale el producto y corra en su gestor el script que se proporciona en el archivo costamotors.sql adjunto en el proyecto.

En el backEnd, en el archivo index.js, modifique la funcion db=mysql.createConnection de manera que los parametros user y password coincidan con el usuario y contraseña de su base de datos local.

Para Iniciar la aplicación de FrontEnd colóquese en el directorio del frontEnd y utilice el comando "npm start", tomará unos minutos pero le desplegará la aplicación en su navegador predeterminado, se recomiendo el uso de Microsoft Edge.

Para iniciar el servidor del backEnd colóquese en el directorio del server y utilice el comando "node index.js", si el ambiente está configurado correctamente aparecerá en su terminal un mensaje de que el servidor está escuchando en el puerto 3007.