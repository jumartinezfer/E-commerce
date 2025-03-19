module.exports = {
    parser: '@typescript-eslint/parser', // Usa el parser de TypeScript
    parserOptions: {
      project: 'tsconfig.json', // Ruta al archivo tsconfig.json
      sourceType: 'module', // Permite el uso de imports y exports
    },
    plugins: [
      '@typescript-eslint', // Plugin para TypeScript
      'nestjs', // Plugin para NestJS
      'prettier', // Integración con Prettier
    ],
    extends: [
      'plugin:@typescript-eslint/recommended', // Reglas recomendadas para TypeScript
      'plugin:nestjs/recommended', // Reglas recomendadas para NestJS
      'prettier', // Desactiva reglas de ESLint que entren en conflicto con Prettier
      'plugin:prettier/recommended', // Integra Prettier con ESLint
    ],
    root: true, // Asegura que ESLint no busque configuraciones en directorios superiores
    env: {
      node: true, // Define el entorno de Node.js
      jest: true, // Define el entorno de Jest (para pruebas)
    },
    rules: {
      // Reglas personalizadas (puedes ajustarlas según tus preferencias)
      '@typescript-eslint/interface-name-prefix': 'off', // Desactiva el prefijo "I" en interfaces
      '@typescript-eslint/explicit-function-return-type': 'off', // No requiere tipos de retorno explícitos
      '@typescript-eslint/explicit-module-boundary-types': 'off', // No requiere tipos explícitos en módulos
      '@typescript-eslint/no-explicit-any': 'off', // Permite el uso de "any" (puedes activarlo si lo prefieres)
      'nestjs/use-validation-pipe': 'off', // Desactiva la regla que exige el uso de ValidationPipe
      'nestjs/use-pipe-decorator': 'off', // Desactiva la regla que exige el uso de @Pipe
      'prettier/prettier': 'error', // Muestra errores si el código no sigue el formato de Prettier
    },
    prettier : true
};