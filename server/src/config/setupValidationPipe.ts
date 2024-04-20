import { INestApplication, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export function setupGlobalPipes(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const result = extractErrors(errors);
        return new UnprocessableEntityException(result);
      },
      stopAtFirstError: true,
    }),
  );
}

function extractErrors(errors: ValidationError[], propertyPrefix = '') {
  const result: { message: string; property: string; }[] = [];
  for (const error of errors) {
    if (error.children && error.children.length > 0) {
      // Si hay hijos, procesar recursivamente los errores hijos
      result.push(...extractErrors(error.children, `${propertyPrefix}${error.property}.`));
    } else {
      // Si no hay hijos, agregar el error actual al resultado final
      const prop = error.property.split('.') // Para los casos en los que la propiedad es un array de objetos anidado
      const property = prop[prop.length - 1] || `${propertyPrefix}${error.property}`
      result.push({
        property,
        message: error.constraints ? Object.values(error.constraints)[0] : undefined,
      });
    }
  }
  return result;
}